import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import Portrait from '@/components/Portrait';
import SunflowerLogo from '@/components/SunflowerLogo';
import { LangToggle } from '@/components/Toggles';
import { TierBadge, StockBadge, StatusBadge } from '@/components/Badges';
import { SettingsSection } from '@/components/SettingsSection';
import { dealers as initialDealers, products as initialProducts, broadcasts, fakeReports, ceoProfile, tierLabels } from '@/data/mockData';
import type { Dealer, DealerTier, StockStatus } from '@/data/mockData';
import { Megaphone, Users, Package, Flag, Plus, Send, Search, MapPin, Phone, Facebook, Music2, KeyRound, Eye, EyeOff, Image, Check, Filter, Settings, LogOut, Save } from 'lucide-react';

type Tab = 'broadcast' | 'dealers' | 'products' | 'reports' | 'settings';

interface Props {
  onLogout: () => void;
}

export default function CEOAdmin({ onLogout }: Props) {
  const { t, isDark, eyeComfort } = useApp();
  const [tab, setTab] = useState<Tab>('broadcast');

  const tabs: { id: Tab; label: string; icon: typeof Megaphone }[] = [
    { id: 'broadcast', label: t('tabBroadcast'), icon: Megaphone },
    { id: 'dealers', label: t('tabDealers'), icon: Users },
    { id: 'products', label: t('tabProducts'), icon: Package },
    { id: 'reports', label: t('tabReports'), icon: Flag },
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
              <p className="text-sm font-bold text-pri leading-tight">CEO Panel</p>
              <span className="text-[10px] text-sec">{ceoProfile.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LangToggle />
            <button onClick={onLogout} className="btn-ghost text-xs px-3 py-1.5">{t('logout')}</button>
          </div>
        </div>
      </header>

      {tab !== 'settings' && (
        <div className="max-w-md mx-auto px-4 pt-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: t('kpiDealers'), value: '5', color: '#2E7D32' },
              { label: t('kpiProducts'), value: '6', color: 'var(--accent)' },
              { label: t('kpiReports'), value: '5', color: '#C62828' },
              { label: t('kpiBroadcasts'), value: '3', color: 'var(--accent-deep)' },
            ].map((kpi) => (
              <div key={kpi.label} className="surface-alt p-2 text-center">
                <p className="text-lg font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                <p className="text-[9px] text-sec leading-tight">{kpi.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 pt-3">
        {tab === 'broadcast' && <BroadcastTab />}
        {tab === 'dealers' && <DealersTab />}
        {tab === 'products' && <ProductsTab />}
        {tab === 'reports' && <ReportsTab />}
        {tab === 'settings' && <SettingsTab onLogout={onLogout} />}
      </div>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-30 backdrop-blur-xl" style={{ background: navBg, borderTop: `1px solid ${headerBorder}` }}>
        <div className="flex items-center justify-around px-1 py-2">
          {tabs.map((tabItem) => {
            const Icon = tabItem.icon;
            const active = tab === tabItem.id;
            return (
              <button key={tabItem.id} onClick={() => setTab(tabItem.id)} className="relative flex flex-col items-center gap-0.5 px-3 py-1.5">
                <Icon size={20} className={active ? 'text-accent' : 'text-sec'} />
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

function BroadcastTab() {
  const { t, lang, showToast } = useApp();
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [tiers, setTiers] = useState<Set<string>>(new Set(['all']));

  const tierOptions = [
    { id: 'all', label: t('tierAll') },
    { id: 'vip', label: t('tierVIP') },
    { id: 'province', label: t('tierProvince') },
    { id: 'retail', label: t('tierRetail') },
  ];

  const toggleTier = (id: string) => {
    setTiers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const publish = () => { showToast(t('toastPublished')); setTitle(''); setMsg(''); };

  return (
    <div className="space-y-3">
      <div className="surface p-4 space-y-3 animate-slide-up">
        <h3 className="text-sm font-bold text-pri flex items-center gap-2"><Megaphone size={16} className="text-accent" /> {t('tabBroadcast')}</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('broadcastTitle')} className="input-field" />
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t('broadcastMsg')} rows={3} className="input-field resize-none" />
        <button className="btn-ghost w-full text-xs flex items-center justify-center gap-2">
          <Image size={14} /> {t('saveImage')}
        </button>
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-sec">{t('targetTier')}</p>
          <div className="flex flex-wrap gap-2">
            {tierOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleTier(opt.id)}
                className={`pill border text-xs font-medium ${tiers.has(opt.id) ? '' : 'text-sec'}`}
                style={tiers.has(opt.id) ? { background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-base)' }}
              >
                {tiers.has(opt.id) && <Check size={12} />} {opt.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={publish} className="btn-gold w-full text-sm flex items-center justify-center gap-2">
          <Send size={15} /> {t('publish')}
        </button>
      </div>

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-sec uppercase tracking-wide px-1">{t('recentBroadcasts')}</h4>
        {broadcasts.map((b) => (
          <div key={b.id} className="surface-alt p-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-pri">{b.title}</h3>
              <span className="text-[10px] text-sec">{b.timestamp}</span>
            </div>
            <p className="text-xs text-sec leading-relaxed line-clamp-2">{b.message}</p>
            <div className="flex items-center gap-2">
              {b.tier === 'all' && <span className="pill text-[10px]" style={{ background: 'var(--bg-card-accent)', color: 'var(--accent-deep)' }}>{t('tierAll')}</span>}
              {b.tier !== 'all' && <TierBadge tier={b.tier} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DealersTab() {
  const { t, lang, showToast } = useApp();
  const [dealers, setDealers] = useState(initialDealers);
  const [filter, setFilter] = useState<'all' | DealerTier>('all');
  const [showAdd, setShowAdd] = useState(false);
  const [resetTarget, setResetTarget] = useState<string | null>(null);

  const filtered = filter === 'all' ? dealers : dealers.filter((d) => d.tier === filter);

  const toggleStatus = (id: string) => {
    setDealers((prev) => prev.map((d) => d.id === id ? { ...d, status: d.status === 'active' ? 'suspended' : 'active' } : d));
  };

  return (
    <div className="space-y-3">
      <button onClick={() => setShowAdd(true)} className="btn-gold w-full text-sm flex items-center justify-center gap-2">
        <Plus size={16} /> {t('addDealer')}
      </button>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter size={14} className="text-sec shrink-0" />
        {(['all', 'vip', 'province', 'retail'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="pill border text-xs font-medium shrink-0"
            style={filter === f ? { background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-base)', color: 'var(--text-secondary)' }}
          >
            {f === 'all' ? t('tierAll') : tierLabels[f][lang]}
          </button>
        ))}
      </div>

      {filtered.map((d) => (
        <div key={d.id} className="surface p-3 space-y-2.5 animate-slide-up">
          <div className="flex items-start gap-3">
            <Portrait color={d.portraitColor} name={d.name} size={48} watermark={d.status === 'active'} rounded="rounded-lg" />
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="text-sm font-bold text-pri leading-tight">{d.name}</h3>
              <p className="text-[10px] font-mono text-sec">{d.code} · {d.phone}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-sec">
                <MapPin size={10} /> {d.location[lang]}
              </div>
            </div>
            <TierBadge tier={d.tier} />
          </div>

          {/* Social handles — full text, no truncation */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-blue-50 border border-blue-200">
              <Facebook size={10} className="text-blue-600 shrink-0" />
              <span className="text-[10px] font-semibold text-blue-800 break-all leading-tight">{d.fb}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border" style={{ background: 'var(--bg-card-alt)', borderColor: 'var(--border-base)' }}>
              <Music2 size={10} className="text-pri shrink-0" />
              <span className="text-[10px] font-semibold text-pri break-all leading-tight">{d.tiktok}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button onClick={() => toggleStatus(d.id)} className="flex items-center gap-1.5">
              <div className={`w-9 h-5 rounded-full transition-colors relative ${d.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${d.status === 'active' ? 'left-4' : 'left-0.5'}`} />
              </div>
              <span className={`text-[10px] font-medium ${d.status === 'active' ? 'text-green-700' : 'text-red-700'}`}>
                {d.status === 'active' ? t('active') : t('suspended')}
              </span>
            </button>
            <button onClick={() => setResetTarget(d.id)} className="btn-ghost text-[10px] px-2.5 py-1 ml-auto flex items-center gap-1">
              <KeyRound size={11} /> {t('resetPin')}
            </button>
          </div>
        </div>
      ))}

      <AddDealerModal open={showAdd} onClose={() => setShowAdd(false)} onAdd={(d) => { setDealers((prev) => [...prev, d]); showToast(t('toastDealerAdded')); }} />
      <ResetPinModal open={!!resetTarget} onClose={() => setResetTarget(null)} dealer={dealers.find((d) => d.id === resetTarget)} />
    </div>
  );
}

function AddDealerModal({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (d: Dealer) => void }) {
  const { t, lang } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [tier, setTier] = useState<DealerTier>('retail');
  const [fb, setFb] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [showKYC, setShowKYC] = useState(false);

  const submit = () => {
    onAdd({
      id: `d${Date.now()}`, name: name || 'New Dealer', code: `MSF-${Math.floor(Math.random() * 900 + 100)}`,
      phone: phone || '000000', tier, status: 'active',
      location: { km: location || 'ភ្នំពេញ', en: location || 'Phnom Penh' },
      fb: fb || 'MissSunflower.New', tiktok: tiktok || '@msf.new',
      portraitColor: '#F5B700', joinDate: new Date().toISOString().split('T')[0],
    });
    setName(''); setPhone(''); setLocation(''); setFb(''); setTiktok('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={t('addDealer')} icon={<Plus size={18} />} maxWidth="max-w-sm">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('dealerName')}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('dealerPhone')}</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="input-field" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('location')}</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="input-field" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('dealerTier')}</label>
          <div className="grid grid-cols-3 gap-2">
            {(['vip', 'province', 'retail'] as const).map((t2) => (
              <button key={t2} onClick={() => setTier(t2)} className="pill border justify-center py-2 text-xs"
                style={tier === t2 ? { background: 'var(--accent)', color: 'var(--accent-text)', borderColor: 'var(--accent)' } : { borderColor: 'var(--border-base)', color: 'var(--text-secondary)' }}>
                {tierLabels[t2][lang]}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('officialFB')}</label>
          <input value={fb} onChange={(e) => setFb(e.target.value)} placeholder="PageName" className="input-field" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('officialTikTok')}</label>
          <input value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="@handle" className="input-field" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('portraitPhoto')}</label>
          <button className="btn-ghost w-full text-xs flex items-center justify-center gap-2">
            <Image size={14} /> {t('saveImage')}
          </button>
        </div>
        <button onClick={() => setShowKYC(!showKYC)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50">
          <span className="text-xs font-semibold text-amber-800 flex items-center gap-2">
            {showKYC ? <EyeOff size={14} /> : <Eye size={14} />} {t('kycPrivate')}
          </span>
          <span className="text-[10px] text-amber-600">CEO Only</span>
        </button>
        {showKYC && (
          <div className="surface-alt p-3 space-y-1 text-xs text-sec animate-slide-up">
            <p>ID Card: 1102xxxx1234</p>
            <p>Verified: 2023-01-15</p>
            <p>Address: Phnom Penh</p>
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-ghost flex-1">{t('cancel')}</button>
          <button onClick={submit} className="btn-gold flex-1">{t('submit')}</button>
        </div>
      </div>
    </Modal>
  );
}

function ResetPinModal({ open, onClose, dealer }: { open: boolean; onClose: () => void; dealer?: Dealer }) {
  const { t, showToast } = useApp();
  const submit = () => { showToast(t('toastPinReset')); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={t('resetPin')} subtitle={dealer?.name} icon={<KeyRound size={18} />}>
      <div className="space-y-4">
        <p className="text-sm text-sec text-center">{dealer?.name} ({dealer?.code})</p>
        <input type="password" inputMode="numeric" maxLength={6} placeholder="New PIN" className="input-field tracking-[0.5em] text-center" />
        <div className="flex gap-2">
          <button onClick={onClose} className="btn-ghost flex-1">{t('cancel')}</button>
          <button onClick={submit} className="btn-gold flex-1">{t('submit')}</button>
        </div>
      </div>
    </Modal>
  );
}

function ProductsTab() {
  const { t, lang, showToast } = useApp();
  const [segment, setSegment] = useState<'products' | 'tiers'>('products');
  const [products, setProducts] = useState(initialProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [tiers, setTiers] = useState([
    { id: 'vip', km: 'VIP បោះដុំធំ', en: 'VIP Wholesale' },
    { id: 'province', km: 'តំណាងខេត្ត', en: 'Provincial Dealer' },
    { id: 'retail', km: 'តំណាងចែកចាយ', en: 'Retail Dealer' },
  ]);

  const cycleStock = (id: string) => {
    const order: StockStatus[] = ['in', 'low', 'out', 'incoming'];
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, stock: order[(order.indexOf(p.stock) + 1) % order.length] } : p));
    showToast(t('toastStockUpdated'));
  };

  const saveTiers = () => { showToast(t('toastTierSaved')); };

  const addTier = () => {
    const newId = `tier-${Date.now()}`;
    setTiers((prev) => [...prev, { id: newId, km: 'កម្រិតថ្មី', en: 'New Tier' }]);
  };

  return (
    <div className="space-y-3">
      <div className="flex p-1 rounded-xl border" style={{ borderColor: 'var(--border-base)', background: 'var(--bg-card-alt)' }}>
        {(['products', 'tiers'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSegment(s)}
            className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
            style={segment === s ? { background: 'var(--accent)', color: 'var(--accent-text)' } : { color: 'var(--text-secondary)' }}
          >
            {s === 'products' ? t('segmentsProducts') : t('segmentsTiers')}
          </button>
        ))}
      </div>

      {segment === 'products' && (
        <>
          {products.map((p) => (
            <div key={p.id} className="surface p-3 space-y-2.5 animate-slide-up">
              <div className="flex gap-3 items-center">
                <div className="w-14 h-14 rounded-lg shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.colorA}, ${p.colorB})` }}>
                  <Package size={22} className="text-white/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-pri leading-tight">{p.name[lang]}</h3>
                  <p className="text-[10px] text-sec">{p.category[lang]}</p>
                </div>
                <button onClick={() => cycleStock(p.id)} className="shrink-0">
                  <StockBadge status={p.stock} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(['vip', 'province', 'retail'] as const).map((t2) => (
                  <div key={t2} className="surface-alt px-2 py-1.5 text-center">
                    <p className="text-[9px] text-sec leading-tight">{tierLabels[t2][lang]}</p>
                    <p className="text-xs font-bold text-pri">${p.wholesalePrices[t2]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={() => setShowAdd(true)} className="btn-gold w-full text-sm flex items-center justify-center gap-2">
            <Plus size={16} /> {t('addProduct')}
          </button>
          <AddProductModal open={showAdd} onClose={() => setShowAdd(false)} onAdd={() => showToast(t('toastProductAdded'))} />
        </>
      )}

      {segment === 'tiers' && (
        <div className="space-y-2">
          {tiers.map((tier, i) => (
            <div key={tier.id} className="surface p-3 flex items-center gap-3">
              <div className="shrink-0">
                <TierBadge tier={tier.id as DealerTier} size="md" />
              </div>
              <input
                defaultValue={lang === 'km' ? tier.km : tier.en}
                className="input-field flex-1 text-sm"
                onChange={(e) => {
                  const val = e.target.value;
                  setTiers((prev) => prev.map((t2, j) => j === i ? { ...t2, [lang]: val } : t2));
                }}
              />
            </div>
          ))}
          <button onClick={addTier} className="btn-ghost w-full text-sm flex items-center justify-center gap-2">
            <Plus size={16} /> {t('addTier')}
          </button>
          <button onClick={saveTiers} className="btn-gold w-full text-sm flex items-center justify-center gap-2">
            <Save size={15} /> {t('submit')}
          </button>
        </div>
      )}
    </div>
  );
}

function AddProductModal({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: () => void }) {
  const { t, lang } = useApp();
  const submit = () => { onAdd(); onClose(); };
  return (
    <Modal open={open} onClose={onClose} title={t('addProduct')} icon={<Plus size={18} />} maxWidth="max-w-sm">
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('dealerName')}</label>
          <input className="input-field" placeholder={lang === 'km' ? 'ឈ្មោះផលិតផល' : 'Product name'} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-sec">{t('retailPrice')}</label>
            <input type="number" className="input-field" placeholder="$0" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-sec">{t('wholesalePrice')}</label>
            <input type="number" className="input-field" placeholder="$0" />
          </div>
        </div>
        <button className="btn-ghost w-full text-xs flex items-center justify-center gap-2">
          <Image size={14} /> {t('portraitPhoto')}
        </button>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="btn-ghost flex-1">{t('cancel')}</button>
          <button onClick={submit} className="btn-gold flex-1">{t('submit')}</button>
        </div>
      </div>
    </Modal>
  );
}

function ReportsTab() {
  const { t } = useApp();
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Flag size={16} className="text-red-500" />
        <h3 className="text-sm font-bold text-pri">{t('tabReports')}</h3>
      </div>
      {fakeReports.map((r) => (
        <div key={r.id} className="surface p-3 space-y-2 animate-slide-up">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-pri break-all">{r.link}</p>
              <p className="text-[10px] text-sec mt-1">{r.reporter} · {r.timestamp}</p>
            </div>
            <StatusBadge status={r.status} />
          </div>
          <div className="flex gap-2">
            {r.status !== 'resolved' && (
              <button className="btn-ghost text-[10px] px-2.5 py-1 flex-1">→ {t('reportReviewing')}</button>
            )}
            <a href={`https://${r.link}`} target="_blank" rel="noreferrer" className="btn-ghost text-[10px] px-2.5 py-1 flex-1 flex items-center justify-center gap-1">
              <Search size={11} /> {t('reportedLink')}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function SettingsTab({ onLogout }: { onLogout: () => void }) {
  const { t } = useApp();
  const [pinOpen, setPinOpen] = useState(false);
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-display font-bold text-pri px-1">{t('settings')}</h2>
      <SettingsSection onChangePin={() => setPinOpen(false)} />
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
        <div className="flex gap-2">
          <button onClick={onClose} className="btn-ghost flex-1">{t('cancel')}</button>
          <button onClick={submit} className="btn-gold flex-1">{t('submit')}</button>
        </div>
      </div>
    </Modal>
  );
}
