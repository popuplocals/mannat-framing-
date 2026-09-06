"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    t: "Pre-Construction",
    d: "Goal alignment, scope review, budgeting and scheduling before crews arrive on site.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 3h6v2H9z" fill="#927545" stroke="none" /><path d="M8 10h8M8 14h8M8 18h5" /></svg>
    ),
  },
  {
    t: "Site Preparation",
    d: "Excavation, grading and earthwork completed and inspected before framing begins.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><path d="M4 20h16" /><path d="M6 20V9l6-4 6 4v11" /><path d="M10 20v-6h4v6" /></svg>
    ),
  },
  {
    t: "Build Phase",
    d: "Forming, framing and trades coordination supervised by experienced project managers.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><path d="M3 21l7-7" /><path d="M9 15l2-6 8 8-6 2z" /><path d="M13 5l2 2" /><path d="M16 3l2 2" /></svg>
    ),
  },
  {
    t: "Handover",
    d: "Final walk-through, deficiency review and a clean completed project handed to the client.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><path d="M8 12l-4 1 1 4" /><path d="M4 13c2 3 5 5 8 5s6-2 8-5" /><path d="M16 12l4 1-1 4" /><circle cx="12" cy="7" r="3" /></svg>
    ),
  },
];

// Timeline (ms): header starts at 0; line + spark start at 400; steps pop as the line reaches them.
const LINE_START = 400;
const STEP_DELAYS = [600, 850, 1100, 1350].map((d) => LINE_START + d);
const ANIMATION_TOTAL = LINE_START + 1350 + 550 + 100;

/**
 * "How We Work" with a scroll-triggered entrance: header stagger, gold line draw with a
 * travelling spark, then each step springs in as the line reaches it. Pure CSS
 * transitions/keyframes driven by one IntersectionObserver; runs once per page load.
 */
export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    // Measure the track lengths so the spark's transform can travel exactly to the line's end.
    const measure = () => {
      const trackH = grid.querySelector<HTMLElement>("[data-track-h]");
      const trackV = grid.querySelector<HTMLElement>("[data-track-v]");
      const circles = grid.querySelectorAll<HTMLElement>("[data-circle]");
      if (trackH) trackH.style.setProperty("--h-len", `${trackH.offsetWidth}px`);
      if (trackV && circles.length > 1) {
        const g = grid.getBoundingClientRect();
        const first = circles[0].getBoundingClientRect();
        const last = circles[circles.length - 1].getBoundingClientRect();
        const start = first.top - g.top + first.height / 2;
        const end = last.top - g.top + last.height / 2;
        trackV.style.setProperty("--v-start", `${start}px`);
        trackV.style.setProperty("--v-len", `${Math.max(0, end - start)}px`);
      }
    };
    measure();
    window.addEventListener("resize", measure);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true); // everything shown instantly, no motion (see CSS)
      return () => window.removeEventListener("resize", measure);
    }

    let timer = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        measure();
        setAnimating(true);
        setInView(true);
        timer = window.setTimeout(() => setAnimating(false), ANIMATION_TOTAL);
      },
      { threshold: 0.2 }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`mf-process bg-surface px-5 py-[100px] md:px-10 ${inView ? "is-in" : ""} ${animating ? "is-animating" : ""}`}
    >
      <div className="mx-auto max-w-[1440px]">
        <div>
          <span className="mf-process-item block text-xs font-medium tracking-[2.5px] text-accent" style={{ transitionDelay: "0ms" }}>HOW WE WORK</span>
          <h2 className="mf-process-item m-0 mb-[14px] mt-5 max-w-[600px] font-heading text-[32px] font-extrabold leading-[1.22] text-ink" style={{ transitionDelay: "100ms" }}>
            A Clear Process, Plan to Handover.
          </h2>
          <p className="mf-process-item m-0 mb-16 max-w-[520px] text-sm text-ink-2" style={{ transitionDelay: "200ms" }}>
            Each engagement follows the same four phases so clients know what to expect at every stage.
          </p>
        </div>

        <div ref={gridRef} className="relative grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-7 lg:grid-cols-4">
          {/* Horizontal track (4-across layout) */}
          <div data-track-h aria-hidden="true" className="mf-track mf-track-h absolute left-[6%] right-[6%] top-8 hidden h-px lg:block">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#C5A46D_0_8px,transparent_8px_16px)]" />
            <div className="mf-track-solid absolute left-0 top-[-0.25px] h-[1.5px] bg-gold" />
            <div className="mf-spark" />
          </div>
          {/* Vertical track (stacked layout below 768px) */}
          <div data-track-v aria-hidden="true" className="mf-track mf-track-v absolute left-1/2 w-px md:hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,#C5A46D_0_8px,transparent_8px_16px)]" />
            <div className="mf-track-solid absolute left-[-0.25px] top-0 h-full w-[1.5px] bg-gold" />
            <div className="mf-spark" />
          </div>

          {steps.map((s, i) => (
            <div key={s.t} className="mf-step relative z-[1] text-center" style={{ transitionDelay: `${STEP_DELAYS[i]}ms` }}>
              <div data-circle className="mf-circle relative mx-auto mb-[18px] flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-surface">
                {s.icon}
              </div>
              <div className="mf-step-text inline-block">
                <div className="mb-2 font-heading text-[13px] font-bold text-gold">0{i + 1}</div>
                <div className="mb-2 font-heading text-[15px] font-bold">{s.t}</div>
                <div className="mx-auto max-w-[190px] text-xs leading-[1.6] text-ink-2">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
