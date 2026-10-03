import { ArrowUp, Lock } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  onOpenAdmin?: () => void;
}

export function Footer({ settings, onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { label: 'GitHub', href: settings.socials.github || 'https://github.com/Zevhirus' },
    { label: 'Instagram', href: settings.socials.instagram },
    { label: 'LinkedIn', href: settings.socials.linkedin },
  ];

  return (
    <footer className="relative border-t border-slate-200 py-12 bg-white/70">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono">
        
        {/* Left: Copyright & Discreet Admin Trigger */}
        <div className="flex items-center gap-2.5 text-[#64748B]">
          <span>
            © 2026 <span className="font-bold text-[#0F172A]">{settings.designerName}</span>. PORTFOLIO RESMI.
          </span>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              title="Panel Kelola (Khusus Aan)"
              className="p-1 rounded opacity-25 hover:opacity-100 hover:text-[#0055A4] transition-all cursor-pointer"
            >
              <Lock className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Center: Philosophy */}
        <div className="flex items-center gap-2 text-[#64748B] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0077B6]" />
          <span>FULL-STACK & UI/UX</span>
        </div>

        {/* Right: Socials & Back to Top */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                data-cursor={social.label.toUpperCase()}
                className="group relative text-[#64748B] hover:text-[#003366] transition-colors py-1"
              >
                <span>{social.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0055A4] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            data-cursor="TOP"
            className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#0055A4] hover:bg-blue-900/10 flex items-center justify-center text-slate-700 hover:text-[#0055A4] transition-all ml-2"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
