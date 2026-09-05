import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ServiceSection, { type Service } from "@/components/services/ServiceSection";

export const metadata: Metadata = {
  title: "Framing Services Surrey BC | Residential, Commercial & Multi-Family",
  description:
    "Mannat Framing provides residential, townhouse, multi-family & commercial framing in Surrey, BC. Excavation, pre-construction & concrete forming across the Lower Mainland. Call for a free quote.",
};

const services: Service[] = [
  {
    num: "01",
    title: "Residential & Multi-Family Framing Contractor.",
    paragraphs: [
      "Whether you're building a custom home, a townhouse development, or a multi-unit residential complex, your project deserves a framing crew that gets it right the first time.",
      "At Mannat Framing Ltd., we specialize in residential wood framing for single-family homes, duplexes, multi-family developments, and townhouse complexes across Surrey and the Lower Mainland. Our carpenters are skilled in working with architectural and structural drawings to deliver accurate, code-compliant framing — from sill plate to roof.",
    ],
    bullets: ["Custom home framing", "Single-family residential framing", "Duplex framing", "Townhouse complex framing", "Low-rise multi-family framing", "Two-storey and flat roof framing", "Strata building framing"],
    cta: "Get a Quote for Framing",
    photoLabel: "Townhouse framing in progress with a boom lift on site",
    photo: "/assets/photos/services-residential-multifamily.jpg",
  },
  {
    num: "02",
    title: "General Construction Contractor — Surrey, BC.",
    paragraphs: [
      "From concept to completion, Mannat Framing delivers full-service general construction for residential and commercial projects across the Lower Mainland.",
      "Our in-house team handles every stage of the build — coordinating trades, managing timelines, and ensuring quality workmanship at every phase. Whether you're a homeowner, a developer, or a general contractor looking for a reliable build partner, we bring the experience and accountability your project demands.",
    ],
    bullets: ["New home construction", "Residential and commercial builds", "Multi-family developments", "End-to-end project delivery", "Structural and finish coordination"],
    cta: "Get a Construction Quote",
    photoLabel: "Three-storey wood-frame building under construction",
    photo: "/assets/photos/services-general-construction.jpg",
  },
  {
    num: "03",
    title: "Construction Project Management — Lower Mainland.",
    paragraphs: [
      "A successful build isn't just about skilled crews — it's about coordination, planning, and clear communication at every stage.",
      "Mannat Framing Ltd. provides experienced project management services for residential and commercial construction projects. We coordinate trades, manage structural drawings, track progress against schedule, and keep every stakeholder informed from pre-construction through final handover.",
    ],
    bullets: ["Overall project planning and scheduling", "Trade and subcontractor coordination", "Budget tracking and progress reporting", "Structural drawing review and management", "Site supervision and quality control", "Deficiency management and final handover"],
    cta: "Talk to Us About Project Management",
    photoLabel: "Multi-family building with a tower crane on site",
    photo: "/assets/photos/services-project-management.jpg",
  },
  {
    num: "04",
    title: "Excavation & Site Prep — Surrey & Lower Mainland.",
    paragraphs: [
      "Every great build starts with proper site preparation. At Mannat Framing, we offer complete excavation and earthwork services for residential and commercial sites across the Lower Mainland — getting your lot ready before framing crews arrive.",
    ],
    bullets: ["Residential lot excavation", "Commercial site preparation", "Grading and levelling", "Trenching for utilities", "Earthwork and soil removal", "Site drainage preparation"],
    cta: "Get an Excavation Quote",
    photoLabel: "Excavated and gravelled site with foundations poured",
    photo: "/assets/photos/services-excavation.jpg",
  },
  {
    num: "05",
    title: "Pre-Construction Services — Surrey, BC.",
    paragraphs: [
      "A well-planned project is a successful project. Our pre-construction team gets involved early — reviewing scope, aligning budgets, reading structural drawings, and building a schedule that works — so when crews break ground, everything runs smoothly.",
      "Early planning saves time and money. We help you avoid the costly surprises that come from rushing into construction without a proper pre-construction process.",
    ],
    bullets: ["Scope review and goal alignment", "Budget planning and cost analysis", "Structural drawing review", "Schedule development", "Trade coordination planning", "Permit and code review"],
    cta: "Start Your Pre-Construction Planning",
    photoLabel: "Subfloor deck sheathed and ready for wall framing",
    photo: "/assets/photos/services-preconstruction.jpg",
  },
  {
    num: "06",
    title: "Concrete Forming Contractor — Lower Mainland, BC.",
    paragraphs: [
      "Experienced in every type of forming system, Mannat Framing delivers precise concrete forming for foundations, walls, and structural elements across residential and commercial projects in the Lower Mainland.",
      "Our concrete crews are experienced in BC Building Code requirements and work closely with structural engineers to ensure every pour is properly formed, scheduled, and executed.",
    ],
    bullets: ["Foundation forming", "Structural wall forming", "Retaining wall forming", "Slab and footing forming", "ICF (Insulated Concrete Form) projects", "Commercial structural forming"],
    cta: "Get a Forming Quote",
    photoLabel: "Concrete foundation formwork on a residential lot",
    photo: "/assets/photos/svc-concrete-forming.jpg",
  },
];

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

      {services.map((s, i) => (
        <div key={s.num}>
          <ServiceSection service={s} flip={i % 2 === 1} />
          {i < services.length - 1 && (
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
