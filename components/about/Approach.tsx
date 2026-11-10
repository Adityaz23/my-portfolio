import { principles } from "@/data/experience";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Approach.module.css";

export function Approach() {
  return (
    <section id="approach" className={`section ${styles.section}`} aria-labelledby="approach-title">
      <div className="container">
        <SectionHeader index="03" label="Approach" id="approach-title" title="How I try to work.">
          <p>Habits I hold myself to, with the project where each one shows up.</p>
        </SectionHeader>

        <ul className={styles.list} role="list">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} className={styles.item} delay={(i % 2) * 0.06}>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.body}>{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
