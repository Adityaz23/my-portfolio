import { techGroups } from "@/data/technologies";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StackExplorer } from "./StackExplorer";

export function StackSection() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeader index="04" label="Stack" id="stack-title" title="What I work with, honestly rated.">
          <p>
            Four levels, from tools I use every day to areas I&apos;ve only started exploring. Hover a row for what I
            use it for.
          </p>
        </SectionHeader>
        <StackExplorer groups={techGroups} />
      </div>
    </section>
  );
}
