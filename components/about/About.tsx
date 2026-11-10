import { timeline } from "@/data/experience";
import { showDrafts } from "@/data/types";
import { profile } from "@/data/profile";
import { Text } from "@/components/ui/Draft";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./About.module.css";

/** Edit the About copy here — it is written to be read aloud without cringing. */
const paragraphs = [
  "I started on the web and kept going down the stack: components, then the servers behind them, then the databases behind those. Along the way the question changed from “which library does this?” to “what is this library actually doing?” I'd rather understand a request's whole path than paste in a fix I can't explain.",
  "Language models pulled me further in. Building retrieval pipelines — chunking audio, embedding text, deciding what context a model gets to see — turned out to be ordinary engineering with unusual failure modes, and I enjoy it for exactly that reason.",
  "Data is where I'm heading next. Most of what I build produces or consumes data, so I'm learning to analyse it properly: SQL, pandas, exploratory analysis, and enough statistics to tell a real pattern from noise.",
];

export function About() {
  const entries = timeline.filter((e) => showDrafts || !e.draftEntry);

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader index="02" label="About" id="about-title" title="I like knowing what happens underneath." />

        <div className={styles.grid}>
          <Reveal className={styles.identity}>
            <p className={styles.kicker}>{profile.name}</p>
            <ul role="list" className={styles.roles}>
              {profile.identities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>

          <div className={styles.prose}>
            {paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className={styles.timelineWrap}>
          <h3 className={styles.timelineTitle}>Experience</h3>
          <ol className={styles.timeline} role="list">
            {entries.map((e, i) => (
              <Reveal as="li" key={e.title} className={styles.entry} delay={i * 0.06}>
                <div className={styles.period}>
                  {e.current && <span className={styles.now}>Now</span>}
                  <Text value={e.period} />
                </div>
                <div className={styles.entryMain}>
                  <p className={styles.entryTitle}>{e.title}</p>
                  <p className={styles.org}>{e.org}</p>
                </div>
                <Text value={e.body} as="p" className={styles.entryBody} />
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
