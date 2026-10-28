import { useId } from "react";

type Pt = { x: number; y: number };

function smoothPath(points: Pt[]): string {
  let d = `M ${points[0]!.x.toFixed(1)} ${points[0]!.y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[Math.min(points.length - 1, i + 2)]!;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function PriceChart({ data }: { data: number[] }) {
  const gradientId = useId();
  if (data.length < 2) return null;

  const W = 640;
  const H = 280;
  const PAD = 12;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const points: Pt[] = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: H - PAD - ((v - min) / span) * (H - PAD * 2),
  }));

  const line = smoothPath(points);
  const lastPt = points[points.length - 1]!;
  const firstPt = points[0]!;
  const area = `${line} L ${lastPt.x.toFixed(1)} ${H} L ${firstPt.x.toFixed(1)} ${H} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Price chart"
    >
      <defs>
        <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.68 0.16 252)" />
          <stop offset="100%" stopColor="oklch(0.8 0.11 240)" />
        </linearGradient>
        <linearGradient id={`${gradientId}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.16 252 / 0.28)" />
          <stop offset="100%" stopColor="oklch(0.68 0.16 252 / 0)" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={PAD}
          x2={W - PAD}
          y1={PAD + f * (H - PAD * 2)}
          y2={PAD + f * (H - PAD * 2)}
          stroke="oklch(0.35 0.02 258 / 0.35)"
          strokeDasharray="3 6"
        />
      ))}

      <path d={area} fill={`url(#${gradientId}-area)`} />
      <path
        d={line}
        fill="none"
        stroke={`url(#${gradientId}-line)`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={lastPt.x} cy={lastPt.y} r="4" fill="oklch(0.8 0.11 240)" />
      <circle cx={lastPt.x} cy={lastPt.y} r="9" fill="oklch(0.8 0.11 240 / 0.2)" />
    </svg>
  );
}
