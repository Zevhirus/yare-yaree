/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatIDo } from './components/WhatIDo';
import { SelectedWork } from './components/SelectedWork';
import { Testimonials } from './components/Testimonials';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AllProjectsModal } from './components/AllProjectsModal';
import { AdminModal } from './components/AdminModal';
import { Project, Service, Testimonial } from './types';
import { INITIAL_SETTINGS, INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_TESTIMONIALS } from './data/seedData';
import { fetchProjects, fetchServices, fetchTestimonials } from './lib/supabase';

const DEFAULT_PORTRAIT = '/src/assets/images/aan_real_face_portrait_1791028910124.jpg';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAllProjectsOpen, setIsAllProjectsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Hero portrait state (synced with admin panel and local persistence)
  const [portraitSrc, setPortraitSrc] = useState<string>(() => {
    try {
      return localStorage.getItem('nexus_custom_portrait') || DEFAULT_PORTRAIT;
    } catch {
      return DEFAULT_PORTRAIT;
    }
  });

  const handleUpdatePortrait = (newSrc: string) => {
    setPortraitSrc(newSrc);
    try {
      if (newSrc === DEFAULT_PORTRAIT) {
        localStorage.removeItem('nexus_custom_portrait');
      } else {
        localStorage.setItem('nexus_custom_portrait', newSrc);
      }
    } catch (e) {
      console.error('Failed to save portrait:', e);
    }
  };

  // -------------------------------------------------------------
  // Admin Route & Keyboard Shortcut Listener
  // -------------------------------------------------------------
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash === '#admin' || hash === '#/admin' || search.includes('admin') || path.endsWith('/admin')) {
        setIsAdminOpen(true);
      }
    };

    // Check on initial load
    checkAdminRoute();

    // Listen for hash change (e.g. user types #admin in address bar)
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Global keyboard shortcut: Ctrl + Shift + A or Cmd + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin' || window.location.hash === '#/admin') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  // -------------------------------------------------------------
  // Lenis Smooth Scrolling Initialization
  // -------------------------------------------------------------
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // -------------------------------------------------------------
  // Data Fetching
  // -------------------------------------------------------------
  const loadData = async () => {
    try {
      const [projData, srvData, testData] = await Promise.all([
        fetchProjects(),
        fetchServices(),
        fetchTestimonials(),
      ]);
      if (projData && projData.length > 0) setProjects(projData);
      if (srvData && srvData.length > 0) setServices(srvData);
      if (testData && testData.length > 0) setTestimonials(testData);
    } catch (e) {
      console.error('Error fetching portfolio data:', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Featured projects for the primary showcase
  const featuredProjects = projects.filter((p) => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  return (
    <div className="relative min-h-screen selection:bg-[#0055A4] selection:text-white">
      {/* Precision Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Atmospheric Background Grid & Subtle Ambient Glows */}
      <BackgroundEffects />

      {/* Floating Glass Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateProjects={() => setIsAllProjectsOpen(true)}
      />

      {/* Editorial Hero Canvas */}
      <Hero
        portraitSrc={portraitSrc}
        onExploreWork={() => {
          const el = document.getElementById('work');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onContactClick={() => {
          const el = document.getElementById('contact');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* What I Do - Services */}
      <WhatIDo services={services} />

      {/* Selected Work - Featured Case Studies */}
      <SelectedWork
        projects={displayProjects}
        onSelectProject={(project) => setSelectedProject(project)}
        onViewAll={() => setIsAllProjectsOpen(true)}
      />

      {/* Testimonials Carousel */}
      <Testimonials testimonials={testimonials} />

      {/* Contact CTA with Interactive Wireframe Globe */}
      <ContactCTA settings={INITIAL_SETTINGS} />

      {/* Minimal Footer with discreet admin lock */}
      <Footer
        settings={INITIAL_SETTINGS}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Project Detail Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        allProjects={projects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Complete Project Archive Modal */}
      <AllProjectsModal
        isOpen={isAllProjectsOpen}
        projects={projects}
        onClose={() => setIsAllProjectsOpen(false)}
        onSelectProject={(p) => {
          setIsAllProjectsOpen(false);
          setSelectedProject(p);
        }}
      />

      {/* Admin Dashboard & Management */}
      <AdminModal
        isOpen={isAdminOpen}
        projects={projects}
        portraitSrc={portraitSrc}
        onUpdatePortrait={handleUpdatePortrait}
        onClose={handleCloseAdmin}
        onRefreshData={loadData}
      />
    </div>
  );
}
