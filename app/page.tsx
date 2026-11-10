import { Hero, type HeroIndexLine } from "@/components/hero/Hero";
import { WorkSection } from "@/components/projects/WorkSection";
import { About } from "@/components/about/About";
import { Approach } from "@/components/about/Approach";
import { StackSection } from "@/components/stack/StackSection";
import { Contact } from "@/components/contact/Contact";
import { categories, projects, type CategoryId } from "@/data/projects";
import { profile } from "@/data/profile";

function countLabel(id: CategoryId) {
  const n = projects.filter((p) => p.category === id && !p.placeholder).length;
  if (n === 0) return "First projects in progress";
  return `${n} ${n === 1 ? "project" : "projects"}`;
}

const label = (id: CategoryId) => categories.find((c) => c.id === id)!.label;

const heroLines: HeroIndexLine[] = [
  { text: "Building software.", tab: "software", label: label("software"), detail: countLabel("software") },
  { text: "Exploring intelligence.", tab: "ai", label: label("ai"), detail: countLabel("ai") },
  { text: "Making data useful.", tab: "data", label: label("data"), detail: countLabel("data") },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  address: { "@type": "PostalAddress", addressCountry: "IN" },
  url: profile.siteUrl,
  sameAs: profile.socials.map((s) => s.href),
  knowsAbout: ["Full-stack development", "Large language models", "Retrieval-augmented generation", "Data analytics"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero lines={heroLines} />
      <WorkSection />
      <About />
      <Approach />
      <StackSection />
      <Contact />
    </>
  );
}
