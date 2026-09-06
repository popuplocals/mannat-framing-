"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES: { src: string; alt: string }[] = [
  { src: "/assets/hero-framing.jpg", alt: "Timber framing under construction in Surrey, BC" },
  { src: "/assets/photos/teaser-townhouse-row.jpg", alt: "Row of framed townhouses on a Mannat Framing site" },
  { src: "/assets/photos/svc-framing-trusses.jpg", alt: "Roof trusses set on a framed building" },
  { src: "/assets/photos/proj-custom-home.jpg", alt: "Two-storey home fully framed" },
  { src: "/assets/photos/svc-general-construction.jpg", alt: "Five-storey wood-frame building under construction" },
];

const INTERVAL_MS = 3000;
const FADE_MS = 1100;

/**
 * Hero background slideshow: crossfades to the next job-site photo every 3 seconds with a slow
 * Ken Burns drift on the active slide. Pauses while the tab is hidden; under reduced motion it
 * still crossfades (no movement) so the rotation is kept.
 */
export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onMq);

    let timer = 0;
    const start = () => { stop(); timer = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS); };
    const stop = () => { if (timer) window.clearInterval(timer); timer = 0; };
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();
    return () => { stop(); document.removeEventListener("visibilitychange", onVis); mq.removeEventListener("change", onMq); };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-live="off">
      {SLIDES.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.src}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${FADE_MS}ms cubic-bezier(0.23, 1, 0.32, 1)`,
              // slow zoom on the visible slide, reset instantly once hidden so the next entrance starts from 1
              transform: isActive && !reduced ? "scale(1.07)" : "scale(1)",
              transitionProperty: isActive ? "opacity, transform" : "opacity",
              transitionDuration: isActive ? `${FADE_MS}ms, ${INTERVAL_MS + FADE_MS}ms` : `${FADE_MS}ms`,
              transitionTimingFunction: isActive ? "cubic-bezier(0.23, 1, 0.32, 1), linear" : "cubic-bezier(0.23, 1, 0.32, 1)",
              willChange: isActive ? "opacity, transform" : "auto",
            }}
          >
            <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        );
      })}
    </div>
  );
}
