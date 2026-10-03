export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  year: string;
  client: string;
  featured: boolean;
  display_order: number;
  created_at?: string;
  deliverables?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
  technologies?: string[];
  metrics?: { label: string; value: string }[];
  live_url?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar_url: string;
  quote: string;
  display_order: number;
  active: boolean;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'new' | 'read' | 'archived';
}

export interface SiteSettings {
  designerName: string;
  title: string;
  tagline: string;
  statusText: string;
  isAvailable: boolean;
  location: string;
  workMode: string;
  email: string;
  website: string;
  responseTime?: string;
  socials: {
    instagram: string;
    linkedin: string;
    behance: string;
    dribbble: string;
    github?: string;
  };
}
