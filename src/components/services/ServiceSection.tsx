"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export type Service = {
  num: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  cta: string;
  photoLabel: string;
};

export default function ServiceSection({ service, flip = false }: { service: Service; flip?: boolean }) {
  const dir = flip ? -1 : 1;
  const copy = (
    <motion.div
      initial={{ opacity: 0, x: -24 * dir }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: EASE }}
      className={flip ? "lg:order-2" : ""}
    >
      <span className="mb-3 block font-heading text-[96px] font-extrabold leading-none text-gold/35">{service.num}</span>
      <h2 className="m-0 mb-6 font-heading text-[32px] font-extrabold leading-[1.25] text-black">{service.title}</h2>
      {service.paragraphs.map((p, i) => (
        <p key={i} className={`m-0 text-base leading-[1.8] text-ink-3 ${i === service.paragraphs.length - 1 ? "mb-8" : "mb-5"}`}>
          {p}
        </p>
      ))}
      <ul className="m-0 mb-9 flex list-none flex-col gap-[10px] p-0">
        {service.bullets.map((b, i) => (
          <motion.li
            key={b}
            className="flex gap-3 text-[15px] text-ink-3"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.06 }}
          >
            <span className="text-gold">&mdash;</span>
            {b}
          </motion.li>
        ))}
      </ul>
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.3, ease: EASE }} className="inline-block">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-[10px] border border-gold bg-black px-7 py-[15px] text-sm tracking-[0.3px] text-warm-white transition-[background-color,color,gap] duration-300 ease-spring hover:gap-4 hover:bg-gold hover:text-black active:bg-gold active:text-black"
        >
          {service.cta} <span aria-hidden="true">&rarr;</span>
        </Link>
      </motion.div>
    </motion.div>
  );

  const photo = (
    <motion.div
      initial={{ opacity: 0, x: 24 * dir, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
      className={`group h-[320px] overflow-hidden lg:h-[520px] ${flip ? "lg:order-1" : ""}`}
    >
      <div className="h-full transform-gpu will-change-transform transition-transform duration-[700ms] ease-spring group-hover:scale-[1.04]">
        <ImagePlaceholder label={service.photoLabel} light />
      </div>
    </motion.div>
  );

  return (
    <section className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-5 py-[70px] md:px-10 lg:grid-cols-2 lg:gap-[72px] lg:py-[110px]">
      {flip ? (
        <>
          {photo}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {photo}
        </>
      )}
    </section>
  );
}
