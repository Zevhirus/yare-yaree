import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export function ProjectDetailModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-center p-3 sm:p-6 md:p-10">
        
        {/* Background Click to Dismiss */}
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#F5F6F6] rounded-3xl border border-black/10 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#F5F6F6]/90 backdrop-blur-md border-b border-black/[0.08]">
            <div className="flex items-center gap-3 text-xs font-mono text-[#64748B] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#0077B6]" />
              <span>STUDI KASUS / {project.year}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectProject(prevProject)}
                title="Previous Project"
                data-cursor="PREV"
                className="p-2 rounded-full hover:bg-black/5 text-black/70 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectProject(nextProject)}
                title="Next Project"
                data-cursor="NEXT"
                className="p-2 rounded-full hover:bg-black/5 text-black/70 hover:text-black transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                aria-label="Close modal"
                data-cursor="CLOSE"
                className="p-2 rounded-full bg-black/5 hover:bg-black text-black hover:text-white transition-all ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 md:p-14">
            
            {/* Title & Metadata */}
            <div className="mb-10">
              <div className="text-xs font-mono tracking-widest text-[#777777] uppercase mb-3">
                {project.category} · CLIENT: {project.client}
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#111111] uppercase tracking-tight leading-none mb-6">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-[#444444] font-sans leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </div>

            {/* Main Showcase Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-black/10 shadow-lg mb-12">
              <img
                src={project.image_url}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col"
                  >
                    <div className="font-display font-black text-3xl sm:text-4xl text-[#111111] mb-1">
                      {m.value}
                    </div>
                    <div className="text-xs font-mono tracking-widest text-[#777777] uppercase">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Challenge, Solution, Result Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 border-y border-black/[0.08] py-10">
              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#111111] uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  THE CHALLENGE
                </h4>
                <p className="text-sm text-[#555555] font-sans leading-relaxed">
                  {project.challenge || 'Resolving complex user workflows, reducing cognitive overhead, and modernizing legacy interfaces.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#111111] uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0055A4]" />
                  THE SOLUTION
                </h4>
                <p className="text-sm text-[#555555] font-sans leading-relaxed">
                  {project.solution || 'An architectural redesign rooted in Swiss typography, ergonomic spatial rhythm, and tactile micro-interactions.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#111111] uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0077B6]" />
                  THE RESULT
                </h4>
                <p className="text-sm text-[#555555] font-sans leading-relaxed">
                  {project.result || 'Drastic improvement in engagement metrics, reduced task times, and immediate business impact.'}
                </p>
              </div>
            </div>

            {/* Technologies & Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-14">
              {project.deliverables && (
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#111111] uppercase mb-3">
                    DELIVERABLES
                  </h4>
                  <ul className="flex flex-col gap-2 text-sm text-[#555555]">
                    {project.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0055A4] shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && (
                <div>
                  <h4 className="text-xs font-mono font-bold tracking-widest text-[#111111] uppercase mb-3">
                    TECHNOLOGIES & TOOLS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg bg-white border border-black/10 text-xs font-mono text-[#333333]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Next Project Footer Bar */}
            <div className="pt-8 border-t border-black/[0.08] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-[#888888] uppercase">
                  UP NEXT
                </div>
                <button
                  onClick={() => onSelectProject(nextProject)}
                  data-cursor="NEXT"
                  className="font-display font-black text-xl text-[#111111] hover:text-[#0055A4] uppercase transition-colors"
                >
                  {nextProject.title} →
                </button>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                BACK TO PORTFOLIO
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
