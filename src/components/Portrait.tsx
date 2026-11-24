import { useApp } from '@/context/AppContext';

interface Props {
  color: string;
  name: string;
  size?: number;
  watermark?: boolean;
  rounded?: string;
}

const WATERMARK_TEXT = 'OFFICIAL DEALER · MISS SUNFLOWER';

export default function Portrait({ color, name, size = 96, watermark = false, rounded = 'rounded-2xl' }: Props) {
  const { isDark, eyeComfort } = useApp();

  // Generate a consistent hue from the name for portrait variety
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  const hue = Math.abs(hash) % 60;

  return (
    <div
      className={`relative overflow-hidden ${rounded} shrink-0`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${30 + hue}, 60%, 55%), hsl(${20 + hue}, 50%, 35%))`,
        boxShadow: 'inset 0 0 0 1px rgba(245,183,0,0.15)',
      }}
    >
      {/* Stylized portrait — elegant silhouette with warm tones */}
      <svg width={size} height={size} viewBox="0 0 100 100" className="absolute inset-0">
        <defs>
          <linearGradient id={`pg-${hash}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDark ? '#FBF6E6' : '#FFFBEB'} stopOpacity="0.25" />
            <stop offset="100%" stopColor={isDark ? '#FBF6E6' : '#FFFBEB'} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#pg-${hash})`} />
        {/* Head */}
        <circle cx="50" cy="36" r="16" fill={isDark ? '#FBF6E6' : '#FFFDF5'} opacity="0.2" />
        {/* Shoulders/body */}
        <path d="M18 100 Q18 58 50 58 Q82 58 82 100 Z" fill={isDark ? '#FBF6E6' : '#FFFDF5'} opacity="0.15" />
        {/* Subtle hair detail */}
        <path d="M34 30 Q34 18 50 18 Q66 18 66 30 Q66 26 50 26 Q34 26 34 30Z" fill={isDark ? '#FBF6E6' : '#FFFDF5'} opacity="0.1" />
      </svg>

      {/* Watermark text overlay */}
      {watermark && (
        <>
          <div className="watermark-text">
            <span style={{ color: isDark ? '#FBF6E6' : eyeComfort ? '#2A1A08' : '#1F1408' }}>
              {WATERMARK_TEXT} · {WATERMARK_TEXT}
            </span>
          </div>
          <div className="absolute inset-0 watermark-diagonal pointer-events-none" />
        </>
      )}
    </div>
  );
}
