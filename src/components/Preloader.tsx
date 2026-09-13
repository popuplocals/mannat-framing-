"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HOLD_MS = 2300; // how long the splash stays fully visible
const FADE_MS = 900;

/**
 * Brand splash shown once per session on the first page a visitor opens: just the logo artwork,
 * easing up over black, then fading into the page. No spinner, no caption.
 *
 * It is part of the server-rendered HTML so it is on screen before hydration (no flash of the page
 * underneath). The inline script in the root layout adds `html.mf-splash` when the session has not seen
 * it yet; CSS hides the overlay otherwise. Always unmounted by a timer so it can never trap the visitor.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"shown" | "leaving" | "hidden">("shown");

  useEffect(() => {
    if (!document.documentElement.classList.contains("mf-splash")) {
      setPhase("hidden");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? 900 : HOLD_MS;
    const leave = setTimeout(() => setPhase("leaving"), hold);
    const gone = setTimeout(() => {
      setPhase("hidden");
      document.documentElement.classList.remove("mf-splash");
    }, hold + FADE_MS);
    return () => {
      clearTimeout(leave);
      clearTimeout(gone);
    };
  }, []);

  if (phase === "hidden") return null;
  const leaving = phase === "leaving";

  return (
    <div
      aria-hidden="true"
      className={`mf-splash-overlay fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#000000] transition-[opacity,visibility,transform] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        leaving ? "pointer-events-none invisible scale-[1.02] opacity-0" : "opacity-100"
      }`}
    >
      {/* artwork box: 1064 x 856 source with a true-black background, so it sits seamlessly on the overlay without masking */}
      <div className="mf-splash-art relative aspect-[1064/856] w-[min(68vw,46vh,460px)] shrink-0 will-change-[transform,opacity]">
        <Image src="/assets/brand/splash-logo.jpg" alt="" fill priority sizes="(max-width: 768px) 88vw, 720px" className="object-contain" />
      </div>

      {/* soft gold glow, screen-blended on top so it never reveals the artwork's edges */}
      <div className="mf-splash-glow pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.10] mix-blend-screen blur-[80px]" />
    </div>
  );
}
