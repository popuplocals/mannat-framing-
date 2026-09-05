import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/services";

/** Grid of the remaining services, shown at the bottom of every service detail page. */
export default function OtherServices({ current }: { current: string }) {
  const others = SERVICES.filter((s) => s.slug !== current);
  return (
    <section className="border-t border-gold/20 bg-charcoal px-5 py-[90px] md:px-10">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <span className="text-xs font-medium tracking-[2.5px] text-gold">MORE FROM MANNAT FRAMING</span>
          <h2 className="m-0 mb-10 mt-4 font-heading text-[28px] font-extrabold leading-[1.22] text-warm-white">Other Services.</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((s, i) => (
            <Reveal key={s.slug} index={i} y={18}>
              <Link
                href={`/services/${s.slug}`}
                className="group/item flex h-full items-center gap-4 border border-gold/20 bg-black/40 p-4 transition-[border-color,background-color,transform,box-shadow] duration-300 ease-spring hover:-translate-y-1 hover:border-gold/60 hover:bg-black/70 hover:shadow-lift active:-translate-y-1 active:border-gold/60"
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden">
                  <Image src={s.photo} alt="" fill sizes="56px" className="object-cover transition-transform duration-500 ease-spring group-hover/item:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[9.5px] font-medium uppercase tracking-[1.4px] text-gold">{s.tag}</span>
                  <span className="mt-0.5 block font-heading text-sm font-bold text-warm-white transition-colors duration-300 group-hover/item:text-gold">{s.title}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
