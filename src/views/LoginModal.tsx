import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Modal from '@/components/Modal';
import { Lock, Phone, KeyRound } from 'lucide-react';
import type { AppRole } from '@/context/AppContext';

interface Props {
  open: boolean;
  onClose: () => void;
  onLogin: (role: AppRole) => void;
}

export default function LoginModal({ open, onClose, onLogin }: Props) {
  const { t, isDark } = useApp();
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');

  return (
    <Modal open={open} onClose={onClose} title={t('loginTitle')} subtitle={t('loginSubtitle')} icon={<Lock size={18} />} maxWidth="max-w-sm">
      <div className="space-y-4">
        {/* Lock badge */}
        <div className="flex justify-center py-2">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: isDark ? '#1E1810' : 'var(--bg-card-alt)', border: `1px solid var(--border-base)` }}
          >
            <Lock size={24} className="text-sunflower-400" />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('phoneLabel')}</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sec" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="012 345 678"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* PIN */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-sec">{t('pinLabel')}</label>
          <div className="relative">
            <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sec" />
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="••••••"
              className="input-field pl-10 tracking-[0.5em] text-center"
            />
          </div>
        </div>

        {/* Sign in */}
        <button
          className="btn-gold w-full"
          onClick={() => onLogin('dealer')}
        >
          {t('signIn')}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px" style={{ background: 'var(--border-base)' }} />
          <span className="text-xs text-sec">UI Test</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border-base)' }} />
        </div>

        {/* Quick role buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn-ghost text-xs"
            onClick={() => onLogin('ceo')}
          >
            {t('testCEO')}
          </button>
          <button
            className="btn-ghost text-xs"
            onClick={() => onLogin('dealer')}
          >
            {t('testVIP')}
          </button>
        </div>

        <p className="text-center text-xs text-sec/60 pt-1">
          {t('loginSubtitle')}
        </p>
      </div>
    </Modal>
  );
}
