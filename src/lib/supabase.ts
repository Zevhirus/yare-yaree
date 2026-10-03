import { createClient } from '@supabase/supabase-js';
import { Project, Service, Testimonial, Message } from '../types';
import { INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_TESTIMONIALS } from '../data/seedData';

// Retrieve Vite environment variables for Supabase with user provided credentials as default
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://jgnemaedvvysqktwympp.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'sb_publishable_JJU6_6epf7tZqaw_lVjeHg_Fh2vAlOg';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  !supabaseUrl.includes('placeholder')
);

// Create real client if configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback storage keys for zero-config persistence
const STORAGE_KEYS = {
  PROJECTS: 'nexus_portfolio_projects_v1',
  SERVICES: 'nexus_portfolio_services_v1',
  TESTIMONIALS: 'nexus_portfolio_testimonials_v1',
  MESSAGES: 'nexus_portfolio_messages_v1',
};

// Safe localStorage access
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

// -------------------------------------------------------------
// Data Access Methods with transparent fallback
// -------------------------------------------------------------

export async function fetchProjects(): Promise<Project[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Project[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local cache', err);
    }
  }

  // Local fallback
  const local = getLocalItem<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  return local.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  const all = await fetchProjects();
  return all.filter(p => p.featured);
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const all = await fetchProjects();
  return all.find(p => p.slug === slug) || null;
}

export async function saveProject(project: Project): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('projects').upsert(project);
      if (error) throw error;
    } catch (err: any) {
      console.error('Supabase save error:', err);
    }
  }

  // Update local storage
  const current = getLocalItem<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const exists = current.some(p => p.id === project.id);
  const updated = exists 
    ? current.map(p => p.id === project.id ? project : p) 
    : [...current, project];
  
  setLocalItem(STORAGE_KEYS.PROJECTS, updated);
  return { success: true };
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (err) {
      console.error('Supabase delete error:', err);
    }
  }

  const current = getLocalItem<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const filtered = current.filter(p => p.id !== id);
  setLocalItem(STORAGE_KEYS.PROJECTS, filtered);
  return { success: true };
}

export async function fetchServices(): Promise<Service[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Service[];
      }
    } catch (err) {
      console.warn('Supabase services fetch error:', err);
    }
  }

  return getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) {
        return data as Testimonial[];
      }
    } catch (err) {
      console.warn('Supabase testimonials fetch error:', err);
    }
  }

  return getLocalItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
}

export async function submitContactMessage(msg: Omit<Message, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; error?: string }> {
  const newMessage: Message = {
    ...msg,
    id: `msg-${Date.now()}`,
    created_at: new Date().toISOString(),
    status: 'new',
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('messages').insert({
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
      });
      if (error) console.error('Supabase message error:', error);
    } catch (err) {
      console.error('Supabase message insert failed:', err);
    }
  }

  // Always store locally too so user can review immediately in admin dashboard
  const current = getLocalItem<Message[]>(STORAGE_KEYS.MESSAGES, []);
  setLocalItem(STORAGE_KEYS.MESSAGES, [newMessage, ...current]);
  return { success: true };
}

export async function fetchMessages(): Promise<Message[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Message[];
    } catch (err) {
      console.warn('Failed to fetch messages from Supabase', err);
    }
  }

  return getLocalItem<Message[]>(STORAGE_KEYS.MESSAGES, []);
}

export async function resetToDefaultData(): Promise<void> {
  setLocalItem(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  setLocalItem(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  setLocalItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
}
