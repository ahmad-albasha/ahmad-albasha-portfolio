"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's signature visual: an "intelligence core" with tilted orbits, travelling nodes and the
 * live connections between them — systems that talk to each other. Pure SVG, animated with one
 * requestAnimationFrame loop that writes attributes directly (no React re-renders), paused when the
 * hero is off-screen or the tab is hidden, and frozen in a composed pose for reduced motion.
 */

type Orbit = { rx: number; ry: number; tilt: number; speed: number; nodes: { phase: number; r: number; tone: "gold" | "emerald" | "ivory" }[] };

const ORBITS: Orbit[] = [
  { rx: 250, ry: 78, tilt: -18, speed: 0.07, nodes: [{ phase: 0.4, r: 4.5, tone: "gold" }, { phase: 3.6, r: 2.5, tone: "ivory" }] },
  { rx: 205, ry: 120, tilt: 32, speed: -0.05, nodes: [{ phase: 1.9, r: 3.5, tone: "emerald" }, { phase: 5.0, r: 2.5, tone: "gold" }] },
  { rx: 150, ry: 54, tilt: 74, speed: 0.11, nodes: [{ phase: 2.8, r: 3, tone: "ivory" }] },
];

const TONES = { gold: "#c9a96e", emerald: "#7fa697", ivory: "#e8e1d5" };
const LABELS = [
  { text: "LLM", angle: -62 },
  { text: "RAG", angle: 18 },
  { text: "WEB", angle: 128 },
  { text: "MOBILE", angle: 208 },
];

const TICKS = Array.from({ length: 120 }, (_, i) => i);

function position(o: Orbit, phase: number) {
  const x = o.rx * Math.cos(phase);
  const y = o.ry * Math.sin(phase);
  const t = (o.tilt * Math.PI) / 180;
  return { x: x * Math.cos(t) - y * Math.sin(t), y: x * Math.sin(t) + y * Math.cos(t) };
}

export function SignalOrbit({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const spokeRefs = useRef<(SVGLineElement | null)[]>([]);
  const meshRef = useRef<SVGPolygonElement>(null);
  const layerRefs = useRef<(SVGGElement | null)[]>([]);

  const flat = ORBITS.flatMap((o, oi) => o.nodes.map((n) => ({ ...n, oi })));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let frame = 0;
    let visible = true;
    let last = performance.now();
    let time = 12; // start mid-flight so the first frame is already composed
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const render = () => {
      const pts: { x: number; y: number }[] = [];
      flat.forEach((n, i) => {
        const o = ORBITS[n.oi];
        const p = position(o, n.phase + time * o.speed);
        pts.push(p);
        nodeRefs.current[i]?.setAttribute("cx", p.x.toFixed(2));
        nodeRefs.current[i]?.setAttribute("cy", p.y.toFixed(2));
        spokeRefs.current[i]?.setAttribute("x2", p.x.toFixed(2));
        spokeRefs.current[i]?.setAttribute("y2", p.y.toFixed(2));
      });
      meshRef.current?.setAttribute("points", pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
      // Depth parallax: each layer drifts a different amount toward the pointer.
      layerRefs.current.forEach((layer, depth) => {
        if (!layer) return;
        const k = (depth + 1) * 7;
        layer.setAttribute("transform", `translate(${(current.x * k).toFixed(2)} ${(current.y * k).toFixed(2)})`);
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      render();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    render();
    if (reduced) return;

    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start());

    observer.observe(root);
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
    start();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} aria-hidden className={className}>
      <svg viewBox="-320 -320 640 640" className="size-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="orbit-core" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(150)">
            <stop offset="0" stopColor="#7fa697" stopOpacity="0.55" />
            <stop offset="0.35" stopColor="#527d70" stopOpacity="0.18" />
            <stop offset="1" stopColor="#14251f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="orbit-stroke" x1="-300" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c9a96e" stopOpacity="0" />
            <stop offset="0.5" stopColor="#c9a96e" stopOpacity="0.55" />
            <stop offset="1" stopColor="#c9a96e" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Layer 0 — instrument ring (furthest back) */}
        <g ref={(el) => void (layerRefs.current[0] = el)}>
          <circle r="292" stroke="#e8e1d5" strokeOpacity="0.07" />
          <circle r="248" stroke="#e8e1d5" strokeOpacity="0.05" strokeDasharray="2 6" />
          <g className="animate-spin-slow">
            {TICKS.map((i) => {
              const a = (i * 3 * Math.PI) / 180;
              const major = i % 10 === 0;
              const r1 = 292;
              const r2 = major ? 278 : 286;
              return (
                <line
                  key={i}
                  x1={(r1 * Math.cos(a)).toFixed(2)}
                  y1={(r1 * Math.sin(a)).toFixed(2)}
                  x2={(r2 * Math.cos(a)).toFixed(2)}
                  y2={(r2 * Math.sin(a)).toFixed(2)}
                  stroke={major ? "#c9a96e" : "#e8e1d5"}
                  strokeOpacity={major ? 0.6 : 0.16}
                  strokeWidth={major ? 1 : 0.6}
                />
              );
            })}
          </g>
          {LABELS.map(({ text, angle }) => {
            const a = (angle * Math.PI) / 180;
            const x = 312 * Math.cos(a);
            const y = 312 * Math.sin(a);
            return (
              <g key={text}>
                <circle cx={(292 * Math.cos(a)).toFixed(2)} cy={(292 * Math.sin(a)).toFixed(2)} r="2" fill="#c9a96e" />
                <text
                  x={x.toFixed(1)}
                  y={y.toFixed(1)}
                  textAnchor={Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle"}
                  dominantBaseline="middle"
                  className="fill-muted font-mono"
                  fontSize="10"
                  letterSpacing="2"
                >
                  {text}
                </text>
              </g>
            );
          })}
        </g>

        {/* Layer 1 — light and orbits */}
        <g ref={(el) => void (layerRefs.current[1] = el)}>
          <circle r="150" fill="url(#orbit-core)" />
          {ORBITS.map((o) => (
            <ellipse key={o.rx} rx={o.rx} ry={o.ry} transform={`rotate(${o.tilt})`} stroke="url(#orbit-stroke)" strokeWidth="0.9" />
          ))}
          <polygon ref={meshRef} stroke="#c9a96e" strokeOpacity="0.14" strokeWidth="0.6" strokeDasharray="1 4" />
          {flat.map((_, i) => (
            <line key={i} ref={(el) => void (spokeRefs.current[i] = el)} x1="0" y1="0" x2="0" y2="0" stroke="#7fa697" strokeOpacity="0.22" strokeWidth="0.6" />
          ))}
        </g>

        {/* Layer 2 — core and nodes (closest) */}
        <g ref={(el) => void (layerRefs.current[2] = el)}>
          <circle r="16" stroke="#7fa697" strokeOpacity="0.5" className="animate-pulse-ring" />
          <circle r="16" stroke="#c9a96e" strokeOpacity="0.35" className="animate-pulse-ring [animation-delay:2.2s]" />
          <circle r="34" stroke="#e8e1d5" strokeOpacity="0.1" />
          <circle r="7" fill="#e8e1d5" />
          <circle r="12" stroke="#c9a96e" strokeOpacity="0.7" />
          {flat.map((n, i) => (
            <circle key={i} ref={(el) => void (nodeRefs.current[i] = el)} r={n.r} fill={TONES[n.tone]} />
          ))}
        </g>
      </svg>
    </div>
  );
}
