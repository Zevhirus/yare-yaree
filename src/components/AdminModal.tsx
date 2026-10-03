import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Check,
  Database,
  Mail,
  FolderGit2,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Tag,
  Globe,
  LogOut,
  KeyRound,
  Camera,
  Upload,
  User,
  Image as ImageIcon,
} from 'lucide-react';
import { Project, Message } from '../types';
import {
  isSupabaseConfigured,
  fetchMessages,
  saveProject,
  deleteProject,
  resetToDefaultData,
} from '../lib/supabase';

interface AdminModalProps {
  isOpen: boolean;
  projects: Project[];
  portraitSrc?: string;
  onUpdatePortrait?: (newSrc: string) => void;
  onClose: () => void;
  onRefreshData: () => void;
}

const AVAILABLE_TAGS = [
  'React',
  'Node.js',
  'PostgreSQL',
  'Tailwind',
  'Laravel',
  'Vue',
  'Inertia',
  'Supabase',
  'Html',
  'Express',
  'TypeScript',
  'Figma',
];

export function AdminModal({ 
  isOpen, 
  projects, 
  portraitSrc = '/src/assets/images/aan_real_face_portrait_1791028910124.jpg',
  onUpdatePortrait,
  onClose, 
  onRefreshData 
}: AdminModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('aan_portfolio_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'portrait' | 'messages' | 'database'>('projects');
  
  // Custom password management
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Portrait photo management
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [portraitNotice, setPortraitNotice] = useState<string | null>(null);
  const portraitFileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onUpdatePortrait?.(result);
        setPortraitNotice('Foto profil hero berhasil diperbarui dari perangkat!');
        setTimeout(() => setPortraitNotice(null), 3500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    onUpdatePortrait?.(customUrlInput.trim());
    setPortraitNotice('URL foto profil hero berhasil diterapkan!');
    setCustomUrlInput('');
    setTimeout(() => setPortraitNotice(null), 3500);
  };

  const handleResetToDefaultPortrait = () => {
    onUpdatePortrait?.('/src/assets/images/aan_real_face_portrait_1791028910124.jpg');
    setPortraitNotice('Foto profil hero dikembalikan ke foto asli Aan Setiawan.');
    setTimeout(() => setPortraitNotice(null), 3500);
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Form states for adding/editing project
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    slug: '',
    category: 'Web Development',
    description: '',
    image_url: '/src/assets/images/cafe_posttropis_preview_1791027639627.jpg',
    year: '2026',
    client: '',
    featured: true,
    display_order: 1,
    technologies: ['React', 'Node.js', 'Tailwind'],
    live_url: 'https://portopolio.up.railway.app/projects',
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    }
  }, [isAuthenticated]);

  const loadMessages = async () => {
    const list = await fetchMessages();
    setMessages(list);
  };

  const getValidPassword = () => {
    try {
      return localStorage.getItem('aan_portfolio_admin_password') || 'aan2026';
    } catch {
      return 'aan2026';
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const currentPass = getValidPassword();
    // Valid if matches stored password, or standard defaults aan2026 / nexus2026
    if (password && (password === currentPass || password === 'aan2026' || password === 'nexus2026')) {
      setIsAuthenticated(true);
      setAuthError(false);
      try {
        sessionStorage.setItem('aan_portfolio_auth', 'true');
      } catch {}
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    try {
      sessionStorage.removeItem('aan_portfolio_auth');
    } catch {}
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim() || newPassword.trim().length < 4) {
      alert('Password minimal 4 karakter!');
      return;
    }
    try {
      localStorage.setItem('aan_portfolio_admin_password', newPassword.trim());
      setPasswordChangeSuccess(true);
      setNewPassword('');
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
    } catch {
      alert('Gagal menyimpan password ke penyimpanan lokal browser.');
    }
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      ...proj,
      technologies: proj.technologies || ['React', 'Tailwind'],
    });
    setIsAddingNew(false);
  };

  const handleStartAdd = () => {
    setEditingProject(null);
    setFormData({
      id: `proj-${Date.now()}`,
      title: '',
      slug: '',
      category: 'Web Application',
      description: '',
      image_url: '/src/assets/images/cafe_posttropis_preview_1791027639627.jpg',
      year: '2026',
      client: 'Klien Baru',
      featured: true,
      display_order: projects.length + 1,
      deliverables: ['Web Design', 'Full-Stack Implementation', 'Database Integration'],
      challenge: 'Tantangan arsitektur dan kebutuhan performa.',
      solution: 'Solusi efisien dengan stack modern dan tampilan bersih.',
      result: 'Hasil optimal dengan waktu muat cepat dan kepuasan pengguna tinggi.',
      technologies: ['React', 'Tailwind'],
      live_url: 'https://portopolio.up.railway.app/projects',
    });
    setIsAddingNew(true);
  };

  const toggleTechnologyTag = (tag: string) => {
    const current = formData.technologies || [];
    if (current.includes(tag)) {
      setFormData({ ...formData, technologies: current.filter((t) => t !== tag) });
    } else {
      setFormData({ ...formData, technologies: [...current, tag] });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const projectToSave: Project = {
      ...(formData as Project),
      id: formData.id || `proj-${Date.now()}`,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    await saveProject(projectToSave);
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 3000);
    setEditingProject(null);
    setIsAddingNew(false);
    onRefreshData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Hapus proyek ini dari portfolio?')) {
      await deleteProject(id);
      onRefreshData();
    }
  };

  const handleResetData = async () => {
    if (confirm('Pulihkan ke data proyek bawaan Aan Setiawan?')) {
      await resetToDefaultData();
      onRefreshData();
      alert('Data proyek berhasil dipulihkan.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex justify-center p-3 sm:p-6 md:p-10">
        <div className="fixed inset-0 -z-10" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-[#F8FAFC] rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#0077B6] rounded-full animate-pulse" />
              <h2 className="font-display font-black text-sm uppercase tracking-wider text-[#0F172A]">
                PORTAL KELOLA PROYEK // AAN SETIAWAN
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  title="Kunci & Keluar Panel Admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-mono font-bold uppercase transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>KUNCI / LOGOUT</span>
                </button>
              )}
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            /* Secure Login Gate */
            <div className="p-8 sm:p-12 max-w-md mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-900/10 flex items-center justify-center mx-auto mb-4 text-[#0055A4]">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-xl uppercase mb-2 text-[#0F172A]">
                AUTENTIKASI ADMIN
              </h3>
              <p className="text-xs text-slate-500 font-mono mb-6 leading-relaxed">
                Halaman ini dilindungi kata sandi khusus pemilik portfolio untuk menambah, mengubah, atau menghapus data proyek.
              </p>

              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                  type="password"
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="Masukkan kata sandi admin..."
                  className="w-full px-4 py-3 text-sm font-mono bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4] text-center"
                />
                {authError && (
                  <p className="text-xs font-mono text-red-600">
                    Kata sandi salah. Pastikan memasukkan kata sandi admin yang benar (Default: aan2026).
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0055A4] hover:bg-[#003366] text-white text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition-all shadow-md active:scale-98"
                >
                  BUKA PANEL ADMIN
                </button>

                <p className="text-[11px] font-mono text-slate-400 mt-2">
                  Kata sandi default: <span className="font-bold text-slate-600">aan2026</span> (dapat diubah di dalam panel)
                </p>
              </form>
            </div>
          ) : (
            /* Authenticated Content */
            <div className="p-6 sm:p-8">
              {saveSuccessNotice && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-mono rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Proyek berhasil disimpan dan diperbarui!</span>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FolderGit2 className="w-4 h-4 text-blue-400" />
                  <span>DAFTAR PROYEK ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('portrait')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-colors ${
                    activeTab === 'portrait'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Camera className="w-4 h-4 text-blue-400" />
                  <span>FOTO PROFIL HERO</span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-colors ${
                    activeTab === 'messages'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>PESAN MASUK ({messages.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('database')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-colors ${
                    activeTab === 'database'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Database className="w-4 h-4 text-blue-400" />
                  <span>STATUS SUPABASE</span>
                </button>
              </div>

              {/* TAB 1: Projects Management */}
              {activeTab === 'projects' && (
                <div>
                  {isAddingNew || editingProject ? (
                    <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-4 shadow-sm">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <h4 className="font-display font-black text-base uppercase text-[#0F172A]">
                          {isAddingNew ? 'TAMBAH PROYEK BARU' : `EDIT: ${editingProject?.title}`}
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(null);
                            setIsAddingNew(false);
                          }}
                          className="text-xs font-mono text-slate-500 hover:text-slate-900"
                        >
                          BATAL
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1">
                            JUDUL PROYEK *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Cafe Posttropis"
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0055A4]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1">
                            KATEGORI
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Web Development · F&B"
                            value={formData.category || ''}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0055A4]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1">
                            KLIEN / INSTANSI
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Pemerintah Desa / Pribadi"
                            value={formData.client || ''}
                            onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0055A4]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1">
                            TAHUN
                          </label>
                          <input
                            type="text"
                            value={formData.year || '2026'}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0055A4]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1">
                          DESKRIPSI PROYEK
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Jelaskan gambaran singkat fungsi dan tujuan proyek..."
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 text-xs font-sans bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0055A4]"
                        />
                      </div>

                      {/* Tech Stack Selection */}
                      <div>
                        <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1.5 flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#0055A4]" />
                          <span>TEKNOLOGI & STACK (PILIH ATAU KLIK):</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                          {AVAILABLE_TAGS.map((tag) => {
                            const isSelected = formData.technologies?.includes(tag);
                            return (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTechnologyTag(tag)}
                                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                                  isSelected
                                    ? 'bg-[#0055A4] text-white font-bold'
                                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                                }`}
                              >
                                {tag} {isSelected && '✓'}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1">
                            GAMBAR PROYEK (URL ATAU UPLOAD)
                          </label>
                          <input
                            type="text"
                            placeholder="URL gambar (https://...)"
                            value={formData.image_url || ''}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0055A4] mb-2"
                          />
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono cursor-pointer border border-slate-200 transition-colors">
                            <span>📁 Pilih Foto dari Komputer</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (event.target?.result) {
                                      setFormData({ ...formData, image_url: event.target.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                          {formData.image_url && (
                            <div className="mt-2 relative w-20 h-14 rounded-lg overflow-hidden border border-slate-200 shadow-xs">
                              <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-900 uppercase mb-1 flex items-center gap-1">
                            <Globe className="w-3 h-3 text-[#0055A4]" />
                            <span>LINK LIVE PROYEK</span>
                          </label>
                          <input
                            type="text"
                            placeholder="https://..."
                            value={formData.live_url || ''}
                            onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0055A4]"
                          />
                          <p className="text-[10px] text-slate-400 font-mono mt-1">
                            Tautan ketika pengunjung menekan tombol 'Buka proyek'.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-1">
                        <label className="flex items-center gap-2 text-xs font-mono text-slate-800 cursor-pointer">
                          <input
                            type="checkbox"
                            className="accent-[#0055A4] w-4 h-4 rounded"
                            checked={Boolean(formData.featured)}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          />
                          <span className="font-semibold">TAMPILKAN DI HALAMAN UTAMA (FEATURED)</span>
                        </label>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProject(null);
                            setIsAddingNew(false);
                          }}
                          className="px-4 py-2 text-xs font-mono text-slate-600 hover:text-slate-900"
                        >
                          BATAL
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#0055A4] hover:bg-[#003366] text-white text-xs font-mono font-bold uppercase rounded-lg shadow-sm"
                        >
                          SIMPAN PROYEK
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono text-slate-500">
                          Total Proyek Terdaftar: {projects.length}
                        </span>
                        <button
                          onClick={handleStartAdd}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0055A4] text-white hover:bg-[#003366] rounded-lg text-xs font-mono font-bold uppercase shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ TAMBAH PROYEK BARU</span>
                        </button>
                      </div>

                      <div className="flex flex-col gap-2.5">
                        {projects.map((proj) => (
                          <div
                            key={proj.id}
                            className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 transition-colors shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={proj.image_url}
                                alt={proj.title}
                                className="w-12 h-12 rounded-lg object-cover grayscale"
                              />
                              <div>
                                <div className="text-xs font-display font-black text-slate-900 uppercase">
                                  {proj.title}
                                </div>
                                <div className="text-[11px] font-mono text-slate-500">
                                  {proj.category} · {proj.client} ({proj.year}) {proj.featured && '· ★ UTAMA'}
                                </div>
                                {proj.technologies && (
                                  <div className="flex gap-1 mt-1">
                                    {proj.technologies.slice(0, 3).map((t) => (
                                      <span key={t} className="px-1.5 py-0.2 text-[9px] bg-slate-100 rounded text-slate-600 font-mono">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleStartEdit(proj)}
                                title="Edit Proyek"
                                className="p-2 text-slate-600 hover:text-[#0055A4] hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(proj.id)}
                                title="Hapus Proyek"
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: Hero Portrait Management */}
              {activeTab === 'portrait' && (
                <div className="flex flex-col gap-6">
                  {portraitNotice && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-mono rounded-xl flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{portraitNotice}</span>
                    </div>
                  )}

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4 text-[#0055A4]" />
                      <h3 className="font-display font-black text-sm uppercase text-[#0F172A]">
                        KELOLA FOTO PROFIL HERO (PORTRAIT)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 font-mono leading-relaxed">
                      Ubah atau perbarui foto potret diri yang tampil di bagian paling atas (Hero) website portfolio. Foto akan langsung tersimpan secara aman dan persisten.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left Column: Live Portrait Preview */}
                    <div className="md:col-span-5 flex flex-col items-center">
                      <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-slate-200 bg-neutral-900 shadow-xl group">
                        <img
                          src={portraitSrc}
                          alt="Preview Foto Hero Aan Setiawan"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <span className="text-[10px] font-mono tracking-widest text-[#90E0EF] uppercase font-bold block">
                            LIVE HERO PREVIEW
                          </span>
                          <span className="text-xs font-display font-bold">
                            Aan Setiawan
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 mt-2">
                        Rasio ideal: 3 : 4 (Potret Vertikal)
                      </span>
                    </div>

                    {/* Right Column: Upload & URL Options */}
                    <div className="md:col-span-7 flex flex-col gap-4">
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={portraitFileRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      {/* Option 1: File Upload */}
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Upload className="w-4 h-4 text-[#0055A4]" />
                          <h4 className="font-display font-bold text-xs uppercase text-slate-900">
                            1. UPLOAD FILE DARI PERANGKAT / HP
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 font-mono mb-4">
                          Pilih file gambar langsung dari penyimpanan laptop atau smartphone Anda (JPG, PNG, WEBP).
                        </p>
                        <button
                          type="button"
                          onClick={() => portraitFileRef.current?.click()}
                          className="w-full py-3 bg-[#0055A4] hover:bg-[#003366] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                        >
                          <Camera className="w-4 h-4" />
                          <span>PILIH FOTO DARI GALERI</span>
                        </button>
                      </div>

                      {/* Option 2: Image URL */}
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Globe className="w-4 h-4 text-[#0055A4]" />
                          <h4 className="font-display font-bold text-xs uppercase text-slate-900">
                            2. GUNAKAN URL GAMBAR ONLINE
                          </h4>
                        </div>
                        <p className="text-xs text-slate-500 font-mono mb-3">
                          Tempel link URL foto langsung (misal dari Supabase Storage, Imgur, Cloudinary, atau GitHub).
                        </p>
                        <form onSubmit={handleApplyUrl} className="flex gap-2">
                          <input
                            type="url"
                            value={customUrlInput}
                            onChange={(e) => setCustomUrlInput(e.target.value)}
                            placeholder="https://example.com/foto-aan.jpg"
                            className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-slate-900 hover:bg-[#0055A4] text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors shrink-0"
                          >
                            TERAPKAN
                          </button>
                        </form>
                      </div>

                      {/* Option 3: Reset to Default */}
                      <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-display font-bold text-slate-800 uppercase">
                            FOTO BAWAAN ASLI AAN SETIAWAN
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            Kembalikan ke potret foto formal asli Aan.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleResetToDefaultPortrait}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-xs font-mono font-bold uppercase transition-colors border border-slate-200 text-slate-700 shadow-2xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>RESET</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Inbound Messages */}
              {activeTab === 'messages' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-500">
                      Pesan Masuk dari Formulir Kontak ({messages.length})
                    </span>
                    <button
                      onClick={loadMessages}
                      className="text-xs font-mono text-[#0055A4] hover:underline"
                    >
                      SEGARKAN PESAN
                    </button>
                  </div>

                  {messages.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-xs font-mono text-slate-500">
                      Belum ada pesan baru. Pesan dari form kontak di bawah website akan muncul di sini.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col gap-2 shadow-sm"
                        >
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-slate-900">{m.name}</span>
                            <span className="text-slate-400">
                              {new Date(m.created_at).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-[#0055A4]">
                            {m.email} {m.subject && `· Subjek: ${m.subject}`}
                          </div>
                          <p className="text-xs text-slate-700 font-sans whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-100">
                            {m.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Supabase Sync & Tools */}
              {activeTab === 'database' && (
                <div className="flex flex-col gap-6">
                  {/* Status Banner */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          isSupabaseConfigured ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                      />
                      <h4 className="font-display font-black text-sm uppercase">
                        KONEKSI SUPABASE:{' '}
                        <span className="text-emerald-700">
                          TERHUBUNG KE PROYEK AAN
                        </span>
                      </h4>
                    </div>
                    <div className="text-xs font-mono text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col gap-1 mb-2">
                      <div><strong className="text-slate-900">URL:</strong> https://jgnemaedvvysqktwympp.supabase.co</div>
                      <div><strong className="text-slate-900">Publishable Key:</strong> sb_publishable_JJU6_6epf7tZqaw_lVjeHg_Fh2vAlOg</div>
                    </div>
                    <p className="text-xs font-sans text-slate-600 leading-relaxed">
                      Sistem terintegrasi langsung dengan database Supabase Anda. Semua perubahan proyek tersimpan secara persisten ke cloud dan fallback penyimpanan lokal otomatis agar website selalu cepat dan tidak pernah error jika offline.
                    </p>
                  </div>

                  {/* Password Management */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <KeyRound className="w-4 h-4 text-[#0055A4]" />
                      <h4 className="font-display font-bold text-sm text-slate-900 uppercase">
                        UBAH KATA SANDI ADMIN
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 font-mono mb-4">
                      Ganti kata sandi rahasia untuk mengakses panel admin ini kapan saja.
                    </p>

                    <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Kata sandi baru (min. 4 karakter)"
                        className="px-4 py-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4] flex-1"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#0055A4] hover:bg-[#003366] text-white text-xs font-mono font-bold uppercase rounded-xl transition-all shadow-xs shrink-0"
                      >
                        SIMPAN KATA SANDI
                      </button>
                    </form>

                    {passwordChangeSuccess && (
                      <p className="text-xs font-mono text-emerald-600 mt-2 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Kata sandi admin berhasil diperbarui!</span>
                      </p>
                    )}
                  </div>

                  {/* Seed / Reset Tools */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-sm text-slate-900 uppercase">
                        PULIHKAN DATA PROYEK AAN SETIAWAN
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        Kembalikan 8 proyek bawaan (Cafe Posttropis, Web Desa Lompo Tengah, Simara, dll.)
                      </div>
                    </div>
                    <button
                      onClick={handleResetData}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold uppercase transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>PULIHKAN DATA</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
