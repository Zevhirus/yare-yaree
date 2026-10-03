import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin?: () => void;
  onNavigateProjects?: () => void;
}

export function Navbar({ onOpenAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMonogramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      onOpenAdmin?.();
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1200);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'WORK', href: '#work' },
    { label: 'SERVICES', href: '#services' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-white/75 backdrop-blur-xl border-b border-black/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Zone: Designer Monogram & Sub-Descriptor */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={handleMonogramClick}
              data-cursor="AAN"
              className="group flex items-center gap-2.5 text-slate-900 font-display font-black text-xl tracking-tighter"
            >
              <span className="w-8 h-8 rounded-lg bg-[#003366] text-[#00B4D8] flex items-center justify-center font-mono text-xs font-bold transition-transform group-hover:scale-105 duration-200 shadow-sm border border-[#0077B6]/30">
                AS
              </span>
              <span className="tracking-tight text-sm font-bold uppercase hidden sm:inline-block text-[#0F172A]">
                AAN SETIAWAN
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#64748B] uppercase pl-4 border-l border-slate-200">
              <span>FULL-STACK & UI/UX DEVELOPER</span>
            </div>
          </div>

          {/* Center Zone: Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium tracking-widest text-[#64748B]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="relative py-1 hover:text-[#003366] transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0055A4] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Zone: 2026 Portfolio Indicator & Primary Action */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Pulsing 2026 Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0055A4]/[0.06] border border-[#0077B6]/25 text-[11px] font-mono tracking-wider text-[#003366]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0077B6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0055A4]" />
              </span>
              <span className="font-semibold text-slate-900">2026 PORTFOLIO</span>
            </div>

            {/* Quick Contact Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact');
              }}
              data-cursor="KONTAK"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-white bg-[#0055A4] hover:bg-[#003366] border border-[#0055A4] rounded-lg transition-all shadow-sm hover:translate-y-[-1px]"
            >
              <span>HUBUNGI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-black rounded-lg hover:bg-black/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[#F5F6F6]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase">
                Navigation
              </span>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-2xl font-display font-bold text-[#0F172A] hover:text-[#0055A4] transition-colors flex items-center justify-between border-b border-black/[0.06] pb-3"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-black/40" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-black/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0077B6] animate-pulse" />
                <span>TERSEDIA UNTUK PROYEK FREELANCE</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                INDONESIA · BEKERJA SECARA REMOTE · 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
