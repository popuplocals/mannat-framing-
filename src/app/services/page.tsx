import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ServiceSection from "@/components/services/ServiceSection";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Framing Services Surrey BC | Residential, Commercial & Multi-Family",
  description:
    "Mannat Framing provides residential, townhouse, multi-family & commercial framing in Surrey, BC. Excavation, pre-construction & concrete forming across the Lower Mainland. Call for a free quote.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="SERVICES"
        heading="Full-Service Framing & Construction in Surrey, BC."
        highlightWords={["Framing", "Construction"]}
        subtitle="Mannat Framing Ltd. handles every phase of your project — from pre-construction planning to final handover."
      />
      <div className="h-px bg-gold/30" />

      {SERVICES.map((s, i) => (
        <div key={s.slug} id={s.slug} className="scroll-mt-24">
          <ServiceSection service={s} flip={i % 2 === 1} />
          {i < SERVICES.length - 1 && (
            <div className="mx-auto max-w-[1440px] px-5 md:px-10">
              <div className="h-px bg-gold/30" />
            </div>
          )}
        </div>
      ))}

      <CtaBand />
    </>
  );
}
