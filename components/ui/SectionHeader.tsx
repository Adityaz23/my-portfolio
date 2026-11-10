import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import styles from "./SectionHeader.module.css";

/**
 * Every section opens the same way: an index label, a serif title on the
 * left, and an optional lede on the right.
 */
export function SectionHeader({
  index,
  label,
  title,
  id,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  id: string;
  children?: ReactNode;
}) {
  return (
    <Reveal as="header" className={styles.header}>
      <p className={`label ${styles.label}`}>
        <span>{index}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <div className={styles.lede}>{children}</div>}
    </Reveal>
  );
}
