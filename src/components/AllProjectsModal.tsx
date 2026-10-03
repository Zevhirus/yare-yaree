import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Search } from 'lucide-react';
import { Project } from '../types';

interface AllProjectsModalProps {
  isOpen: boolean;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export function AllProjectsModal({
  isOpen,
  projects,
  onClose,
  onSelectProject,
}: AllProjectsModalProps) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const categories = [
    'Semua',
    'React',
    'Node.js',
    'PostgreSQL',
    'Tailwind',
    'Laravel',
    'Vue',
    'Inertia',
    'Supabase',
    'Html',
  ];

  const filtered = projects.filter((p) => {
    const filterUpper = filter.toUpperCase();
    const matchesCategory =
      filter === 'Semua' ||
      p.category.toUpperCase().includes(filterUpper) ||
      p.title.toUpperCase().includes(filterUpper) ||
      (p.technologies && p.technologies.some(t => t.toUpperCase() === filterUpper || t.toUpperCase().includes(filterUpper)));

    const matchesSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.technologies && p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-center p-3 sm:p-6 md:p-10">
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="relative w-full max-w-6xl bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto"
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#0077B6] rounded-sm shadow-[0_0_8px_#0077B6]" />
              <h2 className="font-display font-black text-xl text-[#0F172A] uppercase tracking-tight">
                ARSIP PROYEK ({projects.length})
              </h2>
            </div>

            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {/* Filter & Search Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider rounded-lg transition-all ${
                      filter === cat
                        ? 'bg-[#0055A4] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari proyek atau teknologi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4] w-full sm:w-64"
                />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    onClose();
                    onSelectProject(proj);
                  }}
                  data-cursor="LIHAT"
                  className="group cursor-pointer rounded-2xl bg-white border border-slate-200 hover:border-[#0077B6]/50 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 mb-4">
                      <img
                        src={proj.image_url}
                        alt={proj.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded bg-black/70 text-[10px] font-mono text-white">
                        {proj.year}
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-[#0055A4] tracking-wider uppercase mb-1 font-semibold">
                      {proj.category}
                    </div>
                    <h3 className="font-display font-black text-lg text-[#0F172A] uppercase tracking-tight group-hover:text-[#0055A4] transition-colors mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-sans line-clamp-2 mb-4 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tech tags preview */}
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.technologies.slice(0, 4).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">{proj.client}</span>
                    <span className="flex items-center gap-1 font-bold text-[#0055A4] group-hover:translate-x-0.5 transition-transform">
                      Buka proyek <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-400 font-mono text-xs">
                Tidak ada proyek yang sesuai dengan kriteria filter "{filter}".
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
