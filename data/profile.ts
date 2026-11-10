/**
 * Personal details. Everything visitors read about you that isn't a project,
 * a technology, or a timeline entry lives here.
 *
 * Fields marked TODO are deliberately empty — the UI hides or softens them
 * until you fill them in, so nothing broken ships.
 */

export type SocialId = "github" | "linkedin" | "codeberg";

export interface Social {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
}

export interface Profile {
  name: string;
  firstName: string;
  monogram: string;
  role: string;
  company: string;
  location: string;
  identities: string[];
  /** Static, hand-edited availability. Not a live indicator. */
  status: { label: string; open: boolean };
  /** TODO: add your professional email. While null, the contact section points to LinkedIn. */
  email: string | null;
  /** Replace public/resume.pdf with your real résumé. */
  resume: string;
  /** TODO: set to your deployed domain — used for SEO metadata, sitemap and Open Graph. */
  siteUrl: string;
  /** One honest line about what you're working on now. */
  currently: string;
  intro: string;
  description: string;
  socials: Social[];
}

export const profile: Profile = {
  name: "Aditya Kumar Soni",
  firstName: "Aditya",
  monogram: "AKS",
  role: "Software Development Intern",
  company: "Fluvina",
  location: "India",
  identities: [
    "Full-stack developer",
    "AI / LLM engineer",
    "Learning data analytics & data science",
  ],
  status: { label: "Open to conversations", open: true },
  email: null,
  resume: "/resume.pdf",
  siteUrl: "https://aditya-soni.example.com",
  currently: "Writing the NestJS backend for a doctor–receptionist app.",
  intro:
    "I'm Aditya, a developer interested in building thoughtful software, intelligent systems and data-driven products. I work across full-stack engineering and LLM applications while exploring where technology and data meet.",
  description:
    "Aditya Kumar Soni — full-stack developer and AI / LLM engineer from India, building web applications, retrieval pipelines and data projects.",
  socials: [
    {
      id: "github",
      label: "GitHub",
      handle: "Adityaz23",
      href: "https://github.com/Adityaz23",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      handle: "aditya-soni",
      href: "https://www.linkedin.com/in/aditya-soni-83225a22b/",
    },
    {
      id: "codeberg",
      label: "Codeberg",
      handle: "AdizCode",
      href: "https://codeberg.org/AdizCode",
    },
  ],
};

export const social = (id: SocialId) =>
  profile.socials.find((s) => s.id === id) as Social;
