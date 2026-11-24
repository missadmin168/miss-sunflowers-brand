import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({ open, onClose, title, subtitle, icon, children, maxWidth = 'max-w-sm' }: Props) {
  const { isDark } = useApp();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(24,21,16,0.4)' }}
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidth} mx-auto animate-slide-up rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto`}
        style={{
          background: 'var(--bg-card)',
          border: `1px solid var(--border-base)`,
          boxShadow: isDark ? '0 -8px 40px rgba(0,0,0,0.5)' : '0 -8px 40px rgba(245,183,0,0.15)',
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border-base)', background: 'var(--bg-card)' }}>
          <div className="flex items-center gap-3 min-w-0">
            {icon && <div className="shrink-0 text-sunflower-400">{icon}</div>}
            <div className="min-w-0">
              {title && <h2 className="text-sm font-bold text-pri truncate">{title}</h2>}
              {subtitle && <p className="text-xs text-sec truncate">{subtitle}</p>}
            </div>
          </div>
          <button onClick={onClose} className="shrink-0 p-2 rounded-lg btn-ghost" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
