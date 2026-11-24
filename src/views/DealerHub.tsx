import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import { Bell, Package, IdCard, User, Settings, Copy, Download, Send, Search, MapPin, Phone, Facebook, Music2, ChevronRight, KeyRound, LogOut, Smartphone, Plus } from 'lucide-react';
import SunflowerLogo from '@/components/SunflowerLogo';
import Portrait from '@/components/Portrait';
import QRPlaceholder from '@/components/QRPlaceholder';
import { LangToggle } from '@/components/Toggles';
import { TierBadge, StockBadge } from '@/components/Badges';
import { SettingsSection } from '@/components/SettingsSection';
import { broadcasts, products, currentDealer, tierLabels } from '@/data/mockData';
import type { DealerTier } from '@/data/mockData';

type Tab = 'feed' | 'stock' | 'myid' | 'account' | 'settings';

interface Props {
  onLogout: () => void;
  onGoPublic: () => void;
}

export default function DealerHub({ onLogout, onGoPublic }: Props) {
  const { t, isDark, eyeComfort } = useApp();
  const [tab, setTab] = useState<Tab>('feed');
  const [showPWA, setShowPWA] = useState(true);

  const tabs: { id: Tab; label: string; icon: typeof Bell; dot?: boolean }[] = [
    { id: 'feed', label: t('tabFeed'), icon: Bell, dot: true },
    { id: 'stock', label: t('tabStock'), icon: Package },
    { id: 'myid', label: t('tabMyId'), icon: IdCard },
    { id: 'account', label: t('tabAccount'), icon: User },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const headerBg = isDark ? 'rgba(13,10,4,0.88)' : eyeComfort ? 'rgba(247,225,160,0.88)' : 'rgba(255,243,196,0.88)';
  const headerBorder = isDark ? '#3A2E14' : eyeComfort ? 'rgba(180,83,9,0.25)' : 'rgba(234,179,8,0.35)';
  const navBg = isDark ? 'rgba(22,17,10,0.92)' : eyeComfort ? 'rgba(250,235,196,0.92)' : 'rgba(255,251,235,0.92)';

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-30 backdrop-blur-md" style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}>
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SunflowerLogo size={32} />
            <div>
              <p className="text-sm font-bold text-pri leading-tight">Miss Sunflower</p>
              <span className="text-[10px] text-sec">{t('dealerIdCard')}</span>
            </div>
          </div>
          <LangToggle />
        </div>
      </header>

      {showPWA && (
        <div className="max-w-md mx-auto px-4 pt-3">
          <div className="surface-alt px-3 py-2.5 flex items-center gap-2 animate-slide-up">
            <Smartphone size={16} className="text-accent shrink-0" />
            <span className="text-xs text-pri flex-1 font-medium">{t('installApp')}</span>
            <button onClick={() => setShowPWA(false)} className="text-sec text-lg leading-none px-1">×</button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 pt-3">
        {tab === 'feed' && <FeedTab />}
        {tab === 'stock' && <StockTab />}
        {tab === 'myid' && <MyIdTab />}
        {tab === 'account' && <AccountTab onLogout={onLogout} onGoPublic={onGoPublic} onSettings={() => setTab('settings')} />}
        {tab === 'settings' && <SettingsTab onLogout={onLogout} />}
      </div>

      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30 backdrop-blur-xl"
        style={{ background: navBg, borderTop: `1px solid ${headerBorder}` }}
      >
        <div className="flex items-center justify-around px-1 py-2">
          {tabs.map((tabItem) => {
            const Icon = tabItem.icon;
            const active = tab === tabItem.id;
            return (
              <button
                key={tabItem.id}
                onClick={() => setTab(tabItem.id)}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all"
              >
                <div className="relative">
                  <Icon size={20} className={active ? 'text-accent' : 'text-sec'} />
                  {tabItem.dot && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}
                </div>
                <span className={`text-[9px] font-medium ${active ? 'text-accent' : 'text-sec'}`}>{tabItem.label}</span>
                {active && <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-accent" />}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function FeedTab() {
  const { t, lang, showToast } = useApp();
  return (
    <div className="space-y-3">
      {broadcasts.map((b) => (
        <div key={b.id} className="surface p-4 space-y-3 animate-slide-up">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: 'linear-gradient(135deg, var(--accent-bright), var(--accent-deep))', color: 'var(--accent-text)' }}>
              CEO
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-pri">Miss Sunflower CEO</p>
              <p className="text-[10px] text-sec">{b.timestamp}</p>
            </div>
            <TierBadge tier={b.tier === 'all' ? 'retail' : b.tier} />
          </div>
          {b.hasImage && (
            <div className="rounded-xl h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${b.imageColor}, ${b.imageColor}88)` }}>
              <SunflowerLogo size={48} />
            </div>
          )}
          <div className="space-y-1">
            <h3 className="font-bold text-pri text-sm">{b.title}</h3>
            <p className="text-xs text-sec leading-relaxed">{b.message}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => showToast(t('toastCopied'))} className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5">
              <Copy size={13} /> {t('copyText')}
            </button>
            <button onClick={() => showToast(t('toastSaved'))} className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5">
              <Download size={13} /> {t('saveImage')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function StockTab() {
  const { t, lang, showToast } = useApp();
  const [search, setSearch] = useState('');
  const filtered = products.filter((p) => p.name[lang].toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sec" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t('searchProducts')} className="input-field pl-10" />
      </div>

      {filtered.map((p) => (
        <div key={p.id} className="surface p-4 space-y-3 animate-slide-up">
          <div className="flex gap-3">
            <div className="w-20 h-20 rounded-xl shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.colorA}, ${p.colorB})` }}>
              <Package size={28} className="text-white/70" />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-bold text-pri text-sm leading-tight">{p.name[lang]}</h3>
              <p className="text-xs text-sec">{p.category[lang]}</p>
              <StockBadge status={p.stock} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="surface-alt px-3 py-2">
              <p className="text-[10px] text-sec">{t('retailPrice')}</p>
              <p className="text-sm font-bold text-pri">${p.retailPrice}</p>
            </div>
            <div className="surface-alt px-3 py-2">
              <p className="text-[10px] text-sec">{t('wholesalePrice')}</p>
              <p className="text-sm font-bold text-accent">${p.wholesalePrices[currentDealer.tier]}</p>
            </div>
          </div>

          {p.stock === 'in' && (
            <button onClick={() => showToast(t('toastOrderSent'))} className="btn-gold w-full text-xs flex items-center justify-center gap-2">
              <Send size={14} /> {t('orderTelegram')}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function MyIdTab() {
  const { t, lang, showToast } = useApp();
  const d = currentDealer;
  return (
    <div className="space-y-3">
      <div className="surface overflow-hidden animate-slide-up relative">
        <div className="absolute inset-0 watermark-diagonal pointer-events-none" />
        <div className="absolute top-4 right-4 opacity-5">
          <SunflowerLogo size={120} />
        </div>

        <div className="relative p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SunflowerLogo size={28} />
              <span className="text-xs font-bold text-pri">Miss Sunflower Brand</span>
            </div>
            <TierBadge tier={d.tier} />
          </div>

          <div className="flex gap-4">
            <Portrait color={d.portraitColor} name={d.name} size={90} watermark rounded="rounded-2xl" />
            <div className="flex-1 space-y-1.5">
              <h3 className="font-bold text-pri text-base leading-tight">{d.name}</h3>
              <p className="text-xs font-mono text-sec">{t('code')}: <span className="font-bold text-pri">{d.code}</span></p>
              <div className="flex items-center gap-1.5 text-xs text-sec">
                <MapPin size={12} /> {d.location[lang]}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-sec">
                <Phone size={12} /> {d.phone}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-2">
            <QRPlaceholder size={120} seed={d.code} />
            <p className="text-[10px] text-sec font-mono">{d.code}</p>
          </div>

          {/* Official social — full handle, no truncation */}
          <div className="space-y-2">
            <div className="social-pill bg-blue-50 border-blue-200">
              <Facebook size={14} className="text-blue-600 shrink-0" />
              <span className="text-xs font-semibold text-blue-800 break-all leading-tight">{d.fb}</span>
            </div>
            <div className="social-pill" style={{ background: 'var(--bg-card-alt)', borderColor: 'var(--border-base)' }}>
              <Music2 size={14} className="text-pri shrink-0" />
              <span className="text-xs font-semibold text-pri break-all leading-tight">{d.tiktok}</span>
            </div>
          </div>

          <button onClick={() => showToast(t('toastSaved'))} className="btn-gold w-full text-sm flex items-center justify-center gap-2">
            <Download size={15} /> {t('saveCard')}
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountTab({ onLogout, onGoPublic, onSettings }: { onLogout: () => void; onGoPublic: () => void; onSettings: () => void }) {
  const { t, lang } = useApp();
  const d = currentDealer;

  return (
    <div className="space-y-3">
      <div className="surface p-4 flex items-center gap-3 animate-slide-up">
        <Portrait color={d.portraitColor} name={d.name} size={56} rounded="rounded-xl" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-pri text-sm">{d.name}</h3>
          <p className="text-xs text-sec font-mono">{d.code} · {tierLabels[d.tier][lang]}</p>
        </div>
        <TierBadge tier={d.tier} />
      </div>

      <div className="surface overflow-hidden animate-slide-up">
        <button onClick={onSettings} className="w-full flex items-center justify-between px-4 py-3.5 border-b surface-hover" style={{ borderColor: 'var(--border-base)' }}>
          <div className="flex items-center gap-3">
            <Settings size={18} className="text-accent" />
            <span className="text-sm text-pri font-medium">{t('settings')}</span>
          </div>
          <ChevronRight size={16} className="text-sec" />
        </button>

        <button onClick={onGoPublic} className="w-full flex items-center justify-between px-4 py-3.5 border-b surface-hover" style={{ borderColor: 'var(--border-base)' }}>
          <div className="flex items-center gap-3">
            <Search size={18} className="text-accent" />
            <span className="text-sm text-pri font-medium">{t('goPublic')}</span>
          </div>
          <ChevronRight size={16} className="text-sec" />
        </button>

        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3.5">
          <LogOut size={18} className="text-red-500" />
          <span className="text-sm text-red-600 font-medium">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}

function SettingsTab({ onLogout }: { onLogout: () => void }) {
  const { t } = useApp();
  const [pinOpen, setPinOpen] = useState(false);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-display font-bold text-pri px-1">{t('settings')}</h2>
      <SettingsSection onChangePin={() => setPinOpen(true)} />
      <button onClick={onLogout} className="btn-ghost w-full text-sm flex items-center justify-center gap-2 text-red-600" style={{ borderColor: 'rgba(198,40,40,0.3)' }}>
        <LogOut size={16} /> {t('logout')}
      </button>
      <ChangePinModal open={pinOpen} onClose={() => setPinOpen(false)} />
    </div>
  );
}

function ChangePinModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, showToast } = useApp();
  const submit = () => { showToast(t('toastPinChanged')); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={t('changePin')} icon={<KeyRound size={18} />}>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('currentPin')}</label>
          <input type="password" inputMode="numeric" maxLength={6} placeholder="••••••" className="input-field tracking-[0.5em] text-center" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('newPin')}</label>
          <input type="password" inputMode="numeric" maxLength={6} placeholder="••••••" className="input-field tracking-[0.5em] text-center" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('confirmPin')}</label>
          <input type="password" inputMode="numeric" maxLength={6} placeholder="••••••" className="input-field tracking-[0.5em] text-center" />
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="btn-ghost flex-1">{t('cancel')}</button>
          <button onClick={submit} className="btn-gold flex-1">{t('submit')}</button>
        </div>
      </div>
    </Modal>
  );
}
