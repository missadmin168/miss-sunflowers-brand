import { useApp } from '@/context/AppContext';
import { DisplayModeSelector, EyeComfortToggle, LangToggle } from '@/components/Toggles';
import SunflowerLogo from '@/components/SunflowerLogo';
import { KeyRound, ChevronRight, Info, ShieldCheck, Sun } from 'lucide-react';
import Modal from '@/components/Modal';
import { useState } from 'react';
import type { DictKey } from '@/data/i18n';

interface Props {
  onChangePin: () => void;
}

export function SettingsSection({ onChangePin }: Props) {
  const { t } = useApp();
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Display Mode */}
      <div className="surface p-4 space-y-3 animate-slide-up">
        <div className="flex items-center gap-2">
          <Sun size={18} className="text-accent" />
          <h3 className="text-sm font-bold text-pri">{t('displayMode')}</h3>
        </div>
        <DisplayModeSelector />
        <EyeComfortToggle />
      </div>

      {/* Language */}
      <div className="surface p-4 flex items-center justify-between animate-slide-up">
        <span className="text-sm font-medium text-pri">{t('language')}</span>
        <LangToggle />
      </div>

      {/* Change PIN */}
      <button onClick={onChangePin} className="surface w-full p-4 flex items-center justify-between animate-slide-up surface-hover">
        <div className="flex items-center gap-3">
          <KeyRound size={18} className="text-accent" />
          <span className="text-sm font-medium text-pri">{t('changePin')}</span>
        </div>
        <ChevronRight size={16} className="text-sec" />
      </button>

      {/* About */}
      <button onClick={() => setAboutOpen(true)} className="surface w-full p-4 flex items-center justify-between animate-slide-up surface-hover">
        <div className="flex items-center gap-3">
          <Info size={18} className="text-accent" />
          <span className="text-sm font-medium text-pri">{t('about')}</span>
        </div>
        <ChevronRight size={16} className="text-sec" />
      </button>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}

function AboutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useApp();
  const steps: DictKey[] = ['aboutStep1', 'aboutStep2', 'aboutStep3'];

  return (
    <Modal open={open} onClose={onClose} title={t('aboutTitle')} icon={<Info size={18} />} maxWidth="max-w-sm">
      <div className="space-y-4">
        {/* Brand hero */}
        <div className="flex flex-col items-center gap-3 py-2">
          <SunflowerLogo size={64} showBadge />
          <h2 className="font-display text-lg font-bold text-pri">Miss Sunflower Brand</h2>
        </div>

        {/* Description */}
        <p className="text-sm text-sec leading-relaxed text-center">
          {t('aboutDesc')}
        </p>

        {/* Divider */}
        <div className="h-px" style={{ background: 'var(--border-base)' }} />

        {/* How it works */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-pri uppercase tracking-wide flex items-center gap-2">
            <ShieldCheck size={14} className="text-accent" /> {t('aboutHowItWorks')}
          </h4>
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-accent text-accent-text flex items-center justify-center text-xs font-bold shrink-0" style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}>
                {i + 1}
              </div>
              <p className="text-sm text-pri leading-relaxed pt-0.5">{t(step)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <span className="pill text-[10px] text-sec" style={{ background: 'var(--bg-card-alt)', border: '1px solid var(--border-base)' }}>
            {t('demoPreview')}
          </span>
        </div>
      </div>
    </Modal>
  );
}
