"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile, social } from "@/data/profile";
import type { CategoryId } from "@/data/projects";
import { selectWorkTab } from "@/lib/work-tab";
import { ease } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import styles from "./Hero.module.css";

export interface HeroIndexLine {
  text: string;
  tab: CategoryId;
  label: string;
  detail: string;
}

/**
 * The hero headline doubles as an index of the work: each line opens the
 * matching tab in Selected Work.
 */
export function Hero({ lines }: { lines: HeroIndexLine[] }) {
  const github = social("github");
  const linkedin = social("linkedin");

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.gridlines} aria-hidden="true">
        <div className="container">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <motion.dl
          className={styles.meta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <div>
            <dt>Name</dt>
            <dd>{profile.name}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>
              {profile.role}, {profile.company}
            </dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd className={styles.status}>
              <span className={styles.dot} data-open={profile.status.open} aria-hidden="true" />
              {profile.status.label}
            </dd>
          </div>
        </motion.dl>

        <h1 id="hero-title" className={styles.headline}>
          <span className="visually-hidden">{profile.name}: </span>
          {lines.map((line, i) => (
            <a
              key={line.tab}
              href={`/?tab=${line.tab}#work`}
              className={styles.line}
              data-step={i}
              onClick={(e) => {
                e.preventDefault();
                selectWorkTab(line.tab);
              }}
            >
              <span className={styles.mask}>
                <motion.span
                  className={styles.lineText}
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease, delay: 0.25 + i * 0.12 }}
                >
                  {line.text}
                </motion.span>
              </span>
              <motion.span
                className={styles.lineMeta}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.75 + i * 0.12 }}
              >
                <ArrowDownRight size={16} aria-hidden="true" className={styles.lineArrow} />
                <span>
                  <span className={styles.lineLabel}>{line.label}</span>
                  <span className={styles.lineDetail}>{line.detail}</span>
                </span>
              </motion.span>
            </a>
          ))}
        </h1>

        <motion.div
          className={styles.lede}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.95 }}
        >
          <p className={styles.intro}>{profile.intro}</p>
          <div className={styles.actions}>
            <ButtonLink
              href="/#work"
              icon={<ArrowDownRight size={16} />}
              onClick={(e) => {
                e.preventDefault();
                selectWorkTab("software");
              }}
            >
              Explore my work
            </ButtonLink>
            <ButtonLink href={profile.resume} download variant="outline" icon={<ArrowDown size={16} />}>
              Download résumé
            </ButtonLink>
          </div>
          <ul className={styles.socials} role="list">
            <li>
              <a href={github.href} target="_blank" rel="noopener noreferrer">
                <GitHubIcon size={15} />
                <span className="draw-underline">GitHub</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={15} />
                <span className="draw-underline">LinkedIn</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.aside
          className={styles.colophon}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 1.15 }}
          aria-label="Currently working on"
        >
          <span className={styles.colophonLabel}>Currently</span>
          <p>{profile.currently}</p>
        </motion.aside>
      </div>
    </section>
  );
}
