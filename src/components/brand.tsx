export function Logo({ size = 40, glow = true }: { size?: number; glow?: boolean }) {
  const s = `${size}px`;
  return (
    <div
      className="relative flex items-center justify-center rounded-2xl bg-hero"
      style={{ width: s, height: s, boxShadow: glow ? "var(--shadow-glow)" : undefined }}
    >
      <svg viewBox="0 0 40 40" width={size * 0.65} height={size * 0.65} fill="none">
        {/* Learning path nodes */}
        <path
          d="M6 30 Q 14 30 14 22 Q 14 14 22 14 Q 30 14 30 22"
          stroke="var(--mint)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="6" cy="30" r="2.5" fill="white" />
        <circle cx="14" cy="22" r="2.5" fill="white" />
        <circle cx="22" cy="14" r="2.5" fill="white" />
        <circle cx="30" cy="22" r="3.5" fill="var(--mint)" />
      </svg>
    </div>
  );
}

export function ProgressRing({
  value,
  size = 120,
  stroke = 10,
  label,
  sub,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sub?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="var(--border)" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          stroke="url(#ringGrad)"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--blue)" />
            <stop offset="100%" stopColor="var(--mint)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-bold">{label ?? `${value}%`}</span>
        {sub && <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{sub}</span>}
      </div>
    </div>
  );
}
