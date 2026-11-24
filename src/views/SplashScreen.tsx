import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import SunflowerLogo from '@/components/SunflowerLogo';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const { t, isDark, eyeComfort } = useApp();
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1000);
    const doneTimer = setTimeout(onDone, 1500);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center cursor-pointer ${fading ? 'animate-fade-out' : 'animate-fade-in'}`}
      style={{
        background: isDark
          ? 'radial-gradient(ellipse at center, #1E1810 0%, #0D0A04 100%)'
          : eyeComfort
          ? 'radial-gradient(ellipse at center, #F3D58D 0%, #F7E1A0 100%)'
          : 'radial-gradient(ellipse at center, #FDE68A 0%, #FFF3C4 100%)',
      }}
      onClick={onDone}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(245,183,0,0.12) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-6 animate-scale-in">
        <div className="animate-pulse-glow rounded-3xl">
          <SunflowerLogo size={100} showBadge animated />
        </div>

        <div className="text-center space-y-2">
          <h1 className="font-display text-2xl font-bold text-pri tracking-wide">
            Miss Sunflower Brand
          </h1>
          <div
            className="h-px w-32 mx-auto"
            style={{ background: `linear-gradient(90deg, transparent, ${isDark ? '#FACC15' : eyeComfort ? '#B45309' : '#F5B700'}, transparent)` }}
          />
          <p className="text-sm text-sec leading-relaxed max-w-xs px-4">
            {t('tagline')}
          </p>
          <p className="text-xs text-sec/70 italic">
            {t('taglineEn')}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)', animationDelay: '0.2s' }} />
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)', animationDelay: '0.4s' }} />
        </div>
      </div>

      <button
        className="absolute bottom-8 text-xs text-sec underline opacity-60"
        onClick={(e) => { e.stopPropagation(); onDone(); }}
      >
        {t('skip')}
      </button>
    </div>
  );
}
