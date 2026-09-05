export type Service = {
  slug: string;
  num: string;
  /** Short mono tag shown above the title in menus and cards */
  tag: string;
  /** Short name used in menus, cards and footers */
  title: string;
  /** Full page/section heading */
  heading: string;
  /** One-line summary used in the menu and detail hero */
  summary: string;
  paragraphs: string[];
  bullets: string[];
  cta: string;
  photo: string;
  photoLabel: string;
};

export const SERVICES: Service[] = [
  {
    slug: "framing",
    num: "01",
    tag: "Residential",
    title: "Framing",
    heading: "Residential & Multi-Family Framing Contractor.",
    summary: "Accurate, code-compliant wood framing for custom homes, duplexes, townhouses and low-rise multi-family — from sill plate to roof.",
    paragraphs: [
      "Whether you're building a custom home, a townhouse development, or a multi-unit residential complex, your project deserves a framing crew that gets it right the first time.",
      "At Mannat Framing Ltd., we specialize in residential wood framing for single-family homes, duplexes, multi-family developments, and townhouse complexes across Surrey and the Lower Mainland. Our carpenters are skilled in working with architectural and structural drawings to deliver accurate, code-compliant framing — from sill plate to roof.",
    ],
    bullets: ["Custom home framing", "Single-family residential framing", "Duplex framing", "Townhouse complex framing", "Low-rise multi-family framing", "Two-storey and flat roof framing", "Strata building framing"],
    cta: "Get a Quote for Framing",
    photo: "/assets/photos/services-residential-multifamily.jpg",
    photoLabel: "Townhouse framing in progress with a boom lift on site",
  },
  {
    slug: "general-construction",
    num: "02",
    tag: "Build Partner",
    title: "General Construction",
    heading: "General Construction Contractor — Surrey, BC.",
    summary: "Full-service construction from concept to completion for residential and commercial projects across the Lower Mainland.",
    paragraphs: [
      "From concept to completion, Mannat Framing delivers full-service general construction for residential and commercial projects across the Lower Mainland.",
      "Our in-house team handles every stage of the build — coordinating trades, managing timelines, and ensuring quality workmanship at every phase. Whether you're a homeowner, a developer, or a general contractor looking for a reliable build partner, we bring the experience and accountability your project demands.",
    ],
    bullets: ["New home construction", "Residential and commercial builds", "Multi-family developments", "End-to-end project delivery", "Structural and finish coordination"],
    cta: "Get a Construction Quote",
    photo: "/assets/photos/services-general-construction.jpg",
    photoLabel: "Three-storey wood-frame building under construction",
  },
  {
    slug: "project-management",
    num: "03",
    tag: "Coordination",
    title: "Project Management",
    heading: "Construction Project Management — Lower Mainland.",
    summary: "Trade coordination, structural drawing management, schedule tracking and clear communication from pre-construction to handover.",
    paragraphs: [
      "A successful build isn't just about skilled crews — it's about coordination, planning, and clear communication at every stage.",
      "Mannat Framing Ltd. provides experienced project management services for residential and commercial construction projects. We coordinate trades, manage structural drawings, track progress against schedule, and keep every stakeholder informed from pre-construction through final handover.",
    ],
    bullets: ["Overall project planning and scheduling", "Trade and subcontractor coordination", "Budget tracking and progress reporting", "Structural drawing review and management", "Site supervision and quality control", "Deficiency management and final handover"],
    cta: "Talk to Us About Project Management",
    photo: "/assets/photos/services-project-management.jpg",
    photoLabel: "Multi-family building with a tower crane on site",
  },
  {
    slug: "excavation-site-prep",
    num: "04",
    tag: "Site Work",
    title: "Excavation & Site Prep",
    heading: "Excavation & Site Prep — Surrey & Lower Mainland.",
    summary: "Complete excavation, grading, trenching and earthwork so your lot is ready before the framing crews arrive.",
    paragraphs: [
      "Every great build starts with proper site preparation. At Mannat Framing, we offer complete excavation and earthwork services for residential and commercial sites across the Lower Mainland — getting your lot ready before framing crews arrive.",
    ],
    bullets: ["Residential lot excavation", "Commercial site preparation", "Grading and levelling", "Trenching for utilities", "Earthwork and soil removal", "Site drainage preparation"],
    cta: "Get an Excavation Quote",
    photo: "/assets/photos/services-excavation.jpg",
    photoLabel: "Excavated and gravelled site with foundations poured",
  },
  {
    slug: "pre-construction",
    num: "05",
    tag: "Planning",
    title: "Pre-Construction",
    heading: "Pre-Construction Services — Surrey, BC.",
    summary: "Scope review, budget alignment, drawing review and realistic scheduling before crews break ground.",
    paragraphs: [
      "A well-planned project is a successful project. Our pre-construction team gets involved early — reviewing scope, aligning budgets, reading structural drawings, and building a schedule that works — so when crews break ground, everything runs smoothly.",
      "Early planning saves time and money. We help you avoid the costly surprises that come from rushing into construction without a proper pre-construction process.",
    ],
    bullets: ["Scope review and goal alignment", "Budget planning and cost analysis", "Structural drawing review", "Schedule development", "Trade coordination planning", "Permit and code review"],
    cta: "Start Your Pre-Construction Planning",
    photo: "/assets/photos/services-preconstruction.jpg",
    photoLabel: "Subfloor deck sheathed and ready for wall framing",
  },
  {
    slug: "concrete-forming",
    num: "06",
    tag: "Foundations",
    title: "Concrete Forming",
    heading: "Concrete Forming Contractor — Lower Mainland, BC.",
    summary: "Precise forming for foundations, walls, slabs and structural elements, built to BC Building Code with your engineers.",
    paragraphs: [
      "Experienced in every type of forming system, Mannat Framing delivers precise concrete forming for foundations, walls, and structural elements across residential and commercial projects in the Lower Mainland.",
      "Our concrete crews are experienced in BC Building Code requirements and work closely with structural engineers to ensure every pour is properly formed, scheduled, and executed.",
    ],
    bullets: ["Foundation forming", "Structural wall forming", "Retaining wall forming", "Slab and footing forming", "ICF (Insulated Concrete Form) projects", "Commercial structural forming"],
    cta: "Get a Forming Quote",
    photo: "/assets/photos/svc-concrete-forming.jpg",
    photoLabel: "Concrete foundation formwork on a residential lot",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
