import { isDraft, showDrafts, type Copy } from "@/data/types";

/**
 * Renders a piece of copy. Drafts show as a dashed note in development
 * and render nothing in production.
 */
export function Text({
  value,
  as: Tag = "span",
  className,
}: {
  value: Copy;
  as?: "span" | "p" | "div";
  className?: string;
}) {
  if (isDraft(value)) {
    if (!showDrafts) return null;
    return <Tag className={`draft-note ${className ?? ""}`}>{value.prompt}</Tag>;
  }
  return <Tag className={className}>{value}</Tag>;
}

/** True when a piece of copy has real content for visitors. */
export const hasContent = (value: Copy) => !isDraft(value) && value.trim().length > 0;
