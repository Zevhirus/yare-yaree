import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="relative py-24 md:py-32 border-b border-black/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#0077B6] rounded-sm shadow-[0_0_8px_#0077B6]" />
            <h2 className="text-sm font-mono font-bold tracking-widest text-[#0F172A] uppercase">
              TESTIMONI KLIEN
            </h2>
          </div>
          <span className="text-xs md:text-sm font-mono tracking-widest text-[#64748B] uppercase">
            FEEDBACK & ULASAN →
          </span>
        </div>

        {/* Large Testimonial Card */}
        <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200 p-8 md:p-14 lg:p-16 shadow-[0_8px_40px_-6px_rgba(15,23,42,0.03)] overflow-hidden">
          
          {/* Subtle ocean accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0055A4] via-[#0077B6]/40 to-transparent" />

          {/* Large Ocean Quote Icon */}
          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-900/10 border border-[#0077B6]/30 flex items-center justify-center text-[#0055A4]">
              <Quote className="w-7 h-7 fill-[#0055A4] text-[#0055A4]" />
            </div>
          </div>

          {/* Testimonial Quote Carousel Content */}
          <div className="min-h-[160px] md:min-h-[140px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id || currentIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote className="font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#0F172A] leading-snug tracking-tight mb-10 max-w-4xl">
                  "{current.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar_url}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover grayscale border border-slate-200 shadow-sm"
                  />
                  <div>
                    <h3 className="font-display font-black text-base text-[#0F172A] uppercase tracking-wide">
                      {current.name}
                    </h3>
                    <p className="text-xs font-mono text-[#64748B] tracking-wider uppercase">
                      {current.role} · <span className="text-[#0055A4] font-semibold">{current.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Controls Bottom Row */}
          <div className="pt-10 mt-10 border-t border-slate-100 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-[#0055A4] shadow-[0_0_8px_rgba(0,85,164,0.45)]'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                data-cursor="PREV"
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-[#0077B6] bg-white flex items-center justify-center text-slate-700 hover:text-[#0055A4] transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                data-cursor="NEXT"
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-[#0077B6] bg-white flex items-center justify-center text-slate-700 hover:text-[#0055A4] transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
