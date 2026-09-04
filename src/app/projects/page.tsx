import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ProjectsGallery from "@/components/projects/ProjectsGallery";

export const metadata: Metadata = {
  title: "Projects | Mannat Framing Ltd. — Surrey, BC",
  description:
    "A visual look at Mannat Framing Ltd.'s residential, multi-family and commercial framing and construction work across Surrey and the Lower Mainland.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        corner="04"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        eyebrow="PROJECTS"
        heading="Building Quality. Delivering Results."
        highlightWords={["Results."]}
        subtitle="A glimpse into our recent framing and construction projects across the Lower Mainland."
      />
      <ProjectsGallery />
      <CtaBand />
    </>
  );
}
