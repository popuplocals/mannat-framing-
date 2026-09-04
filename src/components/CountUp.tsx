"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

/** Animates the numeric part of a stat label ("200+", "2014") once it scrolls into view. */
export default function CountUp({ value, className, duration = 1400 }: { value: string; className?: string; duration?: number }) {
  const [ref, visible] = useInView<HTMLSpanElement>(0.3);
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? value;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // same spring-like curve as the rest of the motion system
      const eased = 1 - Math.pow(1 - t, 4);
      setN(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration, match]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
