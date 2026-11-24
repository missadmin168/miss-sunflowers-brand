import { useApp } from '@/context/AppContext';

interface Props {
  size?: number;
  showBadge?: boolean;
  animated?: boolean;
}

export default function SunflowerLogo({ size = 80, showBadge = false, animated = false }: Props) {
  const { isDark } = useApp();

  const flower = (
    <svg width={size} height={size} viewBox="0 0 100 100" className={animated ? 'animate-spin-slow' : ''}>
      <defs>
        <radialGradient id="petalGrad" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="60%" stopColor="#F5B700" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>
        <radialGradient id="centerGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#3D2410" />
          <stop offset="100%" stopColor="#1A0F08" />
        </radialGradient>
      </defs>
      <g transform="translate(50,50)">
        {/* 12 petals */}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0" cy="-23" rx="7.5" ry="19"
            fill="url(#petalGrad)"
            stroke="#D97706"
            strokeWidth="0.5"
            opacity="0.92"
            transform={`rotate(${i * 30})`}
          />
        ))}
        {/* Inner petal layer (offset) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={`inner-${i}`}
            cx="0" cy="-16" rx="5" ry="13"
            fill="#FDE047"
            opacity="0.7"
            transform={`rotate(${i * 30 + 15})`}
          />
        ))}
        {/* Seed center */}
        <circle cx="0" cy="0" r="15" fill="url(#centerGrad)" stroke="#F5B700" strokeWidth="1.5" />
        {/* Geometric seed dots */}
        <g fill="#6B4423" opacity="0.8">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const r = 9;
            const cx = Math.cos(angle) * r;
            const cy = Math.sin(angle) * r;
            return <circle key={i} cx={cx} cy={cy} r="2" />;
          })}
        </g>
        <g fill="#8B5E3C" opacity="0.6">
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = ((i * 60 + 30) * Math.PI) / 180;
            const r = 5;
            const cx = Math.cos(angle) * r;
            const cy = Math.sin(angle) * r;
            return <circle key={i} cx={cx} cy={cy} r="1.5" />;
          })}
        </g>
        <circle cx="0" cy="0" r="1.8" fill="#F5B700" opacity="0.5" />
      </g>
    </svg>
  );

  if (!showBadge) return flower;

  const badgeSize = size + size * 0.35;
  return (
    <div
      className="rounded-3xl flex items-center justify-center"
      style={{
        width: badgeSize, height: badgeSize,
        background: isDark ? '#14110B' : 'var(--bg-card-alt)',
        border: `2px solid ${isDark ? '#FACC15' : '#EAB308'}`,
        boxShadow: isDark
          ? '0 4px 24px rgba(245,183,0,0.15), inset 0 0 0 1px rgba(245,183,0,0.1)'
          : '0 4px 20px rgba(245,183,0,0.2), inset 0 0 0 1px rgba(245,183,0,0.1)',
      }}
    >
      {flower}
    </div>
  );
}
