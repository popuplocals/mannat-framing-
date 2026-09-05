"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

export default function CtaBand({ href = "/contact", label = "Request a Free Quote" }: { href?: string; label?: string }) {
  return (
    <section className="mf-hatch relative overflow-hidden bg-gold-dark px-5 md:px-10 py-[100px] text-center">
      <motion.div
        className="relative mx-auto max-w-[700px]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <h2 className="m-0 mb-[18px] font-heading text-[clamp(28px,3.6vw,42px)] font-extrabold text-warm-white">
          Have a Project? Let&rsquo;s Frame It.
        </h2>
        <p className="m-0 mb-10 text-[15px] text-warm-white/85">Residential, commercial, or multi-family — we&rsquo;re ready to build.</p>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.3, ease: EASE }} className="inline-block">
          <Link
            href={href}
            className="inline-block rounded-full bg-black px-[34px] py-4 text-sm tracking-[0.3px] text-warm-white shadow-[0_18px_40px_-16px_rgba(13,13,13,0.6)] transition-colors duration-300 ease-spring hover:bg-charcoal"
          >
            {label} &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
