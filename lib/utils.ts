export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Shared easing so every animation on the site moves the same way. */
export const ease = [0.22, 1, 0.36, 1] as const;
