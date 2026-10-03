import { motion } from 'motion/react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface SelectedWorkProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onViewAll?: () => void;
}

export function SelectedWork({ projects, onSelectProject, onViewAll }: SelectedWorkProps) {
  return (
    <section id="work" className="relative py-24 md:py-32 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#0077B6] rounded-sm shadow-[0_0_8px_#0077B6]" />
            <h2 className="text-sm font-mono font-bold tracking-widest text-[#0F172A] uppercase">
              SELECTED WORK
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewAll}
              data-cursor="LIHAT SEMUA"
              className="group flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-widest text-[#0F172A] hover:text-[#0055A4] uppercase transition-colors"
            >
              <span>EXPLORE ALL PROJECTS</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Project Cards Stack */}
        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((project, index) => {
            const projectNumber = `PROJECT 0${index + 1}`;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelectProject(project)}
                data-cursor="VIEW CASE"
                className="group relative cursor-pointer rounded-2xl md:rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 hover:border-[#0077B6]/40 p-6 md:p-8 lg:p-10 shadow-[0_4px_30px_-4px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(0,51,102,0.12)] transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left: Project Details & Meta */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full order-2 lg:order-1">
                    <div>
                      {/* Project Index & Category */}
                      <div className="flex items-center gap-3 text-xs font-mono tracking-widest uppercase mb-4">
                        <span className="font-bold text-[#0055A4] drop-shadow-[0_1px_4px_rgba(0,85,164,0.25)]">
                          {projectNumber}
                        </span>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#64748B] font-medium">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-display font-black text-2xl md:text-3xl lg:text-4xl text-[#0F172A] tracking-tight uppercase mb-4 group-hover:text-[#0055A4] transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-[#475569] font-sans leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Deliverables / Tags */}
                      {project.deliverables && (
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-[#64748B] mb-8">
                          {project.deliverables.map((item, i) => (
                            <span key={item} className="flex items-center gap-2">
                              {i > 0 && <span className="text-slate-300">·</span>}
                              <span>{item}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-xs font-mono text-slate-500 uppercase">
                        CLIENT: <span className="font-semibold text-slate-900">{project.client}</span> ({project.year})
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-slate-900 group-hover:text-[#0055A4] transition-colors">
                        <span>DETAIL PROYEK</span>
                        <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#0055A4] flex items-center justify-center transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Large Showcase Image */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="relative aspect-[16/10] w-full rounded-xl md:rounded-2xl overflow-hidden bg-neutral-900 border border-slate-200 shadow-md">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center grayscale contrast-[1.04] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
                      />
                      
                      {/* Scrim Overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />

                      {/* Floating Micro-Badge */}
                      <div className="absolute top-4 right-4 glass-card px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-900 shadow-sm flex items-center gap-1.5 backdrop-blur-md">
                        <ExternalLink className="w-3 h-3 text-[#0077B6]" />
                        <span>LIVE PREVIEW</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
