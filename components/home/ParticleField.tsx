"use client";

import { useEffect, useRef } from "react";

const GOLD = "201, 169, 110";
const COOL = "125, 166, 200";

/**
 * A light constellation of drifting points. Starts after the browser is idle, pauses when off-screen
 * or in a background tab, and renders a single static frame when reduced motion is requested.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let points: { x: number; y: number; vx: number; vy: number; r: number; cool: boolean }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (width * height) / 22000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.4,
        cool: Math.random() < 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const linkDistance = 130;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < linkDistance) {
            ctx.strokeStyle = `rgba(${GOLD}, ${0.12 * (1 - d / linkDistance)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${p.cool ? COOL : GOLD}, 0.65)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduced) draw();
      else if (visible && !document.hidden) frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(frame) : start());
    const onResize = () => {
      resize();
      start();
    };

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const handle = idle(() => {
      resize();
      canvas.dataset.ready = "true";
      observer.observe(canvas);
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      start();
    });

    return () => {
      (window.cancelIdleCallback ?? window.clearTimeout)(handle);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 size-full opacity-0 transition-opacity duration-[1500ms] data-[ready=true]:opacity-100"
    />
  );
}
