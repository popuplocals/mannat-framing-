import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import CtaBand from "@/components/CtaBand";
import Preloader from "@/components/Preloader";
import ServicesAccordion from "@/components/home/ServicesAccordion";
import { HeroFade, HeroParallax } from "@/components/home/HeroMotion";

const stats = [
  { num: "10+", label: "Years in Business" },
  { num: "200+", label: "Projects Delivered" },
  { num: "15+", label: "Cities Served" },
  { num: "6", label: "Service Divisions" },
];

const whyPoints = [
  { t: "10+ Years of Experience", d: "Over a decade framing projects across Surrey, Langley, Burnaby, and the Lower Mainland." },
  { t: "Licensed & Fully Insured", d: "Complete peace of mind on every project, big or small." },
  { t: "BC Building Code Compliant", d: "Every project meets provincial standards, including seismic and shear wall requirements." },
  { t: "On-Time Delivery", d: "Our crews coordinate with your trades to keep the build moving — always on schedule." },
];

const steps = [
  {
    t: "Pre-Construction",
    d: "Goal alignment, scope review, budgeting and scheduling before crews arrive on site.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 3h6v2H9z" fill="#927545" stroke="none" /><path d="M8 10h8M8 14h8M8 18h5" /></svg>
    ),
  },
  {
    t: "Site Preparation",
    d: "Excavation, grading and earthwork completed and inspected before framing begins.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><path d="M4 20h16" /><path d="M6 20V9l6-4 6 4v11" /><path d="M10 20v-6h4v6" /></svg>
    ),
  },
  {
    t: "Build Phase",
    d: "Forming, framing and trades coordination supervised by experienced project managers.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><path d="M3 21l7-7" /><path d="M9 15l2-6 8 8-6 2z" /><path d="M13 5l2 2" /><path d="M16 3l2 2" /></svg>
    ),
  },
  {
    t: "Handover",
    d: "Final walk-through, deficiency review and a clean completed project handed to the client.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#927545" strokeWidth="1.5"><path d="M8 12l-4 1 1 4" /><path d="M4 13c2 3 5 5 8 5s6-2 8-5" /><path d="M16 12l4 1-1 4" /><circle cx="12" cy="7" r="3" /></svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="pb-16 md:pb-0">
      <Preloader />

      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-black">
        <HeroParallax>
          <Image src="/assets/hero-framing.jpg" alt="Timber framing under construction in Surrey, BC" fill priority sizes="100vw" className="object-cover" />
        </HeroParallax>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(95deg,#0D0D0D_28%,rgba(13,13,13,0.55)_55%,rgba(13,13,13,0.1)_100%)]" />
        <span className="absolute left-5 top-9 text-xs tracking-[1px] text-gold md:left-10">01</span>
        <span className="absolute bottom-[110px] left-5 top-10 w-px bg-gold/35 md:left-10" />
        <span className="absolute bottom-[110px] left-1 hidden rotate-180 text-[11px] tracking-[2px] text-concrete [writing-mode:vertical-rl] md:block md:left-4">FRAME / BUILD</span>
        <span className="absolute right-4 top-[110px] hidden text-[11px] tracking-[2px] text-concrete [writing-mode:vertical-rl] md:block md:right-9">SUR / BC</span>

        <HeroFade>
        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10">
          <div className="max-w-[620px] py-24 md:pl-6">
            <Reveal index={0}>
              <span className="mb-[26px] block text-[13px] tracking-[1px] text-gold">Framing &middot; Construction &middot; Lower Mainland, BC</span>
            </Reveal>
            <Reveal index={1}>
              <h1 className="m-0 mb-[26px] font-heading text-[clamp(42px,6vw,68px)] font-extrabold leading-[1.08] text-warm-white">
                Building
                <br />
                Surrey&rsquo;s Future.
              </h1>
            </Reveal>
            <Reveal index={2}>
              <p className="m-0 mb-10 max-w-[440px] text-base leading-[1.7] text-concrete">
                Mannat Framing Ltd. is a licensed framing contractor in Surrey, BC — delivering residential, multi-family, and commercial framing across the Lower Mainland for over 10 years.
              </p>
            </Reveal>
            <Reveal index={3}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-gold px-7 py-[15px] text-sm tracking-[0.3px] text-black shadow-[0_18px_40px_-16px_rgba(197,164,109,0.7)] transition-[background-color,transform,box-shadow] duration-300 ease-spring hover:scale-[1.04] hover:bg-gold-dark active:scale-[0.97]"
                >
                  Start a Project
                </Link>
                <Link
                  href="/services"
                  className="inline-block border border-warm-white/40 px-7 py-[15px] text-sm tracking-[0.3px] text-warm-white transition-[border-color,color,transform] duration-300 ease-spring hover:-translate-y-0.5 hover:border-gold hover:text-gold active:-translate-y-0.5 active:border-gold"
                >
                  Our Services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        </HeroFade>

        <div className="absolute bottom-[34px] left-0 right-0 flex flex-col items-center gap-2">
          <span className="text-[11px] tracking-[2px] text-concrete">SCROLL TO EXPLORE</span>
          <span className="animate-subtle-pulse text-sm text-gold">&#8595;</span>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-gold/15 bg-black">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 px-5 py-16 md:grid-cols-4 md:px-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} index={i} className="text-center md:border-r md:border-gold/20 md:last:border-r-0">
              <CountUp value={s.num} className="block font-heading text-[40px] font-extrabold text-gold" />
              <div className="mt-2 text-sm text-concrete">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <ServicesAccordion />

      {/* WHY US */}
      <section className="bg-black">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-14 px-5 py-[100px] md:px-10 lg:grid-cols-[0.8fr_1.1fr_0.7fr]">
          <Reveal className="group h-[480px] overflow-hidden">
            <Image
              src="/assets/photos/whyus-roof-trusses.jpg"
              alt="Roof trusses assembled on a Mannat Framing job site"
              width={1200}
              height={1600}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-[700ms] ease-spring group-hover:scale-105"
            />
          </Reveal>
          <div>
            <Reveal>
              <span className="text-xs font-medium tracking-[2.5px] text-gold">WHY MANNAT FRAMING</span>
              <h2 className="m-0 mb-9 mt-5 font-heading text-[32px] font-extrabold leading-[1.22] text-warm-white">Built on Trust &amp; Craft.</h2>
            </Reveal>
            <div className="flex flex-col gap-[26px]">
              {whyPoints.map((p, i) => (
                <Reveal key={p.t} index={i + 1} className="group flex items-start gap-4">
                  <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-gold-dark text-[11px] text-gold transition-[background-color,color,transform] duration-[400ms] ease-spring group-hover:scale-110 group-hover:bg-gold group-hover:text-black">
                    &#10003;
                  </span>
                  <div>
                    <div className="mb-[5px] font-heading text-[15px] font-bold text-warm-white">{p.t}</div>
                    <div className="text-[13px] leading-[1.6] text-concrete">{p.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal index={2} scale={0.95} className="border border-gold/40 p-[32px_26px] transition-[border-color,box-shadow] duration-[400ms] ease-spring hover:border-gold hover:shadow-card">
            <div className="mb-[22px] border-b border-gold/30 pb-[22px]">
              <CountUp value="200+" className="block font-heading text-[38px] font-extrabold text-gold" />
              <div className="mt-1.5 text-[13px] text-concrete">Projects delivered across the Lower Mainland</div>
            </div>
            <div className="mb-[22px] border-b border-gold/30 pb-[22px]">
              <CountUp value="15+" className="block font-heading text-[38px] font-extrabold text-gold" />
              <div className="mt-1.5 text-[13px] text-concrete">Cities served in Greater Vancouver &amp; BC</div>
            </div>
            <div className="text-xs leading-[1.7] text-concrete">Headquartered in Surrey, BC — partnering with homeowners, builders, and developers since 2014.</div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-surface px-5 py-[100px] md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <span className="text-xs font-medium tracking-[2.5px] text-accent">HOW WE WORK</span>
            <h2 className="m-0 mb-[14px] mt-5 max-w-[600px] font-heading text-[32px] font-extrabold leading-[1.22] text-ink">A Clear Process, Plan to Handover.</h2>
            <p className="m-0 mb-16 max-w-[520px] text-sm text-ink-2">Each engagement follows the same four phases so clients know what to expect at every stage.</p>
          </Reveal>
          <div className="relative grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-7 lg:grid-cols-4">
            <div aria-hidden="true" className="absolute left-[6%] right-[6%] top-8 hidden h-px bg-[repeating-linear-gradient(90deg,#C5A46D_0_8px,transparent_8px_16px)] lg:block" />
            {steps.map((s, i) => (
              <Reveal key={s.t} index={i} className="group relative z-[1] text-center">
                <div className="mx-auto mb-[18px] flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-surface transition-[border-color,transform,box-shadow] duration-[400ms] ease-spring group-hover:scale-110 group-hover:border-gold group-hover:shadow-card">
                  {s.icon}
                </div>
                <div className="mb-2 font-heading text-[13px] font-bold text-gold">0{i + 1}</div>
                <div className="mb-2 font-heading text-[15px] font-bold">{s.t}</div>
                <div className="mx-auto max-w-[190px] text-xs leading-[1.6] text-ink-2">{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS TEASER */}
      <section className="bg-black px-5 py-[100px] md:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-[0.75fr_1.7fr]">
          <Reveal>
            <span className="text-xs font-medium tracking-[2.5px] text-gold">PROJECTS</span>
            <h2 className="m-0 mb-[18px] mt-5 font-heading text-[30px] font-extrabold leading-[1.22] text-warm-white">Building Quality. Delivering Results.</h2>
            <p className="m-0 mb-[22px] text-sm leading-[1.7] text-concrete">A glimpse into our recent framing and construction projects across the Lower Mainland.</p>
            <Link href="/projects" className="inline-flex items-center gap-1 text-sm font-medium text-warm-white transition-[gap,color] duration-300 ease-spring hover:gap-2 hover:text-gold active:gap-2">
              View All Projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-[14px] md:h-[380px] md:grid-cols-[1.2fr_1fr]">
            <Reveal index={1} className="group h-[220px] min-h-0 overflow-hidden md:h-full">
              <div className="relative h-full transform-gpu transition-transform duration-[600ms] ease-spring group-hover:scale-[1.04]">
                <Image src="/assets/photos/teaser-townhouse-row.jpg" alt="Row of framed townhouses" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <div className="grid min-h-0 grid-rows-[1fr_1fr] gap-[14px] overflow-hidden">
              <Reveal index={2} className="group h-[220px] min-h-0 overflow-hidden md:h-auto">
                <div className="relative h-full transform-gpu transition-transform duration-[600ms] ease-spring group-hover:scale-[1.04]">
                  <Image src="/assets/photos/teaser-concrete-forms.jpg" alt="Concrete foundation formwork" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
              <div className="grid min-h-0 grid-cols-2 gap-[14px] overflow-hidden">
                <Reveal index={3} className="group h-[160px] min-h-0 overflow-hidden md:h-auto">
                  <div className="relative h-full transform-gpu transition-transform duration-[600ms] ease-spring group-hover:scale-[1.04]">
                    <Image src="/assets/photos/svc-general-construction.jpg" alt="Five-storey wood-frame multi-family building" fill sizes="(min-width: 1024px) 15vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
                <Reveal index={4} className="group h-[160px] min-h-0 overflow-hidden md:h-auto">
                  <div className="relative h-full transform-gpu transition-transform duration-[600ms] ease-spring group-hover:scale-[1.04]">
                    <Image src="/assets/photos/svc-excavation-site.jpg" alt="Excavated site prepared for framing" fill sizes="(min-width: 1024px) 15vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-black px-5 py-[14px] md:hidden">
        <Link href="/contact" className="block bg-gold py-[14px] text-center text-sm tracking-[0.3px] text-black transition-transform duration-300 ease-spring active:scale-[0.98]">
          Get a Free Quote
        </Link>
      </div>
    </div>
  );
}
