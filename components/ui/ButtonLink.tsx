import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";
import styles from "./ButtonLink.module.css";

interface Props {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  icon?: ReactNode;
  download?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

/** The site's only button shape. Arrow/icon nudges on hover. */
export function ButtonLink({ href, children, variant = "solid", icon, download, className, onClick }: Props) {
  const cls = cn(styles.button, styles[variant], className);
  const inner = (
    <>
      <span>{children}</span>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
    </>
  );

  if (isExternal(href) || download) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(download ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {inner}
    </Link>
  );
}
