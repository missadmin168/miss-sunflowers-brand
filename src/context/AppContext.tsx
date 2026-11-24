import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Lang } from '@/data/i18n';
import { t as translate, type DictKey } from '@/data/i18n';

export type ThemeMode = 'system' | 'day' | 'night';
export type AppRole = 'public' | 'dealer' | 'ceo';

export interface Toast {
  id: number;
  message: string;
}

interface AppContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  eyeComfort: boolean;
  setEyeComfort: (v: boolean) => void;
  toggleEyeComfort: () => void;
  /** Resolved effective dark state (system resolved) */
  isDark: boolean;
  role: AppRole;
  setRole: (r: AppRole) => void;
  t: (key: DictKey) => string;
  toasts: Toast[];
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function getSystemDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('km');
  const [theme, setTheme] = useState<ThemeMode>('day');
  const [eyeComfort, setEyeComfort] = useState(false);
  const [systemDark, setSystemDark] = useState(getSystemDark);
  const [role, setRole] = useState<AppRole>('public');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isDark = theme === 'night' || (theme === 'system' && systemDark);

  // Apply CSS classes
  useEffect(() => {
    const el = document.documentElement;
    el.classList.remove('dark', 'eye-comfort');
    if (isDark) el.classList.add('dark');
    if (eyeComfort) el.classList.add('eye-comfort');
    el.lang = lang;
  }, [isDark, eyeComfort, lang]);

  const toggleLang = useCallback(() => setLang((p) => (p === 'km' ? 'en' : 'km')), []);
  const toggleTheme = useCallback(() => setTheme((p) => p === 'day' ? 'night' : p === 'night' ? 'system' : 'day'), []);
  const toggleEyeComfort = useCallback(() => setEyeComfort((p) => !p), []);

  const showToast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, message: msg }]);
    setTimeout(() => {
      setToasts((p) => p.filter((tst) => tst.id !== id));
    }, 2500);
  }, []);

  const t = useCallback((key: DictKey) => translate(lang, key), [lang]);

  return (
    <AppContext.Provider value={{
      lang, setLang, toggleLang,
      theme, setTheme, toggleTheme,
      eyeComfort, setEyeComfort, toggleEyeComfort,
      isDark,
      role, setRole, t, toasts, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
