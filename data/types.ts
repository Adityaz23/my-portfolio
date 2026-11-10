/**
 * A piece of copy that hasn't been written yet.
 *
 * Drafts render as a visible dashed note in `next dev` so you can see what's
 * missing, and are omitted entirely from production builds — visitors never
 * see placeholder text, and nothing is invented on your behalf.
 */
export interface Draft {
  draft: true;
  /** What to write here. */
  prompt: string;
}

export type Copy = string | Draft;

export const draft = (prompt: string): Draft => ({ draft: true, prompt });

export const isDraft = (value: unknown): value is Draft =>
  typeof value === "object" && value !== null && (value as Draft).draft === true;

export const showDrafts = process.env.NODE_ENV !== "production";
