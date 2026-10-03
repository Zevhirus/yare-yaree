import { motion } from 'motion/react';
import { Layers, Globe, Smartphone, Component, ArrowUpRight } from 'lucide-react';
import { Service } from '../types';

interface WhatIDoProps {
  services: Service[];
}

export function WhatIDo({ services }: WhatIDoProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Component':
      default:
        return <Component className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32 border-t border-black/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#0077B6] rounded-sm shadow-[0_0_8px_#0077B6]" />
            <h2 className="text-sm font-mono font-bold tracking-widest text-[#0F172A] uppercase">
              KEAHLIAN & LAYANAN
            </h2>
          </div>
          <p className="text-xs md:text-sm font-mono tracking-widest text-[#64748B] uppercase">
            SOLUSI DIGITAL END-TO-END
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id || service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              data-cursor="LAYANAN"
              className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 hover:border-[#0077B6]/60 hover:bg-white shadow-[0_4px_24px_-4px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_-8px_rgba(0,85,164,0.16)] transition-all duration-300"
            >
              {/* Top Row: Blue Number & Icon */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono font-black text-2xl md:text-3xl text-[#0055A4] drop-shadow-[0_1px_6px_rgba(0,85,164,0.25)] transition-transform duration-300 group-hover:scale-105">
                    {service.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-900/[0.06] group-hover:bg-[#0055A4] flex items-center justify-center text-[#0055A4] group-hover:text-white transition-colors duration-300">
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-lg md:text-xl text-[#0F172A] tracking-tight uppercase mb-3 group-hover:text-[#0055A4] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-[#475569] font-sans leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Bottom: Tags & Moving Arrow */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider">
                  {service.tags?.[0] || 'Keahlian'}
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:text-white group-hover:bg-[#0055A4] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Accent Line on hover */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-[#0077B6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
