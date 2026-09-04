"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE, STAGGER, viewportOnce } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  index?: number;
  y?: number;
  scale?: number;
  delay?: number;
};

export default function Reveal({ index = 0, y = 24, scale = 1, delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE, delay: delay + index * STAGGER }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
