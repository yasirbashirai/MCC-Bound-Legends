"use client";
import { useEffect, useRef, useState } from "react";

/** Count-up when scrolled into view. Only used for REAL numbers (states, categories, deposit). */
export function Counter({ to, prefix = "", suffix = "", duration = 1400 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { const t = window.setTimeout(() => setV(to), 0); return () => window.clearTimeout(t); }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const step = (t: number) => { const p = Math.min(1, (t - t0) / duration); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}
