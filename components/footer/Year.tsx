"use client";

import { useEffect, useState } from "react";

/**
 * Current year from the visitor's clock, so a statically built page never
 * shows a stale year. Server render uses build time; the client corrects it.
 */
export function Year() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <span suppressHydrationWarning>{year}</span>;
}
