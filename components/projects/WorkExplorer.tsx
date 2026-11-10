"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Category, CategoryId, Project } from "@/data/projects";
import { WORK_TAB_EVENT, isCategoryId } from "@/lib/work-tab";
import { ease } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import styles from "./WorkExplorer.module.css";

export function WorkExplorer({
  categories,
  projects,
  initial = "software",
}: {
  categories: Category[];
  projects: Project[];
  initial?: CategoryId;
}) {
  const [active, setActive] = useState<CategoryId>(initial);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Deep links (?tab=ai) and hero index clicks.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("tab");
    if (isCategoryId(fromUrl)) setActive(fromUrl);
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent).detail;
      if (isCategoryId(id)) setActive(id);
    };
    window.addEventListener(WORK_TAB_EVENT, onSelect);
    return () => window.removeEventListener(WORK_TAB_EVENT, onSelect);
  }, []);

  const choose = useCallback((id: CategoryId) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    window.history.replaceState(null, "", url);
  }, []);

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = categories.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    const id = categories[next].id;
    choose(id);
    tabRefs.current[id]?.focus();
  };

  const current = categories.find((c) => c.id === active)!;
  const visible = projects.filter((p) => p.category === active);
  const published = visible.filter((p) => !p.placeholder);

  return (
    <div className={styles.explorer}>
      <LayoutGroup id="work-tabs">
        <div role="tablist" aria-label="Project categories" className={styles.tabs}>
          {categories.map((c, i) => {
            const count = projects.filter((p) => p.category === c.id && !p.placeholder).length;
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabRefs.current[c.id] = el;
                }}
                role="tab"
                id={`tab-${c.id}`}
                type="button"
                aria-selected={selected}
                aria-controls="work-panel"
                tabIndex={selected ? 0 : -1}
                className={styles.tab}
                onClick={() => choose(c.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.tabLabel}>{c.label}</span>
                <span className={styles.tabCount}>
                  {count > 0 ? String(count).padStart(2, "0") : "Soon"}
                </span>
                {selected && (
                  <motion.span
                    layoutId="tab-indicator"
                    className={styles.indicator}
                    transition={{ duration: 0.5, ease }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div
        id="work-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className={styles.panel}
        tabIndex={-1}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{ duration: 0.3 }}
          >
            <p className={styles.blurb}>
              {current.blurb}
              {published.length === 0 && visible.length > 0 && (
                <> The slots below are reserved and will be filled as projects are finished.</>
              )}
            </p>

            {visible.length === 0 ? (
              <EmptyState label={current.label} />
            ) : (
              <ul className={styles.grid} role="list">
                {visible.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    className={styles.item}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.06 * i }}
                  >
                    <ProjectCard project={p} />
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>Nothing published in {label} yet.</p>
      <p className={styles.emptyBody}>
        Work in this area is in progress. In the meantime, everything else I&apos;m building is on GitHub.
      </p>
      <a href="https://github.com/Adityaz23" target="_blank" rel="noopener noreferrer" className={styles.emptyLink}>
        Browse repositories on GitHub
      </a>
    </div>
  );
}
