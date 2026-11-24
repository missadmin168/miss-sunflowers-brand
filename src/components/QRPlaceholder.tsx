interface Props {
  size?: number;
  seed?: string;
}

// Generates a deterministic QR-like pattern
export default function QRPlaceholder({ size = 120, seed = 'MSF' }: Props) {
  const grid = 21;
  const cell = size / grid;

  // Simple hash from seed
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  const isFilled = (r: number, c: number) => {
    // Position markers (corners)
    const inMarker = (r0: number, c0: number) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
    if (inMarker(0, 0) || inMarker(0, grid - 7) || inMarker(grid - 7, 0)) {
      const ir = r % 7, ic = c % 7;
      const isCorner = (r0: number, c0: number) => {
        const dr = Math.floor(r / 7) * 7, dc = Math.floor(c / 7) * 7;
        return dr === r0 && dc === c0;
      };
      const localR = r - Math.floor(r / 7) * 7;
      const localC = c - Math.floor(c / 7) * 7;
      void isCorner;
      const outer = localR === 0 || localR === 6 || localC === 0 || localC === 6;
      const inner = localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4;
      return outer || inner;
    }
    // Pseudo-random fill
    return ((hash + r * 7 + c * 13) % 3) === 0;
  };

  return (
    <div className="rounded-xl overflow-hidden bg-white p-2 inline-block" style={{ width: size + 16, height: size + 16 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: grid }).map((_, r) =>
          Array.from({ length: grid }).map((_, c) =>
            isFilled(r, c) ? (
              <rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} fill="#181510" />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}
