"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type Category = "Residential" | "Multi-Family" | "Commercial" | "Framing";
type Filter = "All" | Category;

type Project = {
  id: string;
  num: string;
  cat: Category;
  title: string;
  photo: string;
  span: string; // desktop grid placement
  size: "large" | "medium" | "small";
};

const filters: Filter[] = ["All", "Residential", "Multi-Family", "Commercial", "Framing"];

const projects: Project[] = [
  { id: "hero", num: "01", cat: "Residential", title: "Custom Home Framing", photo: "Drop a large residential framing project photo", span: "md:col-span-7 md:row-span-4", size: "large" },
  { id: "vertical1", num: "02", cat: "Multi-Family", title: "Multi-Family Development", photo: "Drop a multi-family construction photo", span: "md:col-span-5 md:row-span-4", size: "medium" },
  { id: "wide1", num: "03", cat: "Framing", title: "Structural Framing", photo: "Drop a wide framing / structural photo", span: "md:col-span-4 md:row-span-3", size: "small" },
  { id: "detail1", num: "04", cat: "Framing", title: "Structural Detail", photo: "Drop a structural detail close-up photo", span: "md:col-span-4 md:row-span-3", size: "small" },
  { id: "grid1", num: "05", cat: "Residential", title: "Concrete Forming", photo: "Drop a concrete forming photo", span: "md:col-span-4 md:row-span-3", size: "small" },
  { id: "grid2", num: "06", cat: "Commercial", title: "Site Preparation", photo: "Drop an excavation / site prep photo", span: "md:col-span-6 md:row-span-3", size: "medium" },
  { id: "grid3", num: "07", cat: "Commercial", title: "Commercial Build", photo: "Drop a commercial building project photo", span: "md:col-span-6 md:row-span-3", size: "medium" },
  { id: "vertical2", num: "08", cat: "Multi-Family", title: "Townhouse Complex", photo: "Drop a townhouse framing photo", span: "md:col-span-5 md:row-span-4", size: "medium" },
  { id: "wide2", num: "09", cat: "Residential", title: "Project Handover", photo: "Drop a completed project handover photo", span: "md:col-span-7 md:row-span-4", size: "large" },
];

const titleSize = { large: "text-2xl", medium: "text-xl", small: "text-base" } as const;

export default function ProjectsGallery() {
  const [active, setActive] = useState<Filter>("All");
  const visible = projects.filter((p) => active === "All" || p.cat === active);

  return (
    <LayoutGroup>
      {/* FILTER BAR */}
      <div className="z-10 border-b border-ink/[0.08] bg-surface/95 backdrop-blur-md md:sticky md:top-[68px]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap gap-x-9 px-5 md:px-10">
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={isActive}
                className={`relative cursor-pointer border-0 bg-transparent py-5 font-heading text-[13px] font-semibold tracking-[0.4px] transition-[color,transform] duration-300 ease-spring hover:-translate-y-0.5 hover:text-ink active:-translate-y-0.5 ${
                  isActive ? "text-ink" : "text-[#8a8a82]"
                }`}
              >
                {f}
                {isActive && (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-gold"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MOSAIC */}
      <div className="mx-auto max-w-[1440px] px-5 pb-[130px] pt-20 md:px-10">
        <motion.div layout className="grid grid-cols-1 auto-rows-[260px] gap-5 md:grid-cols-12 md:auto-rows-[140px]">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -6 }}
                whileTap={{ y: -4 }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                className={`group col-span-1 row-span-1 ${p.span}`}
              >
                <div className="relative h-full overflow-hidden shadow-[0_0_0_0_rgba(13,13,13,0)] transition-shadow duration-[450ms] ease-spring group-hover:shadow-lift">
                  <span className="absolute left-[18px] top-[18px] z-[2] bg-black/35 px-[10px] py-[5px] font-heading text-xs font-extrabold tracking-[1px] text-warm-white backdrop-blur-[6px]">
                    {p.num}
                  </span>
                  <div className="absolute inset-0 transform-gpu will-change-transform transition-transform duration-[600ms] ease-spring group-hover:scale-[1.05]">
                    <ImagePlaceholder label={p.photo} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(13,13,13,0.8)_0%,rgba(13,13,13,0)_40%)] transition-opacity duration-[450ms] ease-spring group-hover:opacity-90" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 transition-transform duration-[450ms] ease-spring group-hover:-translate-y-1 md:p-[26px]">
                    <span className="mb-2 block text-[11px] font-semibold tracking-[2px] text-gold">{p.cat.toUpperCase()}</span>
                    <span className={`font-heading font-extrabold text-warm-white ${titleSize[p.size]}`}>{p.title}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {visible.length === 0 && (
          <p className="py-20 text-center text-sm text-ink-2">No projects in this category yet.</p>
        )}
      </div>
    </LayoutGroup>
  );
}
