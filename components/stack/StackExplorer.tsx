"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { levels, type Level, type TechGroup } from "@/data/technologies";
import { cn, ease } from "@/lib/utils";
import styles from "./StackExplorer.module.css";

const levelOf = (id: Level) => levels.find((l) => l.id === id)!;

export function StackExplorer({ groups }: { groups: TechGroup[] }) {
  const [active, setActive] = useState(groups[0].id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const group = groups.find((g) => g.id === active)!;
  const sorted = [...group.items].sort((a, b) => levelOf(b.level).weight - levelOf(a.level).weight);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = groups.length - 1;
    const map: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const id = groups[map[e.key]].id;
    setActive(id);
    refs.current[id]?.focus();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.side}>
        <div role="tablist" aria-label="Technology groups" aria-orientation="vertical" className={styles.groups}>
          {groups.map((g, i) => (
            <button
              key={g.id}
              ref={(el) => {
                refs.current[g.id] = el;
              }}
              role="tab"
              type="button"
              id={`stack-tab-${g.id}`}
              aria-selected={g.id === active}
              aria-controls="stack-panel"
              tabIndex={g.id === active ? 0 : -1}
              className={styles.group}
              onClick={() => setActive(g.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span>{g.title}</span>
              <span className={styles.groupCount}>{g.items.length}</span>
            </button>
          ))}
        </div>

        <dl className={styles.legend} aria-label="Proficiency key">
          {levels.map((l) => (
            <div key={l.id}>
              <dt>
                <Meter level={l.id} />
                {l.label}
              </dt>
              <dd>{l.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div id="stack-panel" role="tabpanel" aria-labelledby={`stack-tab-${active}`} className={styles.panel}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease }}
          >
            <p className={styles.summary}>{group.summary}</p>
            <ul role="list" className={styles.rows}>
              {sorted.map((t) => (
                <li key={t.name} className={styles.row} tabIndex={0} data-level={t.level}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.note}>{t.note}</span>
                  <span className={styles.level}>
                    <Meter level={t.level} />
                    <span className={styles.levelLabel}>{levelOf(t.level).label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Four ticks; filled count = level. Paired with a text label everywhere it appears. */
function Meter({ level }: { level: Level }) {
  const weight = levelOf(level).weight;
  return (
    <span className={styles.meter} aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className={cn(styles.tick, n <= weight && styles.on)} />
      ))}
    </span>
  );
}
