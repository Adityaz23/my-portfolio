import type { CategoryId } from "@/data/projects";

/**
 * Lets the hero index (and anything else) switch the Selected Work tab
 * without lifting state into a global store.
 */
export const WORK_TAB_EVENT = "work:select";

export const isCategoryId = (v: unknown): v is CategoryId =>
  v === "software" || v === "ai" || v === "data";

export function selectWorkTab(id: CategoryId) {
  window.dispatchEvent(new CustomEvent<CategoryId>(WORK_TAB_EVENT, { detail: id }));
  const url = new URL(window.location.href);
  url.searchParams.set("tab", id);
  url.hash = "work";
  window.history.replaceState(null, "", url);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("work")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
}
