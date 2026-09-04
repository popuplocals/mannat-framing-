"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** Background layer: drifts down and zooms slightly as the visitor scrolls past the hero. */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 90, damping: 30, mass: 0.6 });
  const y = useTransform(smooth, [0, 900], [0, reduce ? 0 : 180]);
  const scale = useTransform(smooth, [0, 900], [1, reduce ? 1 : 1.12]);
  return (
    <motion.div className="absolute inset-0 will-change-transform" style={{ y, scale }}>
      {children}
    </motion.div>
  );
}

/** Foreground copy: eases upward and fades as the hero leaves the viewport. */
export function HeroFade({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 90, damping: 30, mass: 0.6 });
  const opacity = useTransform(smooth, [0, 520], [1, reduce ? 1 : 0]);
  const y = useTransform(smooth, [0, 520], [0, reduce ? 0 : -60]);
  return (
    <motion.div className="relative will-change-transform" style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}
