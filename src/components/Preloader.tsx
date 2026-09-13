"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const HOLD_MS = 2200; // how long the splash stays fully visible
const FADE_MS = 750;

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
      className={`mf-splash-overlay fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#000000] transition-[opacity,visibility,transform] duration-[750ms] ease-spring ${
        leaving ? "pointer-events-none invisible scale-[1.03] opacity-0" : "opacity-100"
      }`}
    >
      {/* artwork box: 1064 x 856 source (true-black background); edges feathered so JPEG noise never shows a rectangle */}
      <div className="mf-splash-art relative aspect-[1064/856] w-[min(88vw,70vh,720px)] shrink-0 [mask-image:radial-gradient(ellipse_at_50%_50%,#000_60%,transparent_88%)] [-webkit-mask-image:radial-gradient(ellipse_at_50%_50%,#000_60%,transparent_88%)]">
        <Image src="/assets/brand/splash-logo.jpg" alt="" fill priority sizes="(max-width: 768px) 88vw, 720px" className="object-contain" />
      </div>

      {/* soft gold glow, screen-blended on top so it never reveals the artwork's edges */}
      <div className="mf-splash-glow pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.10] mix-blend-screen blur-[80px]" />
    </div>
  );
}
