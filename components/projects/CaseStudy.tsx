import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, publishedProjects, type Project } from "@/data/projects";
import { isDraft, showDrafts, type Copy } from "@/data/types";
import { GitHubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectPlate } from "./ProjectPlate";
import { StatusTag } from "./StatusTag";
import styles from "./CaseStudy.module.css";

/** Groups consecutive "- " lines into lists; drafts render only in dev. */
function Body({ blocks }: { blocks: Copy[] }) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(
        <ul key={`l${out.length}`} className={styles.list}>
          {list.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  blocks.forEach((b, i) => {
    if (isDraft(b)) {
      flush();
      if (showDrafts) out.push(<p key={`d${i}`} className="draft-note">{b.prompt}</p>);
      return;
    }
    if (b.startsWith("- ")) {
      list.push(b.slice(2));
      return;
    }
    flush();
    out.push(<p key={`p${i}`}>{b}</p>);
  });
  flush();
  return <>{out}</>;
}

export function CaseStudy({ project }: { project: Project }) {
  const category = categories.find((c) => c.id === project.category)!;
  const visibleSections = project.caseStudy.filter((s) => showDrafts || s.body.some((b) => !isDraft(b)));
  const index = publishedProjects.findIndex((p) => p.slug === project.slug);
  const next = publishedProjects[(index + 1) % publishedProjects.length];

  return (
    <article id="top" className={styles.page}>
      <div className="container">
        <Link href={`/?tab=${project.category}#work`} className={styles.back}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="draw-underline">All work</span>
        </Link>

        <header className={styles.header}>
          <p className={`label ${styles.label}`}>
            <span>Case study</span>
            <span>{category.label}</span>
          </p>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>

          <dl className={styles.meta}>
            <div>
              <dt>Status</dt>
              <dd>
                <StatusTag status={project.status} />
              </dd>
            </div>
            {project.year && (
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            <div className={styles.metaWide}>
              <dt>Stack</dt>
              <dd>{project.stack.join(", ")}</dd>
            </div>
            <div>
              <dt>Links</dt>
              <dd className={styles.links}>
                {project.repo ? (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon size={14} /> <span className="draw-underline">Repository</span>
                  </a>
                ) : (
                  <span className={styles.pending}>Repository link coming soon</span>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <span className="draw-underline">Live demo</span> <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </header>

        <Reveal className={styles.visual}>
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="100vw"
              priority
            />
          ) : (
            <ProjectPlate project={project} size="large" />
          )}
        </Reveal>

        <div className={styles.sections}>
          {visibleSections.map((s) => (
            <section key={s.id} className={styles.section} aria-labelledby={`cs-${s.id}`}>
              <h2 id={`cs-${s.id}`} className={styles.sectionTitle}>
                {s.title}
              </h2>
              <div className={styles.prose}>
                <Body blocks={s.body} />
              </div>
            </section>
          ))}
        </div>

        {next && next.slug !== project.slug && (
          <Link href={`/work/${next.slug}`} className={styles.next}>
            <span className={styles.nextLabel}>Next case study</span>
            <span className={styles.nextTitle}>
              {next.title}
              <ArrowRight className={styles.nextArrow} aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
