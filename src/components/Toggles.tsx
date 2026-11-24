import { useApp, type ThemeMode } from '@/context/AppContext';
import { Sun, Moon, Eye, Monitor, Languages } from 'lucide-react';
import type { DictKey } from '@/data/i18n';

export function LangToggle() {
  const { lang, toggleLang } = useApp();
  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 active:scale-95"
      style={{ borderColor: 'var(--border-base)', color: 'var(--text-primary)' }}
    >
      <Languages size={13} className="text-accent" />
      <span className={lang === 'km' ? 'text-accent' : 'text-sec'}>KH</span>
      <span className="text-sec opacity-40">|</span>
      <span className={lang === 'en' ? 'text-accent' : 'text-sec'}>EN</span>
    </button>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, isDark, eyeComfort } = useApp();
  // Show icon based on effective state
  const icon = isDark
    ? <Moon size={16} className="text-accent" />
    : eyeComfort
    ? <Eye size={16} className="text-accent" />
    : <Sun size={16} className="text-accent-deep" />;
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border transition-all duration-200 active:scale-90"
      style={{ borderColor: 'var(--border-base)', color: 'var(--text-primary)' }}
      aria-label="Toggle display mode"
    >
      {icon}
    </button>
  );
}

export function DisplayModeSelector() {
  const { theme, setTheme, t } = useApp();
  const modes: { id: ThemeMode; label: DictKey; icon: typeof Sun }[] = [
    { id: 'system', label: 'systemMode', icon: Monitor },
    { id: 'day', label: 'lightMode', icon: Sun },
    { id: 'night', label: 'nightMode', icon: Moon },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {modes.map((m) => {
        const Icon = m.icon;
        const active = theme === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setTheme(m.id)}
            className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-200"
            style={{
              borderColor: active ? 'var(--accent)' : 'var(--border-base)',
              background: active ? 'var(--bg-card-accent)' : 'transparent',
            }}
          >
            <Icon size={20} className={active ? 'text-accent' : 'text-sec'} />
            <span className={`text-[10px] font-bold ${active ? 'text-accent' : 'text-sec'}`}>{t(m.label)}</span>
          </button>
        );
      })}
    </div>
  );
}

export function EyeComfortToggle() {
  const { eyeComfort, toggleEyeComfort, t } = useApp();
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200"
      style={{ borderColor: 'var(--border-base)', background: eyeComfort ? 'var(--bg-card-accent)' : 'transparent' }}>
      <div className="flex items-center gap-3">
        <Eye size={18} className={eyeComfort ? 'text-accent' : 'text-sec'} />
        <div>
          <p className={`text-sm font-medium ${eyeComfort ? 'text-pri' : 'text-pri'}`}>{t('eyeComfort')}</p>
          <p className="text-[10px] text-sec">{t('eyeComfortDesc')}</p>
        </div>
      </div>
      <button
        onClick={toggleEyeComfort}
        className="relative shrink-0 transition-all duration-200"
        style={{
          width: 44, height: 24, borderRadius: 12,
          background: eyeComfort ? 'var(--accent)' : 'var(--border-base)',
        }}
        role="switch"
        aria-checked={eyeComfort}
        aria-label="Eye comfort"
      >
        <div
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
          style={{ left: eyeComfort ? 20 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}
        />
      </button>
    </div>
  );
}
