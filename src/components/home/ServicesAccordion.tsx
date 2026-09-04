"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const services = [
  { num: "01", title: "Framing", desc: "Our crews are some of the most experienced framers in the Lower Mainland. We work alongside builders and developers on residential, multi-family and townhouse framing — putting them ahead of schedule with a beautifully framed project." },
  { num: "02", title: "General Construction", desc: "Full-service construction from ground up — concept and structural design through completion. Experienced team across all trades, with strict attention to quality, detail and deadlines." },
  { num: "03", title: "Project Management", desc: "Mannat Framing takes full ownership of your project timeline — coordinating trades, managing structural drawings, and overseeing every stage from pre-construction through handover. No surprises. Just results." },
  { num: "04", title: "Excavation & Site Prep", desc: "Complete site preparation services — from excavation and grading to trenching and earthwork — for residential lots and commercial sites across the Lower Mainland. Your site, ready to build." },
  { num: "05", title: "Pre-Construction", desc: "A successful project starts long before crews arrive on site. We get involved early to review scope, align budgets, read structural drawings, and build a realistic schedule — so everything runs smoothly from day one." },
  { num: "06", title: "Concrete Forming", desc: "Experienced in every type of forming system. Concrete forming for foundations, walls and structural elements — properly scheduled, budgeted and installed by experienced concrete crews." },
];

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const active = services[openIndex] ?? services[0];

  return (
    <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-[100px] md:px-10 lg:grid-cols-[0.7fr_1.4fr_1fr]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="text-xs font-medium tracking-[2.5px] text-gold-dark">WHAT WE DO</span>
        <h2 className="m-0 mb-[18px] mt-5 font-heading text-[30px] font-extrabold leading-[1.22] text-black">High Quality Construction Services.</h2>
        <p className="m-0 mb-[22px] text-sm leading-[1.7] text-ink-2">From framing and general construction to excavation and project management — all under one roof.</p>
        <Link href="/services" className="group inline-flex items-center gap-1 text-sm font-medium text-black transition-[gap,color] duration-300 ease-spring hover:gap-2 hover:text-gold-dark active:gap-2">
          View All Services <span aria-hidden="true">&rarr;</span>
        </Link>
      </motion.div>

      <div>
        {services.map((s, i) => {
          const open = i === openIndex;
          return (
            <motion.div
              key={s.num}
              className="border-b border-black/10 py-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="group flex w-full cursor-pointer items-center justify-between border-0 bg-transparent p-0 text-left text-inherit"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-heading text-sm font-bold text-gold">{s.num}</span>
                  <span className={`font-heading text-[17px] font-bold transition-[color,transform] duration-300 ease-spring group-hover:translate-x-1 ${open ? "text-black" : "text-black group-hover:text-gold-dark"}`}>
                    {s.title}
                  </span>
                </span>
                <motion.span
                  aria-hidden="true"
                  className="text-lg text-gold-dark"
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="m-0 ml-[42px] mt-3 max-w-[400px] text-[13px] leading-[1.7] text-ink-2">{s.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
      >
        <div className="h-[420px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.num}
              className="h-full"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <ImagePlaceholder label={`Drop a photo for: ${active.title}`} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-14 bg-black/55 px-[18px] py-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={active.num}
              className="block text-sm leading-[1.4] text-warm-white"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {active.title}
            </motion.span>
          </AnimatePresence>
        </div>
        <Link
          href="/services"
          aria-label="View all services"
          className="absolute bottom-0 right-0 flex h-14 w-14 items-center justify-center bg-gold text-[22px] text-black transition-[background-color,transform] duration-300 ease-spring hover:bg-gold-dark hover:scale-105 active:scale-95"
        >
          +
        </Link>
      </motion.div>
    </section>
  );
}
