import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, social } from "@/data/profile";
import { showDrafts } from "@/data/types";
import { SocialIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/animations/Reveal";
import { EmailCopy } from "./EmailCopy";
import styles from "./Contact.module.css";

export function Contact() {
  const linkedin = social("linkedin");

  return (
    <section id="contact" className={`section ${styles.section}`} aria-labelledby="contact-title">
      <div className="container">
        <p className={`label ${styles.label}`}>
          <span>05</span>
          <span>Contact</span>
        </p>

        <Reveal>
          <h2 id="contact-title" className={styles.headline}>
            Have something interesting to build?
          </h2>
        </Reveal>

        <div className={styles.grid}>
          <div className={styles.primary}>
            <p className={styles.lede}>
              I&apos;m open to roles, collaborations and good technical conversations — full-stack, LLM systems or
              data.
            </p>
            {profile.email ? (
              <EmailCopy email={profile.email} />
            ) : (
              <div className={styles.email}>
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className={styles.emailLink}>
                  Message me on LinkedIn
                </a>
                <p className={styles.fallback}>The quickest way to reach me.</p>
                {showDrafts && (
                  <span className="draft-note">Set profile.email in data/profile.ts to show your address here.</span>
                )}
              </div>
            )}
          </div>

          <ul className={styles.channels} role="list">
            {profile.socials.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.channel}>
                  <span className={styles.channelIcon}>
                    <SocialIcon id={s.id} size={18} />
                  </span>
                  <span className={styles.channelName}>{s.label}</span>
                  <span className={styles.channelHandle}>{s.handle}</span>
                  <ArrowUpRight size={18} className={styles.channelArrow} aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} download className={styles.channel}>
                <span className={styles.channelIcon} aria-hidden="true">
                  <ArrowDown size={18} />
                </span>
                <span className={styles.channelName}>Résumé</span>
                <span className={styles.channelHandle}>PDF</span>
                <ArrowDown size={18} className={styles.channelArrowDown} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
