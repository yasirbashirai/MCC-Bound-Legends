"use client";
import { useEffect, useRef, useState } from "react";
import type { Review } from "@/data/reviews";
import { Arrow, Star } from "./Icons";

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(0);
  const n = reviews.length;
  useEffect(() => {
    if (paused || n < 2) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), 6000);
    return () => window.clearInterval(t);
  }, [paused, n]);
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); }}>
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
          {reviews.map((r) => (
            <figure key={r.name} className="w-full shrink-0 px-1">
              <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur sm:p-12">
                <div className="flex justify-center gap-1 text-orange" aria-label="5 out of 5 stars">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-5 w-5" />)}</div>
                <blockquote className="mt-6 text-xl leading-relaxed text-white sm:text-2xl">“{r.text}”</blockquote>
                <figcaption className="mt-6 text-sm text-white/60"><span className="font-semibold text-white">{r.name}</span> · {r.service} · {r.source} review</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"><Arrow className="h-5 w-5 rotate-180" /></button>
        <div className="flex gap-2">{reviews.map((_, k) => <button key={k} type="button" aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-blue-400" : "w-3 bg-white/30"}`} />)}</div>
        <button type="button" onClick={() => go(1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white/10"><Arrow className="h-5 w-5" /></button>
      </div>
    </div>
  );
}
