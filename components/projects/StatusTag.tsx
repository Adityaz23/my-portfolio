import { statusLabel, type ProjectStatus } from "@/data/projects";
import styles from "./StatusTag.module.css";

export function StatusTag({ status }: { status: ProjectStatus }) {
  return (
    <span className={styles.tag} data-status={status}>
      <span className={styles.mark} aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}
