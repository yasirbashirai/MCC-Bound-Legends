"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };
const HOLD = 6500;

/** Full-bleed Ken Burns crossfade slideshow with scroll parallax. Pauses when off-screen or reduced motion. */
export function HeroSlideshow({ slides, light = false }: { slides: Slide[]; light?: boolean }) {
  const [i, setI] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (slides.length < 2 || reduced) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % slides.length), HOLD);
    return () => window.clearInterval(t);
  }, [slides.length, reduced]);

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current; if (!el) return;
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { el.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * 0.18}px, 0)`; }); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  if (!slides.length) return null;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div ref={wrap} className="absolute inset-[-12%] will-change-transform">
        {slides.map((s, k) => (
          <div key={s.src} className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${k === i ? "opacity-100" : "opacity-0"}`}>
            <Image src={s.src} alt="" fill priority={k === 0} sizes="100vw" quality={78} className={`object-cover ${k === i && !reduced ? "kenburns" : ""}`} style={{ animationDelay: `${(k % 2) * -3}s` }} />
          </div>
        ))}
      </div>
      {/* Overlays: legibility left, navy fade bottom, subtle blue tint top-right */}
      {light ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.88)_0%,rgba(13,31,53,.62)_34%,rgba(13,31,53,.18)_58%,rgba(13,31,53,.08)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,53,.35)_0%,transparent_25%,transparent_70%,rgba(13,31,53,.75)_100%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,53,.94)_0%,rgba(13,31,53,.82)_38%,rgba(13,31,53,.45)_68%,rgba(13,31,53,.25)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,53,.55)_0%,transparent_30%,transparent_60%,rgba(10,22,40,1)_100%)]" />
          <div className="road-grid absolute inset-0 opacity-60" />
        </>
      )}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, k) => (
            <button key={k} type="button" onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-blue-400" : "w-4 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
      )}
    </div>
  );
}
