"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./Contact.module.css";

/** Large mailto link with a copy-to-clipboard companion. */
export function EmailCopy({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className={styles.email}>
      <a href={`mailto:${email}`} className={styles.emailLink}>
        {email}
      </a>
      <button type="button" onClick={copy} className={styles.copy}>
        {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
      </button>
    </div>
  );
}
