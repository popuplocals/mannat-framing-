"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import ServiceIcon from "@/components/ServiceIcon";
import LivingBlueprint from "@/components/LivingBlueprint";

const PHONE = "(778) 723-8994";
const PHONE_HREF = "tel:+17787238994";

/** Closing call-to-action: dark band with a faint drafting grid, a warm gold glow and a gradient headline.
 *  `living` adds the animated wireframe canvas behind the copy (homepage only). */
export default function CtaBand({ href = "/contact", label = "Request a Free Quote", living = false }: { href?: string; label?: string; living?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-[110px] text-center md:px-10">
      <div aria-hidden="true" className="mf-grid-bg absolute inset-0 opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(197,164,109,0.22),rgba(197,164,109,0.06)_55%,transparent)] blur-2xl"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      {living && <LivingBlueprint />}

      <motion.div
        className="relative mx-auto max-w-[760px]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="text-xs font-medium tracking-[2.5px] text-gold">GET IN TOUCH</span>
        <h2 className="m-0 mb-5 mt-5 font-heading text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.1] text-warm-white">
          Have a Project?
          <br />
          <span className="bg-gradient-to-r from-gold-pale via-gold to-gold-dark bg-clip-text text-transparent">Let&rsquo;s Frame It.</span>
        </h2>
        <p className="mx-auto m-0 mb-10 max-w-[520px] text-[15px] leading-[1.7] text-concrete">
          Tell us about your residential, commercial, or multi-family project and we&rsquo;ll get back to you within one business day.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.3, ease: EASE }}>
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-[0.3px] text-black shadow-[0_18px_40px_-16px_rgba(197,164,109,0.7)] transition-colors duration-300 ease-spring hover:bg-gold-pale"
            >
              {label} <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.3, ease: EASE }}>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full border border-warm-white/25 bg-warm-white/[0.04] px-7 py-4 text-sm font-medium tracking-[0.3px] text-warm-white backdrop-blur-sm transition-[border-color,color,background-color] duration-300 ease-spring hover:border-gold hover:bg-gold/10 hover:text-gold"
            >
              <ServiceIcon slug="phone" size={15} />
              Call {PHONE}
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
