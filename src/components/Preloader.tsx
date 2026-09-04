"use client";

import { useEffect, useState } from "react";

/**
 * Brand splash shown once per session on first load of the homepage.
 * CSS-driven (no rAF dependency) and always unmounted by a timer so it can never trap the visitor.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"hidden" | "shown" | "leaving">("hidden");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("mf-preloaded")) return;
      sessionStorage.setItem("mf-preloaded", "1");
    } catch {
      /* storage unavailable — just show once */
    }
    setPhase("shown");
    const leave = setTimeout(() => setPhase("leaving"), 1300);
    const gone = setTimeout(() => setPhase("hidden"), 1300 + 500);
    return () => {
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-4 bg-black transition-[opacity,visibility] duration-[450ms] ease-spring ${
        phase === "leaving" ? "pointer-events-none invisible opacity-0" : "opacity-100"
      }`}
    >
      <span className="font-heading text-[15px] font-extrabold tracking-[1.5px] text-warm-white">MANNAT FRAMING LTD.</span>
      <span className="mf-preload-line h-px bg-gold" />
    </div>
  );
}
