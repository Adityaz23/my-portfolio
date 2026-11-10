import { categories, projects } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkExplorer } from "./WorkExplorer";

export function WorkSection() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader index="01" label="Selected work" id="work-title" title="Things I've built, and how.">
          <p>
            Each project opens into a case study: the problem, the architecture, and the decisions behind it.
            Diagrams show the real pipeline of each system.
          </p>
        </SectionHeader>
        <WorkExplorer categories={categories} projects={projects} />
      </div>
    </section>
  );
}
