"use client";

import { MotionConfig } from "framer-motion";
import { EASE } from "@/lib/motion";

/** One easing curve for every Framer Motion transition that doesn't set its own; honours reduced-motion. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.4, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
