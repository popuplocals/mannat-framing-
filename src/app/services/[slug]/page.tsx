import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ServiceSection from "@/components/services/ServiceSection";
import OtherServices from "@/components/services/OtherServices";
import { SERVICES, getService } from "@/lib/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.heading.replace(/\.$/, "")} | Mannat Framing Ltd.`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        corner={service.num}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow={service.tag.toUpperCase()}
        heading={service.heading}
        highlightWords={[service.title.split(" ")[0]]}
        subtitle={service.summary}
      />
      <div className="h-px bg-gold/30" />
      <ServiceSection service={service} detail />
      <OtherServices current={service.slug} />
      <CtaBand label={service.cta} />
    </>
  );
}
