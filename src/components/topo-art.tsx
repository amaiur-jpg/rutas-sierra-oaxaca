// Ilustración de curvas de nivel, distinta para cada ruta (según `seed`).
const tones = ['#2F5D50', '#3d6b5c', '#B5532A', '#1E2B26', '#4a6b3e', '#8a6a2a', '#2c4a5a'];

export function TopoArt({ seed, className = '' }: { seed: number; className?: string }) {
  const bg = tones[seed % tones.length];
  const cx = 30 + ((seed * 17) % 40);
  const cy = 35 + ((seed * 11) % 30);
  return (
    <svg aria-hidden className={className} preserveAspectRatio="xMidYMid slice" viewBox="0 0 200 100">
      <rect width="200" height="100" fill={bg} />
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} cx={cx * 2} cy={cy} rx={18 + i * 15} ry={8 + i * 8} fill="none" stroke="#F3EEE1" strokeOpacity={0.14 + (i % 3) * 0.06} strokeWidth="0.8" transform={`rotate(${-12 + seed * 7} ${cx * 2} ${cy})`} />
      ))}
      <path d="M0 88 40 62l22 14 38-34 30 26 24-16 46 36v12H0z" fill="#1E2B26" fillOpacity="0.45" />
      <path d="M0 96 50 74l30 12 40-26 36 24 44-14v30H0z" fill="#F3EEE1" fillOpacity="0.12" />
      <circle cx={160 - seed * 6} cy="20" r="7" fill="#D9A441" />
    </svg>
  );
}
