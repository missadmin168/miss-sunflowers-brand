import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import SunflowerLogo from '@/components/SunflowerLogo';
import Portrait from '@/components/Portrait';
import { LangToggle, ThemeToggle } from '@/components/Toggles';
import { TierBadge, VerifiedBanner, DangerBanner, LiveClock } from '@/components/Badges';
import Modal from '@/components/Modal';
import { dealers, tierLabels } from '@/data/mockData';
import type { Dealer } from '@/data/mockData';
import { Search, QrCode, Facebook, Music2, ShieldCheck, AlertTriangle, Globe, MapPin, Phone, Send } from 'lucide-react';

interface Props {
  onLoginClick: () => void;
}

type VerifyState = 'idle' | 'verified' | 'suspended' | 'notfound';

export default function PublicHub({ onLoginClick }: Props) {
  const { t, lang, isDark, eyeComfort } = useApp();
  const headerBg = isDark ? 'rgba(13,10,4,0.88)' : eyeComfort ? 'rgba(247,225,160,0.88)' : 'rgba(255,243,196,0.88)';
  const headerBorder = isDark ? '#3A2E14' : eyeComfort ? 'rgba(180,83,9,0.25)' : 'rgba(234,179,8,0.35)';
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Dealer | null>(null);
  const [verifyState, setVerifyState] = useState<VerifyState>('idle');
  const [qrOpen, setQrOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const doVerify = (q: string) => {
    const found = dealers.find(
      (d) => d.phone === q || d.code.toLowerCase() === q.toLowerCase() ||
        d.fb.toLowerCase().includes(q.toLowerCase()) || d.tiktok.toLowerCase().includes(q.toLowerCase())
    );
    if (found) {
      setResult(found);
      setVerifyState(found.status === 'suspended' ? 'suspended' : 'verified');
    } else if (q.trim()) {
      setResult(null);
      setVerifyState('notfound');
    }
  };

  const quickTest = (phone: string) => {
    setQuery(phone);
    doVerify(phone);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md" style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SunflowerLogo size={36} />
            <div>
              <p className="text-sm font-bold text-pri leading-tight">Miss Sunflower</p>
              <span className="pill text-[10px] font-semibold" style={{ background: 'var(--bg-card-accent)', color: 'var(--accent-deep)', border: '1px solid var(--border-base)' }}>{t('demoPreview')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Login button */}
        <button onClick={onLoginClick} className="btn-gold w-full text-sm flex items-center justify-center gap-2">
          <ShieldCheck size={16} />
          {t('dealerLogin')}
        </button>

        {/* Hero Verification Card */}
        <div className="surface p-5 space-y-4 surface-hover">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck size={20} className="text-sunflower-400" />
              <h1 className="font-display text-xl font-bold text-pri">{t('verifyTitle')}</h1>
            </div>
            <p className="text-xs text-sec">{t('verifySubtitle')}</p>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && doVerify(query)}
              placeholder={t('searchPlaceholder')}
              className="input-field flex-1"
            />
            <button onClick={() => doVerify(query)} className="btn-gold px-4">
              <Search size={18} />
            </button>
            <button onClick={() => setQrOpen(true)} className="btn-ghost px-3" aria-label="Scan QR">
              <QrCode size={18} />
            </button>
          </div>

          {/* Quick test chips */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => quickTest('012111222')} className="pill bg-green-100 text-green-800 border border-green-300 hover:scale-105 transition-transform">
              ✅ {t('chipVerified')} (012111222)
            </button>
            <button onClick={() => quickTest('+82-10-5555-6666')} className="pill bg-blue-100 text-blue-800 border border-blue-300 hover:scale-105 transition-transform">
              🌍 {t('chipOverseas')} (Korea)
            </button>
            <button onClick={() => quickTest('012444555')} className="pill bg-red-100 text-red-800 border border-red-300 hover:scale-105 transition-transform">
              ⛔ {t('chipSuspended')} (012444555)
            </button>
            <button onClick={() => quickTest('fake')} className="pill bg-orange-100 text-orange-800 border border-orange-300 hover:scale-105 transition-transform">
              ⚠️ {t('chipFake')} (Fake)
            </button>
          </div>
        </div>

        {/* Results */}
        {verifyState === 'verified' && result && (
          <VerifiedCard dealer={result} onReport={() => setReportOpen(true)} />
        )}
        {verifyState === 'suspended' && result && (
          <SuspendedCard dealer={result} onReport={() => setReportOpen(true)} />
        )}
        {verifyState === 'notfound' && (
          <NotFoundCard onReport={() => setReportOpen(true)} />
        )}

        {/* Idle state info */}
        {verifyState === 'idle' && (
          <div className="surface-alt p-5 text-center space-y-2">
            <ShieldCheck size={32} className="text-sunflower-400 mx-auto" />
            <p className="text-sm font-semibold text-pri">{t('verifyTitle')}</p>
            <p className="text-xs text-sec">{t('verifySubtitle')}</p>
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} onScan={quickTest} />

      {/* Report Modal */}
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
    </div>
  );
}

function VerifiedCard({ dealer, onReport }: { dealer: Dealer; onReport: () => void }) {
  const { t, lang } = useApp();
  return (
    <div className="surface overflow-hidden animate-slide-up">
      <div className="p-4 space-y-4">
        <VerifiedBanner text={`✅ ${t('officialDealer')}`} />
        <LiveClock />

        {/* Portrait with watermark */}
        <div className="flex gap-4">
          <Portrait color={dealer.portraitColor} name={dealer.name} size={100} watermark rounded="rounded-2xl" />
          <div className="flex-1 space-y-1.5 min-w-0">
            <h3 className="font-bold text-pri text-lg leading-tight">{dealer.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-sec">{t('code')}:</span>
              <span className="text-sm font-mono font-bold text-pri">{dealer.code}</span>
            </div>
            <TierBadge tier={dealer.tier} />
            <div className="flex items-center gap-1.5 text-xs text-sec">
              <MapPin size={12} /> <span className="truncate">{dealer.location[lang]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-sec">
              <Phone size={12} /> <span className="font-mono">{dealer.phone}</span>
            </div>
          </div>
        </div>

        {/* Official Social Media Box */}
        <div className="surface-alt p-3 space-y-2">
          <p className="text-xs font-bold text-sec uppercase tracking-wide">{t('officialSocial')}</p>
          <div className="space-y-2">
            <a href={`https://facebook.com/${dealer.fb}`} target="_blank" rel="noreferrer" className="social-pill bg-blue-50 border-blue-200">
              <Facebook size={16} className="text-blue-600 shrink-0" />
              <span className="text-xs font-semibold text-blue-800 break-all leading-tight">{dealer.fb}</span>
            </a>
            <a href={`https://tiktok.com/${dealer.tiktok}`} target="_blank" rel="noreferrer" className="social-pill" style={{ background: 'var(--bg-card-alt)', borderColor: 'var(--border-base)' }}>
              <Music2 size={16} className="text-pri shrink-0" />
              <span className="text-xs font-semibold text-pri break-all leading-tight">{dealer.tiktok}</span>
            </a>
          </div>
        </div>

        {/* Legal notice */}
        <div className="text-xs text-sec leading-relaxed border-l-2 border-sunflower-400 pl-3 italic">
          {t('legalNotice')}
        </div>
      </div>

      {/* Watermark overlay */}
      <div className="absolute inset-0 watermark-diagonal pointer-events-none rounded-2xl" />
    </div>
  );
}

function SuspendedCard({ dealer, onReport }: { dealer: Dealer; onReport: () => void }) {
  const { t, lang } = useApp();
  return (
    <div className="surface overflow-hidden animate-slide-up">
      <div className="p-4 space-y-4">
        <DangerBanner title={`⛔ ${t('suspendedTitle')}`} msg={t('suspendedMsg')} />

        <div className="flex gap-4 opacity-60">
          <Portrait color={dealer.portraitColor} name={dealer.name} size={80} rounded="rounded-2xl" />
          <div className="flex-1 space-y-1">
            <h3 className="font-bold text-pri">{dealer.name}</h3>
            <span className="text-xs font-mono text-sec">{dealer.code}</span>
            <div className="flex items-center gap-1.5 text-xs text-sec">
              <MapPin size={12} /> {dealer.location[lang]}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-sec">
              <Phone size={12} /> {dealer.phone}
            </div>
          </div>
        </div>

        <button onClick={onReport} className="w-full px-4 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-red-700">
          <AlertTriangle size={16} />
          {t('reportFake')}
        </button>
      </div>
    </div>
  );
}

function NotFoundCard({ onReport }: { onReport: () => void }) {
  const { t } = useApp();
  return (
    <div className="surface p-5 space-y-4 animate-slide-up">
      <DangerBanner title={`⚠️ ${t('notFound')}`} msg={t('counterfeitWarning')} />
      <button onClick={onReport} className="w-full px-4 py-3 rounded-xl bg-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform hover:bg-red-700">
        <AlertTriangle size={16} />
        {t('reportFake')}
      </button>
    </div>
  );
}

function QRModal({ open, onClose, onScan }: { open: boolean; onClose: () => void; onScan: (q: string) => void }) {
  const { t } = useApp();
  return (
    <Modal open={open} onClose={onClose} title={t('qrTitle')} subtitle={t('qrSimulated')} icon={<QrCode size={18} />}>
      <div className="space-y-4">
        {/* Simulated scanner viewfinder */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-black flex items-center justify-center">
          <div className="absolute inset-0 qr-placeholder opacity-30" />
          {/* Corner brackets */}
          {['top-3 left-3 border-t-2 border-l-2', 'top-3 right-3 border-t-2 border-r-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'].map((c, i) => (
            <div key={i} className={`absolute w-8 h-8 ${c} border-sunflower-400 rounded-sm`} />
          ))}
          {/* Scan line */}
          <div className="absolute left-4 right-4 h-0.5 bg-sunflower-400 animate-pulse" style={{ top: '50%', boxShadow: '0 0 10px rgba(245,183,0,0.6)' }} />
          <QrCode size={48} className="text-sunflower-400/40" />
        </div>
        <p className="text-center text-xs text-sec">{t('qrHint')}</p>

        {/* Quick test buttons */}
        <div className="grid grid-cols-1 gap-2">
          <button onClick={() => { onScan('012111222'); onClose(); }} className="btn-ghost text-xs">
            ✅ {t('chipVerified')} — 012111222
          </button>
          <button onClick={() => { onScan('012444555'); onClose(); }} className="btn-ghost text-xs">
            ⛔ {t('chipSuspended')} — 012444555
          </button>
          <button onClick={() => { onScan('fake123'); onClose(); }} className="btn-ghost text-xs">
            ⚠️ {t('chipFake')} — Unknown
          </button>
        </div>
      </div>
    </Modal>
  );
}

function ReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, showToast } = useApp();
  const [link, setLink] = useState('');
  const [note, setNote] = useState('');

  const submit = () => {
    showToast(t('toastReported'));
    setLink(''); setNote('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={t('reportFake')} icon={<AlertTriangle size={18} />}>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('reportLink')}</label>
          <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="facebook.com/..." className="input-field" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('reportNote')}</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="..." className="input-field resize-none" />
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="btn-ghost flex-1">{t('cancel')}</button>
          <button onClick={submit} className="btn-gold flex-1 flex items-center justify-center gap-2">
            <Send size={15} /> {t('submit')}
          </button>
        </div>
      </div>
    </Modal>
  );
}
