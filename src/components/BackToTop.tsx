"use client";
import { useEffect, useState } from "react";
import { Chevron } from "./Icons";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", f, { passive: true }); const t = window.setTimeout(f, 0);
    return () => { window.removeEventListener("scroll", f); window.clearTimeout(t); };
  }, []);
  return (
    <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-navy text-white shadow-lg ring-1 ring-white/15 transition-all duration-300 hover:bg-blue lg:bottom-6 lg:right-6 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <Chevron className="h-5 w-5 rotate-180" />
    </button>
  );
}
