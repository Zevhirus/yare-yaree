import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Globe, Plane, Sparkles } from 'lucide-react';

interface HeroProps {
  portraitSrc?: string;
  onExploreWork?: () => void;
  onContactClick?: () => void;
}

export function Hero({ 
  portraitSrc = '/src/assets/images/aan_real_face_portrait_1791028910124.jpg', 
  onExploreWork, 
  onContactClick 
}: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: Large Typography & Metadata Cards                 */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            
            {/* Top Micro Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#0077B6] shadow-[0_0_8px_#0077B6]" />
              <span className="text-[11px] font-mono tracking-widest text-[#003366] uppercase font-bold">
                FULL-STACK DEVELOPER & UI/UX DESIGNER
              </span>
            </motion.div>

            {/* Huge Hero Title: DESIGN (black) / FUTURES. (ocean blue) */}
            <div className="overflow-hidden mb-6">
              <h1 className="font-display font-black leading-[0.88] tracking-[-0.05em] uppercase text-[clamp(3.8rem,9vw,8.5rem)] select-none">
                <motion.span
                  initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#0F172A]"
                >
                  DESIGN
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[#0055A4] drop-shadow-[0_2px_18px_rgba(0,85,164,0.35)]"
                >
                  FUTURES.
                </motion.span>
              </h1>
            </div>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#334155] uppercase max-w-xl leading-relaxed mb-10"
            >
              MEMBANGUN PRODUK DIGITAL YANG INTUITIF, RESPONSIF, DAN BERDAMPAK NYATA.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 mb-12"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('work');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-cursor="PROYEK"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#003366] hover:bg-[#002244] text-[#F8FAFC] text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition-all shadow-md hover:shadow-xl hover:translate-y-[-2px]"
              >
                <span>LIHAT PROYEK PILIHAN</span>
                <ArrowDown className="w-4 h-4 text-[#00B4D8] transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-cursor="KONTAK"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/80 hover:bg-white text-[#0F172A] border border-slate-200 text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition-all hover:border-[#0055A4] hover:text-[#0055A4] hover:translate-y-[-2px] shadow-sm"
              >
                <span>HUBUNGI SAYA</span>
                <ArrowUpRight className="w-4 h-4 text-[#0055A4] transition-colors" />
              </button>
            </motion.div>

            {/* Metadata Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl"
            >
              {/* Card 1: Based in Earth */}
              <div className="glass-card p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono tracking-widest uppercase mb-1">
                  <Globe className="w-3.5 h-3.5 text-[#0055A4]" />
                  <span>LOKASI</span>
                </div>
                <div className="font-display font-bold text-sm md:text-base text-[#0F172A] tracking-tight">
                  INDONESIA
                </div>
              </div>

              {/* Card 2: Working Worldwide */}
              <div className="glass-card p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-mono tracking-widest uppercase mb-1">
                  <Plane className="w-3.5 h-3.5 text-[#0055A4]" />
                  <span>KOLABORASI</span>
                </div>
                <div className="font-display font-bold text-sm md:text-base text-[#0F172A] tracking-tight">
                  REMOTE / WFH
                </div>
              </div>

              {/* Card 3: Availability */}
              <div className="col-span-2 sm:col-span-1 glass-card p-4 rounded-xl border border-[#0077B6]/30 bg-white shadow-[0_4px_16px_rgba(0,85,164,0.08)]">
                <div className="flex items-center gap-1.5 text-slate-600 text-[10px] font-mono tracking-widest uppercase mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#0077B6] animate-pulse" />
                  <span>STATUS</span>
                </div>
                <div className="font-mono font-bold text-xs text-[#003366] leading-tight tracking-tight uppercase">
                  TERSEDIA PROYEK
                </div>
              </div>
            </motion.div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Grayscale Portrait with Rotating Orbit Rings     */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[420px] aspect-[3/4]"
            >
              
              {/* Outer Slow Rotating Thin Futuristic Geometric Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-8 md:-inset-12 rounded-full border border-dashed border-[#0077B6]/30 pointer-events-none"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0077B6] shadow-[0_0_10px_#0077B6]" />
                <div className="absolute bottom-4 right-1/4 w-1.5 h-1.5 rounded-full bg-slate-400" />
              </motion.div>

              {/* Secondary Concentric Thin Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 md:-inset-6 rounded-full border border-slate-200 pointer-events-none"
              />

              {/* Subtle Ocean Ambient Glow behind Portrait */}
              <div 
                className="absolute inset-4 rounded-3xl blur-[40px] opacity-45 pointer-events-none -z-10"
                style={{ background: 'radial-gradient(circle, #0055A4 0%, rgba(0, 119, 182, 0.25) 55%, transparent 80%)' }}
              />

              {/* Designer Portrait Container */}
              <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 bg-neutral-900 shadow-2xl group">
                <img
                  src={portraitSrc}
                  alt="Aan Setiawan - Full-Stack Developer & UI/UX Designer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle Vignette & Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Bottom Overlay Label inside Portrait */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/90 pointer-events-none">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#90E0EF] uppercase font-bold">
                      DEVELOPER & DESIGNER
                    </div>
                    <div className="text-base font-display font-black tracking-tight">
                      AAN SETIAWAN
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono tracking-widest text-white/60">
                      STACK
                    </div>
                    <div className="text-xs font-mono font-bold text-white">
                      REACT · LARAVEL
                    </div>
                  </div>
                </div>

                {/* Corner Decorative Tech Marks */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-white/50 tracking-widest pointer-events-none">
                  [AS_2026]
                </div>
              </div>

              {/* Floating Badge: Availability Pill */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -bottom-5 -right-4 sm:-right-8 glass-card px-4 py-2.5 rounded-xl border border-[#0077B6]/30 shadow-lg flex items-center gap-2.5 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-[#0077B6] animate-ping" />
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#003366] uppercase">
                  OPEN FOR FREELANCE & HIRE
                </span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
