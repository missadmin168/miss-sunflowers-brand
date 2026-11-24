import { useApp } from '@/context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, isDark } = useApp();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-full max-w-md px-4">
      {toasts.map((tst) => (
        <div
          key={tst.id}
          className="animate-slide-up flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg w-full max-w-xs pointer-events-auto"
          style={{
            background: 'var(--bg-card-alt)',
            border: `1px solid var(--border-base)`,
            color: 'var(--text-primary)',
          }}
        >
          <CheckCircle2 size={18} className="text-sunflower-400 shrink-0" />
          <span className="text-sm font-medium">{tst.message}</span>
        </div>
      ))}
    </div>
  );
}
