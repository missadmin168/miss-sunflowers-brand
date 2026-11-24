import { useApp } from '@/context/AppContext';
import type { DictKey } from '@/data/i18n';
import type { DealerTier, StockStatus } from '@/data/mockData';

export function TierBadge({ tier, size = 'sm' }: { tier: DealerTier; size?: 'sm' | 'md' }) {
  const { lang } = useApp();
  const labels: Record<DealerTier, { km: string; en: string }> = {
    vip: { km: 'VIP បោះដុំធំ', en: 'VIP Wholesale' },
    province: { km: 'តំណាងខេត្ត', en: 'Provincial' },
    retail: { km: 'តំណាងចែកចាយ', en: 'Retail' },
  };
  const colors: Record<DealerTier, string> = {
    vip: 'bg-gradient-to-r from-sunflower-400 to-sunflower-600 text-night-700',
    province: 'bg-sunflower-100 text-sunflower-700 border border-sunflower-300',
    retail: 'bg-night-200/20 text-sec border border-[var(--border-base)]',
  };
  const pad = size === 'md' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`pill font-bold ${pad} ${colors[tier]}`}>
      {labels[tier][lang]}
    </span>
  );
}

export function StockBadge({ status }: { status: StockStatus }) {
  const { t } = useApp();
  const config: Record<StockStatus, { label: DictKey; color: string }> = {
    in: { label: 'inStock', color: 'bg-green-100 text-green-800 border-green-300' },
    low: { label: 'lowStock', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    out: { label: 'outStock', color: 'bg-red-100 text-red-800 border-red-300' },
    incoming: { label: 'incoming', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  };
  const { label, color } = config[status];
  return <span className={`pill border font-semibold ${color}`}>{t(label)}</span>;
}

export function StatusBadge({ status }: { status: 'new' | 'reviewing' | 'resolved' }) {
  const { t } = useApp();
  const config = {
    new: { label: 'reportNew' as const, color: 'bg-red-100 text-red-700 border-red-300' },
    reviewing: { label: 'reportReviewing' as const, color: 'bg-amber-100 text-amber-700 border-amber-300' },
    resolved: { label: 'reportResolved' as const, color: 'bg-green-100 text-green-700 border-green-300' },
  };
  const { label, color } = config[status];
  return <span className={`pill border font-semibold ${color}`}>{t(label)}</span>;
}

export function VerifiedBanner({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 border border-green-300">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <circle cx="12" cy="12" r="11" fill="#2E7D32" />
        <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-sm font-bold text-green-800">{text}</span>
    </div>
  );
}

export function DangerBanner({ title, msg }: { title: string; msg?: string }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-300">
      <div className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M12 2L1 22h22L12 2z" fill="#C62828" />
          <path d="M12 9v5M12 18v.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-bold text-red-800">{title}</span>
      </div>
      {msg && <p className="text-xs text-red-700 mt-1.5 leading-relaxed">{msg}</p>}
    </div>
  );
}

export function LiveClock() {
  const { t } = useApp();
  const now = new Date().toLocaleTimeString('en-GB');
  return (
    <span className="text-xs text-sec font-mono">
      {t('liveCheck')}: <span className="text-pri font-bold animate-ticker">{now}</span>
    </span>
  );
}
