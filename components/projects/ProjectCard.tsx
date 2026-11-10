import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { categories, type Project } from "@/data/projects";
import { GitHubIcon } from "@/components/ui/icons";
import { ProjectPlate } from "./ProjectPlate";
import { StatusTag } from "./StatusTag";
import styles from "./ProjectCard.module.css";

/**
 * The whole card opens the case study (stretched title link); the
 * repository and demo links sit above it and stay independently clickable.
 */
export function ProjectCard({ project }: { project: Project }) {
  const category = categories.find((c) => c.id === project.category)!;
  const href = `/work/${project.slug}`;
  const isSlot = !!project.placeholder;

  return (
    <article className={styles.card} data-slot={isSlot || undefined}>
      <div className={styles.media}>
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(max-width: 760px) 100vw, 50vw"
            className={styles.image}
          />
        ) : (
          <ProjectPlate project={project} />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.topline}>
          <span>{category.short}</span>
          <StatusTag status={project.status} />
        </div>

        <h3 className={styles.title}>
          {isSlot ? (
            project.title
          ) : (
            <Link href={href} className={styles.stretch}>
              {project.title}
            </Link>
          )}
        </h3>

        <p className={styles.summary}>{project.summary}</p>

        <ul className={styles.stack} role="list" aria-label="Technologies">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        {!isSlot && (
          <div className={styles.footer}>
            <span className={styles.read} aria-hidden="true">
              Read case study <ArrowRight size={15} className={styles.readArrow} />
            </span>
            <span className={styles.ext}>
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={styles.extLink}>
                  <GitHubIcon size={14} />
                  Code
                  <span className="visually-hidden"> for {project.title} on GitHub</span>
                </a>
              ) : (
                <span className={styles.pending}>Repository soon</span>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.extLink}>
                  Live
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className="visually-hidden"> demo of {project.title}</span>
                </a>
              )}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
