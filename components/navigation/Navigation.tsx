"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { cn, ease } from "@/lib/utils";
import styles from "./Navigation.module.css";

const links = [
  { id: "top", label: "Home", href: "/" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "stack", label: "Stack", href: "/#stack" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export function Navigation() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("top");
  const menuButton = useRef<HTMLButtonElement>(null);

  // Background treatment once the page leaves the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view, for the active link.
  useEffect(() => {
    if (!onHome) return;
    const ids = links.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  // Mobile menu: lock scroll, close on Escape, return focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      menuButton.current?.focus();
    };
  }, [open]);

  const isActive = (id: string) => (onHome ? active === id : false);

  return (
    <>
    <header className={cn(styles.bar, (scrolled || open) && styles.scrolled)}>
      <nav className={cn("container", styles.inner)} aria-label="Primary">
        <Link href="/" className={styles.wordmark} aria-label={`${profile.name}, home`}>
          <span className={styles.mark}>{profile.monogram}</span>
          <span className={styles.wordName}>Aditya Kumar Soni</span>
        </Link>

        <ul className={styles.links} role="list">
          {links.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                className={cn(styles.link, isActive(l.id) && styles.active)}
                aria-current={isActive(l.id) ? "true" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <a href={profile.resume} download className={styles.resume}>
          Résumé
          <ArrowDown size={14} aria-hidden="true" />
        </a>

        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>
    </header>

    {/* Kept outside <header>: its backdrop-filter would otherwise trap this fixed sheet. */}
    <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.sheet}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease }}
          >
            <ul className={styles.sheetLinks} role="list">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.12 + i * 0.05 }}
                >
                  <Link href={l.href} onClick={() => setOpen(false)} className={styles.sheetLink}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className={styles.sheetFoot}>
              <a href={profile.resume} download className={styles.sheetResume}>
                Download résumé <ArrowDown size={16} aria-hidden="true" />
              </a>
              <div className={styles.sheetSocials}>
                {profile.socials.map((s) => (
                  <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}
