import type { Project } from "@/data/projects";
import styles from "./ProjectPlate.module.css";

/**
 * The project's visual. Until a real screenshot is added, each project is
 * shown as its architecture: the actual stages and tools, drawn as a
 * signal chain. Nothing on the plate is decorative or invented.
 */
export function ProjectPlate({ project, size = "card" }: { project: Project; size?: "card" | "large" }) {
  if (project.placeholder) {
    return (
      <div className={`${styles.plate} ${styles.empty}`} data-size={size} aria-hidden="true">
        <span className={styles.emptyMark}>Reserved</span>
        <span className={styles.emptyTools}>{project.stack.join(" / ")}</span>
      </div>
    );
  }

  return (
    <figure className={styles.plate} data-size={size}>
      <figcaption className={styles.caption}>
        <span>{project.slug}</span>
        <span>Architecture</span>
      </figcaption>
      <ol className={styles.chain} role="list">
        {project.pipeline.map((step, i) => (
          <li key={step.stage} className={styles.step} data-last={i === project.pipeline.length - 1}>
            <span className={styles.node} aria-hidden="true" />
            <span className={styles.stage}>{step.stage}</span>
            <span className={styles.tool}>{step.tool}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
