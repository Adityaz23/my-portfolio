import { draft, type Copy } from "./types";

export interface TimelineEntry {
  period: Copy;
  title: string;
  org: string;
  body: Copy;
  current?: boolean;
  /** Entire entry is a placeholder: shown in dev only. */
  draftEntry?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    period: draft("Start month and year — e.g. “Jun 2026 – Present”"),
    title: "Software Development Intern",
    org: "Fluvina",
    body: draft("Two or three lines on what you work on and what you've shipped. Only what you're comfortable sharing."),
    current: true,
  },
  {
    period: "Ongoing",
    title: "Independent projects",
    org: "Self-directed",
    body: "Video Transcriber and Books on the LLM side; a realtime chat app and a doctor–receptionist app on the full-stack side. The data-analysis shelf is next.",
  },
  {
    period: draft("Years"),
    title: "Education",
    org: "Add your institution",
    body: draft("Degree, institution, and anything relevant you studied."),
    draftEntry: true,
  },
];

export const principles: { title: string; body: string }[] = [
  {
    title: "Validate at the boundary",
    body: "Requests are checked against a schema before business logic sees them — Zod on the chat app's Express routes. Bugs are cheaper at the edge.",
  },
  {
    title: "Logs that answer questions",
    body: "Structured logging from the first commit, Winston in the chat API. Debugging starts with knowing what actually happened.",
  },
  {
    title: "Retrieval before prompting",
    body: "In a RAG system, most bad answers start with bad context. Chunking and what gets retrieved deserve as much attention as the prompt.",
  },
  {
    title: "Small modules, clear seams",
    body: "Code split by responsibility so each part can change on its own — the reason the doctor–receptionist backend is organised as NestJS modules.",
  },
  {
    title: "Honest about scale",
    body: "My work is personal-project and internship scale. I study system design deliberately — load, failure, data modelling — rather than claiming experience I don't have.",
  },
  {
    title: "Know where a number came from",
    body: "Learning analysis is partly about this: a metric is only useful if you understand how it was produced and what it leaves out.",
  },
];
