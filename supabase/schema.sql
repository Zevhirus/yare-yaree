-- ====================================================
-- NEXUS PORTFOLIO SUPABASE SCHEMA & RLS POLICIES
-- ====================================================

-- 1. Profiles & Site Settings
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  designer_name text not null,
  title text not null,
  tagline text not null,
  status_text text default 'AVAILABLE FOR FREELANCE PROJECTS',
  is_available boolean default true,
  location text default 'EARTH',
  work_mode text default 'WORKING WORLDWIDE',
  email text not null,
  website text,
  socials jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Projects Table
create table if not exists public.projects (
  id text primary key,
  title text not null,
  slug text unique not null,
  category text not null,
  description text not null,
  image_url text not null,
  year text default '2026',
  client text,
  featured boolean default false,
  display_order integer default 0,
  deliverables text[] default array[]::text[],
  challenge text,
  solution text,
  result text,
  technologies text[] default array[]::text[],
  metrics jsonb default '[]'::jsonb,
  live_url text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Services Table
create table if not exists public.services (
  id text primary key,
  number text not null,
  title text not null,
  description text not null,
  icon text default 'Layers',
  display_order integer default 0,
  tags text[] default array[]::text[]
);

-- 4. Testimonials Table
create table if not exists public.testimonials (
  id text primary key,
  name text not null,
  role text not null,
  company text not null,
  avatar_url text,
  quote text not null,
  display_order integer default 0,
  active boolean default true
);

-- 5. Contact Messages Table
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.messages enable row level security;

-- Public READ policies
create policy "Public can read profiles" on public.profiles
  for select using (true);

create policy "Public can read projects" on public.projects
  for select using (true);

create policy "Public can read services" on public.services
  for select using (true);

create policy "Public can read active testimonials" on public.testimonials
  for select using (active = true);

-- Public INSERT into messages
create policy "Public can insert contact messages" on public.messages
  for insert with check (true);

-- Authenticated Admin Policies
create policy "Admins can manage projects" on public.projects
  for all using (auth.role() = 'authenticated');

create policy "Admins can manage services" on public.services
  for all using (auth.role() = 'authenticated');

create policy "Admins can manage testimonials" on public.testimonials
  for all using (auth.role() = 'authenticated');

create policy "Admins can read/update messages" on public.messages
  for select using (auth.role() = 'authenticated');

-- ====================================================
-- SEED DATA
-- ====================================================
insert into public.projects (id, title, slug, category, description, image_url, year, client, featured, display_order)
values 
  ('proj-1', 'FINTRACK DASHBOARD', 'fintrack-dashboard', 'Product Design · Fintech', 'Financial intelligence dashboard engineered for real-time portfolio analytics and liquidity management.', '/src/assets/images/fintrack_dashboard_mockup_1791026038374.jpg', '2026', 'FinTrack Global Inc.', true, 1),
  ('proj-2', 'LAUNCHPAD WEBSITE', 'launchpad-website', 'Web Design · SaaS', 'SaaS landing page and interactive marketing platform for a Y-Combinator startup launch incubator.', '/src/assets/images/launchpad_saas_mockup_1791026051195.jpg', '2025', 'Launchpad Technologies', true, 2),
  ('proj-3', 'ELEVATE APP', 'elevate-app', 'Mobile Design · Banking', 'Next-generation mobile banking experience redesigned for zero-friction remittances and biometric savings.', '/src/assets/images/elevate_banking_mockup_1791026063010.jpg', '2025', 'Elevate Financial Bank', true, 3)
on conflict (id) do nothing;
