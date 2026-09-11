"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal. Opt-in via html.js so content is always visible without JS.
 * Synchronous first pass for anything already on screen, IntersectionObserver
 * for the rest, and a safety timeout so nothing can stay hidden.
 */
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in), .reveal-left:not(.in), .reveal-right:not(.in), .reveal-scale:not(.in), .reveal-up:not(.in)"));
    const vh = window.innerHeight;
    const pending: HTMLElement[] = [];
    els.forEach((e) => { if (e.getBoundingClientRect().top < vh * 1.15) e.classList.add("in"); else pending.push(e); });
    if (!pending.length) return;
    if (!("IntersectionObserver" in window)) { pending.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    pending.forEach((e) => io.observe(e));
    const safety = window.setTimeout(() => pending.forEach((e) => e.classList.add("in")), 4000);
    return () => { io.disconnect(); window.clearTimeout(safety); };
  }, [path]);
  return null;
}
