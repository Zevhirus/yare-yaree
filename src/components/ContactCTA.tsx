import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Globe, MapPin, ArrowUpRight, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { WireframeGlobe } from './WireframeGlobe';
import { submitContactMessage } from '../lib/supabase';
import { SiteSettings } from '../types';

interface ContactCTAProps {
  settings: SiteSettings;
}

export function ContactCTA({ settings }: ContactCTAProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please enter a message of at least 10 characters.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Failed to submit message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      
      {/* 3D Wireframe Globe background decoration */}
      <div className="absolute right-[-80px] lg:right-[-40px] bottom-[-60px] pointer-events-none z-0 opacity-80 select-none">
        <WireframeGlobe size={520} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2.5 h-2.5 bg-[#0077B6] rounded-sm shadow-[0_0_8px_#0077B6]" />
          <h2 className="text-sm font-mono font-bold tracking-widest text-[#0F172A] uppercase">
            MARI BERKOLABORASI
          </h2>
        </div>

        {/* Big Display Title */}
        <div className="mb-14">
          <h3 className="font-display font-black leading-[0.92] tracking-[-0.04em] text-[clamp(2.8rem,7vw,6.5rem)] uppercase text-[#0F172A]">
            HAVE A PROJECT{' '}
            <span className="text-[#0055A4] drop-shadow-[0_2px_14px_rgba(0,85,164,0.3)] block sm:inline">
              IN MIND?
            </span>
          </h3>
          <p className="mt-6 text-sm md:text-base text-[#475569] font-sans max-w-xl leading-relaxed">
            Terbuka untuk diskusi proyek baru, kolaborasi pengembangan web app, sistem persuratan instansi, atau ide digital kreatif lainnya.
          </p>
        </div>

        {/* Content Split: Form on Left, Contact Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Area */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 md:p-10 border border-slate-200 shadow-lg">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-900/10 border border-[#0055A4] flex items-center justify-center text-[#0055A4] mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-black text-2xl uppercase tracking-tight text-[#0F172A] mb-2">
                    PESAN TERKIRIM ✓
                  </h4>
                  <p className="text-sm text-[#475569] font-sans max-w-md mb-8">
                    Terima kasih! Pesan Anda telah tersimpan dan akan segera saya balas via email. {settings.responseTime || 'Biasanya dibalas dalam 1 hari kerja.'}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2.5 rounded-xl bg-[#003366] text-white text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#002244] transition-colors"
                  >
                    KIRIM PESAN LAIN
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-slate-900 uppercase mb-2">
                        NAMA LENGKAP *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4] focus:ring-2 focus:ring-[#0077B6]/20 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold tracking-wider text-slate-900 uppercase mb-2">
                        ALAMAT EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Contoh: budi@company.com"
                        className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4] focus:ring-2 focus:ring-[#0077B6]/20 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-wider text-slate-900 uppercase mb-2">
                      SUBJEK PROYEK
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Contoh: Pembuatan Website Portal Desa / Web App"
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4] focus:ring-2 focus:ring-[#0077B6]/20 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold tracking-wider text-slate-900 uppercase mb-2">
                      DETAIL KEBUTUHAN / PESAN *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan gambaran proyek, target waktu, atau fitur yang ingin dibangun..."
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0055A4] focus:ring-2 focus:ring-[#0077B6]/20 transition-all font-sans resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-mono">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    data-cursor="KIRIM"
                    className="group self-start inline-flex items-center gap-3 px-8 py-4 bg-[#0055A4] hover:bg-[#003366] text-white text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition-all shadow-md hover:shadow-xl hover:translate-y-[-2px] disabled:opacity-50"
                  >
                    <span>{status === 'submitting' ? 'MENGIRIM...' : 'KIRIM PESAN SEKARANG'}</span>
                    {status === 'submitting' ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Details Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Email Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 hover:border-[#0077B6]/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono uppercase tracking-widest mb-1.5">
                <Mail className="w-4 h-4 text-[#0055A4]" />
                <span>EMAIL RESMI</span>
              </div>
              <a
                href={`mailto:${settings.email}`}
                data-cursor="EMAIL"
                className="font-display font-bold text-lg md:text-xl text-[#0F172A] hover:text-[#0055A4] transition-colors tracking-tight"
              >
                {settings.email}
              </a>
            </div>

            {/* GitHub Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 hover:border-[#0077B6]/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono uppercase tracking-widest mb-1.5">
                <Globe className="w-4 h-4 text-[#0055A4]" />
                <span>GITHUB REPOSITORY</span>
              </div>
              <a
                href={settings.socials.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="GITHUB"
                className="font-display font-bold text-lg md:text-xl text-[#0F172A] hover:text-[#0055A4] transition-colors tracking-tight flex items-center justify-between"
              >
                <span>github.com/Zevhirus</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Instagram Card */}
            <div className="glass-card p-6 rounded-2xl border border-slate-200 hover:border-[#0077B6]/50 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono uppercase tracking-widest mb-1.5">
                <Globe className="w-4 h-4 text-[#0055A4]" />
                <span>INSTAGRAM</span>
              </div>
              <a
                href={settings.socials.instagram}
                target="_blank"
                rel="noreferrer"
                data-cursor="INSTAGRAM"
                className="font-display font-bold text-lg md:text-xl text-[#0F172A] hover:text-[#0055A4] transition-colors tracking-tight flex items-center justify-between"
              >
                <span>@jelly_fish.env</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Response Time Guarantee Card */}
            <div className="p-6 rounded-2xl bg-[#003366]/[0.05] border border-[#0077B6]/25 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2 font-bold text-[#003366] uppercase mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0077B6]" />
                <span>WAKTU RESPON</span>
              </div>
              <p className="leading-relaxed">
                {settings.responseTime || 'Biasanya dibalas dalam 1 hari kerja.'}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
