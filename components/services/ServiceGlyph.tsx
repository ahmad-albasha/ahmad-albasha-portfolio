import type { ServiceIcon } from "@/data/services";
import { cn } from "@/lib/cn";

/**
 * Line-art emblems for each service, drawn in the same hairline language as the hero orbit.
 * Decorative only. Colour comes from `currentColor`; accents use the gold/emerald tokens.
 */
export function ServiceGlyph({ name, className }: { name: ServiceIcon; className?: string }) {
  const common = { viewBox: "0 0 200 200", fill: "none", "aria-hidden": true, className: cn("overflow-visible", className) } as const;

  if (name === "ai") {
    // A small network: three layers of nodes, fully connected, with one lit path.
    const layers = [
      [40, 100, 160],
      [25, 75, 125, 175],
      [70, 130],
    ];
    const xs = [30, 100, 170];
    return (
      <svg {...common}>
        {layers.slice(0, -1).flatMap((col, li) =>
          col.flatMap((y1) =>
            layers[li + 1].map((y2) => (
              <line key={`${li}-${y1}-${y2}`} x1={xs[li]} y1={y1} x2={xs[li + 1]} y2={y2} stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.75" />
            )),
          ),
        )}
        <polyline points="30,100 100,75 170,130" stroke="var(--color-gold)" strokeWidth="1.25" />
        {layers.flatMap((col, li) =>
          col.map((y) => <circle key={`${li}-${y}`} cx={xs[li]} cy={y} r={li === 1 ? 4 : 5} fill="var(--color-ink)" stroke="currentColor" strokeWidth="1" />),
        )}
        <circle cx="100" cy="75" r="4" fill="var(--color-gold)" />
        <circle cx="100" cy="100" r="92" stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 5" />
      </svg>
    );
  }

  if (name === "web") {
    // Stacked browser planes in isometric offset.
    return (
      <svg {...common}>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 18} ${-i * 18})`} opacity={1 - i * 0.3}>
            <rect x="22" y="70" width="130" height="94" rx="6" stroke="currentColor" strokeWidth="1" fill="var(--color-ink)" />
            <line x1="22" y1="86" x2="152" y2="86" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.75" />
          </g>
        ))}
        <rect x="34" y="98" width="52" height="6" rx="3" fill="var(--color-gold)" />
        <rect x="34" y="112" width="96" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
        <rect x="34" y="121" width="80" height="3" rx="1.5" fill="currentColor" fillOpacity="0.3" />
        <rect x="34" y="138" width="40" height="14" rx="7" stroke="var(--color-gold)" strokeWidth="1" />
      </svg>
    );
  }

  if (name === "mobile") {
    // Two devices, one tilted behind the other.
    return (
      <svg {...common}>
        <g transform="rotate(-12 100 100)" opacity="0.45">
          <rect x="58" y="30" width="72" height="140" rx="14" stroke="currentColor" strokeWidth="1" />
        </g>
        <rect x="76" y="34" width="72" height="140" rx="14" stroke="currentColor" strokeWidth="1.1" fill="var(--color-ink)" />
        <rect x="102" y="42" width="20" height="4" rx="2" fill="currentColor" fillOpacity="0.4" />
        <circle cx="112" cy="92" r="18" stroke="var(--color-gold)" strokeWidth="1" />
        <circle cx="112" cy="92" r="4" fill="var(--color-gold)" />
        <rect x="88" y="126" width="48" height="4" rx="2" fill="currentColor" fillOpacity="0.35" />
        <rect x="94" y="136" width="36" height="4" rx="2" fill="currentColor" fillOpacity="0.25" />
        <rect x="90" y="152" width="44" height="12" rx="6" fill="var(--color-gold)" fillOpacity="0.85" />
      </svg>
    );
  }

  // custom — a chip with circuit traces running out to pads.
  const traces = [
    "M70 80 H40 V50",
    "M70 100 H20",
    "M70 120 H45 V155",
    "M130 80 H160 V45",
    "M130 100 H180",
    "M130 120 H150 V160",
    "M90 70 V25",
    "M110 130 V178",
  ];
  return (
    <svg {...common}>
      {traces.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
      ))}
      {[
        [40, 50],
        [20, 100],
        [45, 155],
        [160, 45],
        [180, 100],
        [150, 160],
        [90, 25],
        [110, 178],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="var(--color-ink)" stroke="currentColor" strokeWidth="1" />
      ))}
      <rect x="70" y="70" width="60" height="60" rx="6" stroke="var(--color-gold)" strokeWidth="1.2" fill="var(--color-ink)" />
      <rect x="84" y="84" width="32" height="32" rx="3" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="4" fill="var(--color-gold)" />
    </svg>
  );
}
