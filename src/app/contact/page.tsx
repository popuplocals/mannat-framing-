import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";

export const metadata: Metadata = {
  title: "Get a Free Framing Quote | Mannat Framing Ltd. — Surrey, BC",
  description:
    "Request a free framing and construction quote from Mannat Framing Ltd. in Surrey, BC. Tell us about your project and we'll get back to you within one business day.",
};

const details = [
  { k: "PHONE", v: "(778) 723-8994", href: "tel:+17787238994" },
  { k: "EMAIL", v: "m.framing9@gmail.com", href: "mailto:m.framing9@gmail.com" },
  { k: "LOCATION", v: "Surrey, BC" },
];

export default function ContactPage() {
  return (
    <>
      {/* Map-backed "Visit Us" section */}
      <ContactMap />

      {/* Quote form */}
      <section id="form" className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr]">
        {/* LEFT: dark editorial panel */}
        <div className="relative flex flex-col justify-center overflow-hidden bg-black px-5 pb-[70px] pt-[90px] md:px-10 lg:pl-10 lg:pr-14 lg:pb-[90px] lg:pt-[110px]">
          <span className="absolute left-5 top-9 text-xs tracking-[1px] text-gold md:left-10">06</span>
          <span className="absolute bottom-[280px] left-5 top-10 w-px bg-gold/35 md:left-10" />
          <div>
            <Reveal index={0}>
              <div className="mb-[26px] flex items-center gap-[14px]">
                <span className="h-px w-[26px] bg-gold" />
                <span className="text-xs font-medium tracking-[2.5px] text-gold">CONTACT</span>
              </div>
            </Reveal>
            <Reveal index={1}>
              <h2 className="m-0 mb-7 max-w-[460px] font-heading text-[clamp(36px,5vw,58px)] font-extrabold leading-[1.08] text-warm-white">Get a Free Framing Quote.</h2>
            </Reveal>
            <Reveal index={2}>
              <p className="m-0 mb-14 max-w-[400px] text-[15px] leading-[1.8] text-concrete">Tell us about your project and we&rsquo;ll get back to you within one business day.</p>
            </Reveal>
          </div>
          <div className="flex max-w-[400px] flex-col gap-6 border-t border-gold/20 pt-9">
            {details.map((d, i) => (
              <Reveal key={d.k} index={i + 3} className="group flex items-baseline justify-between gap-4">
                <span className="text-[11px] font-medium tracking-[1.5px] text-gold-dark">{d.k}</span>
                {d.href ? (
                  <a href={d.href} className="text-[15px] text-warm-white transition-[color,transform] duration-300 ease-spring hover:translate-x-1 hover:text-gold active:text-gold">
                    {d.v}
                  </a>
                ) : (
                  <span className="text-[15px] text-warm-white">{d.v}</span>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT: floating form card */}
        <div className="relative flex items-center justify-center bg-warm-white px-5 py-[70px] md:px-10 lg:px-14 lg:py-[90px]">
          <Reveal index={2} scale={0.96} y={30} className="flex w-full justify-center">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <CtaBand href="#form" label="Request a Free Quote" />
    </>
  );
}
