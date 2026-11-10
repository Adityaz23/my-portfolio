import { profile } from "@/data/profile";
import { Year } from "./Year";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.name}>
          © <Year /> {profile.name}
        </p>
        <ul className={styles.links} role="list">
          {profile.socials.map((s) => (
            <li key={s.id}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="draw-underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.signoff}>
          <span>Hand-built with Next.js &amp; TypeScript.</span>
          <a href="#top" className={styles.top}>
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  );
}
