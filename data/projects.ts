import { draft, type Copy } from "./types";

/* ------------------------------------------------------------------ */
/* Categories — these drive the three tabs in Selected Work.           */
/* ------------------------------------------------------------------ */

export type CategoryId = "software" | "ai" | "data";

export interface Category {
  id: CategoryId;
  label: string;
  /** Used in the hero index and on cards. */
  short: string;
  blurb: string;
}

export const categories: Category[] = [
  {
    id: "software",
    label: "Software Development",
    short: "Software",
    blurb:
      "Full-stack applications: interfaces, APIs, validation, databases and the plumbing between them.",
  },
  {
    id: "ai",
    label: "AI / LLM Engineering",
    short: "AI / LLM",
    blurb:
      "Retrieval pipelines, embeddings and model integrations — LLMs treated as one component in a larger system.",
  },
  {
    id: "data",
    label: "Data Science / Analytics",
    short: "Data",
    blurb:
      "SQL, Python and exploratory analysis. This shelf is being filled as I work through real datasets.",
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "built" | "in-progress" | "planned";

export const statusLabel: Record<ProjectStatus, string> = {
  built: "Built",
  "in-progress": "In development",
  planned: "Planned",
};

/** One stage of the architecture shown on the project's plate. */
export interface PipelineStep {
  stage: string;
  tool: string;
}

export interface CaseStudySection {
  id:
    | "problem"
    | "motivation"
    | "architecture"
    | "implementation"
    | "challenges"
    | "solutions"
    | "results"
    | "learned";
  title: string;
  /** Paragraphs. Strings starting with "- " render as list items. */
  body: Copy[];
}

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  summary: string;
  status: ProjectStatus;
  year: string | null;
  stack: string[];
  /** null = repository link not confirmed yet; the UI says so instead of linking. */
  repo: string | null;
  demo: string | null;
  /** Optional screenshot in /public/projects. Without it, the architecture plate is shown. */
  image?: { src: string; alt: string; width: number; height: number };
  pipeline: PipelineStep[];
  /** Placeholder slots render as reserved spaces and have no case-study page. */
  placeholder?: boolean;
  caseStudy: CaseStudySection[];
}

/** Case-study outline, in reading order. */
const section = (
  id: CaseStudySection["id"],
  body: Copy[],
): CaseStudySection => ({ id, title: sectionTitles[id], body });

export const sectionTitles: Record<CaseStudySection["id"], string> = {
  problem: "The problem",
  motivation: "Why I built it",
  architecture: "Architecture & decisions",
  implementation: "Implementation",
  challenges: "What was hard",
  solutions: "How I solved it",
  results: "Results",
  learned: "What I learned",
};

export const projects: Project[] = [
  /* ---------------------------- AI / LLM ---------------------------- */
  {
    slug: "video-transcriber",
    title: "Video Transcriber",
    category: "ai",
    summary:
      "Turns a video into a transcript you can question. Long audio is chunked and transcribed — including Hinglish — then indexed for retrieval-augmented answers.",
    status: "built",
    year: null, // TODO: add the year
    stack: ["Python", "Faster-Whisper", "Sarvam API", "yt-dlp", "pydub", "ChromaDB", "Groq"],
    repo: "https://github.com/Adityaz23/Video-Transcriber",
    demo: null,
    pipeline: [
      { stage: "Fetch", tool: "yt-dlp" },
      { stage: "Chunk audio", tool: "pydub" },
      { stage: "Transcribe", tool: "Faster-Whisper · Sarvam" },
      { stage: "Index", tool: "ChromaDB" },
      { stage: "Answer", tool: "Groq LLM" },
    ],
    caseStudy: [
      section("problem", [
        "Finding one moment in a long video usually means scrubbing through the timeline. A lot of Indian content also switches between Hindi and English mid-sentence, so a transcription step tuned only for English isn't enough.",
      ]),
      section("motivation", [
        draft("Why did you build this? What were you trying to watch, search or learn from?"),
      ]),
      section("architecture", [
        "The project is a linear pipeline, and each stage hands a simpler artefact to the next:",
        "- yt-dlp downloads the source and extracts its audio.",
        "- pydub splits the audio into chunks, so long recordings are transcribed piece by piece rather than in a single pass.",
        "- Faster-Whisper transcribes each chunk; Hinglish audio is routed to the Sarvam API instead.",
        "- The transcript is embedded and stored in ChromaDB.",
        "- A question retrieves the most relevant transcript passages, and a Groq-hosted LLM answers using only that context.",
        draft("Add the key decisions: chunk size and why, which Whisper model size, how Hinglish is detected or selected, which Groq model."),
      ]),
      section("implementation", [
        draft("Walk through one request end to end. Mention anything non-obvious: how chunks map back to timestamps, how many passages are retrieved, prompt structure."),
      ]),
      section("challenges", [draft("What broke, was slow, or gave bad answers?")]),
      section("solutions", [draft("How did you fix each of those?")]),
      section("results", [
        draft("Only add numbers you measured — e.g. transcription time for a 1-hour video, or answer quality on a set of test questions."),
      ]),
      section("learned", [draft("What would you do differently next time?")]),
    ],
  },
  {
    slug: "books",
    title: "Books",
    category: "ai",
    summary:
      "Semantic search over a book collection: queries and books are compared as embeddings, results come from ChromaDB, and an LLM layer runs on Groq behind a Gradio interface.",
    status: "built",
    year: null, // TODO
    stack: ["Python", "Gradio", "ChromaDB", "Hugging Face embeddings", "Groq"],
    repo: "https://github.com/Adityaz23/books",
    demo: null, // TODO: add a Hugging Face Space link if you deploy it
    pipeline: [
      { stage: "Book data", tool: draftTool("dataset") },
      { stage: "Embed", tool: "Hugging Face" },
      { stage: "Store & search", tool: "ChromaDB" },
      { stage: "Respond", tool: "Groq LLM" },
      { stage: "Interface", tool: "Gradio" },
    ],
    caseStudy: [
      section("problem", [
        "Keyword search only finds books that share your exact words. Searching by meaning lets a description of what you want match books that describe it differently.",
      ]),
      section("motivation", [draft("Why books? What did you want to be able to ask?")]),
      section("architecture", [
        "- Book records are converted to vectors with a Hugging Face embedding model.",
        "- Vectors are stored in ChromaDB, which handles similarity search.",
        "- A Groq-hosted LLM works with the retrieved results.",
        "- Gradio provides the interface, which keeps the project in a single Python codebase.",
        draft("Name the dataset, the embedding model, and exactly what the LLM does with results (re-rank, summarise, explain?)."),
      ]),
      section("implementation", [draft("Describe how text for each book is prepared before embedding, and how a query flows through.")]),
      section("challenges", [draft("What was hard?")]),
      section("solutions", [draft("How did you solve it?")]),
      section("results", [draft("Only verified results.")]),
      section("learned", [draft("What did this teach you about retrieval?")]),
    ],
  },

  /* ---------------------------- Software ---------------------------- */
  {
    slug: "realtime-chat",
    title: "Realtime Chat",
    category: "software",
    summary:
      "A full-stack chat application with a TypeScript API on Bun and Express, request validation with Zod, structured logging with Winston, and PostgreSQL for persistence.",
    status: "built", // TODO: confirm
    year: null,
    stack: ["TypeScript", "Next.js", "Bun", "Express", "PostgreSQL", "Zod", "Winston"],
    repo: null, // TODO: add the confirmed repository URL
    demo: null,
    pipeline: [
      { stage: "Client", tool: "Next.js" },
      { stage: "REST API", tool: "Express on Bun" },
      { stage: "Validate", tool: "Zod" },
      { stage: "Persist", tool: "PostgreSQL" },
      { stage: "Observe", tool: "Winston" },
    ],
    caseStudy: [
      section("problem", [
        "Chat looks simple and isn't: messages have to arrive in order, survive reloads and reject malformed input — all while the interface stays responsive.",
      ]),
      section("motivation", [draft("Why a chat app? What did you want to learn by building it?")]),
      section("architecture", [
        "- A Next.js frontend talks to a REST API written in TypeScript, running on Bun with Express.",
        "- Zod schemas validate request bodies at the API boundary, so handlers only receive data in the expected shape.",
        "- PostgreSQL stores users, conversations and messages.",
        "- Winston writes structured logs for the API.",
        draft("How are messages delivered in real time — WebSockets, Socket.IO, polling, SSE? Add the schema design and auth approach."),
      ]),
      section("implementation", [draft("Walk through sending one message from the input box to another user's screen.")]),
      section("challenges", [draft("What was hard?")]),
      section("solutions", [draft("How did you solve it?")]),
      section("results", [draft("Only verified results.")]),
      section("learned", [draft("What did you learn?")]),
    ],
  },
  {
    slug: "doctor-receptionist",
    title: "Doctor & Receptionist App",
    category: "software",
    summary:
      "A healthcare application with separate doctor and receptionist workflows. The frontend is built; the NestJS backend is being implemented now.",
    status: "in-progress",
    year: null,
    stack: ["NestJS", "TypeScript"], // TODO: add the frontend stack and database
    repo: null, // TODO
    demo: null,
    pipeline: [
      { stage: "Receptionist view", tool: "Frontend · built" },
      { stage: "Doctor view", tool: "Frontend · built" },
      { stage: "API", tool: "NestJS · in progress" },
      { stage: "Data", tool: draftTool("database") },
    ],
    caseStudy: [
      section("problem", [
        "Front-desk staff and doctors need different views of the same patients and appointments. The application separates those roles instead of giving everyone one crowded screen.",
      ]),
      section("motivation", [draft("Who is this for, and why did you start it?")]),
      section("architecture", [
        "- The frontend for both roles is complete.",
        "- The backend is being written in NestJS, whose module structure maps naturally onto separate domains such as appointments and patients.",
        draft("Add your module list, database, and how roles and permissions are enforced."),
      ]),
      section("implementation", [draft("Update as the backend progresses.")]),
      section("challenges", [draft("What's been hard so far?")]),
      section("solutions", [draft("How are you approaching it?")]),
      section("results", [draft("Only once there's something verified to report.")]),
      section("learned", [draft("What has NestJS taught you so far?")]),
    ],
  },

  /* ------------------------------ Data ------------------------------ */
  // Placeholder slots. Replace one with a real project by removing
  // `placeholder: true` and filling in the fields — no fabricated datasets.
  {
    slug: "sql-analysis",
    title: "SQL analysis",
    category: "data",
    summary: "Reserved for a SQL project: a real dataset, the questions asked of it, and the queries that answered them.",
    status: "planned",
    year: null,
    stack: ["SQL", "PostgreSQL"],
    repo: null,
    demo: null,
    pipeline: [],
    placeholder: true,
    caseStudy: [],
  },
  {
    slug: "exploratory-analysis",
    title: "Exploratory data analysis",
    category: "data",
    summary: "Reserved for a Python EDA notebook: cleaning, distributions, and the findings worth reporting.",
    status: "planned",
    year: null,
    stack: ["Python", "Pandas", "NumPy"],
    repo: null,
    demo: null,
    pipeline: [],
    placeholder: true,
    caseStudy: [],
  },
  {
    slug: "dashboard",
    title: "Dashboard & statistics",
    category: "data",
    summary: "Reserved for a dashboard or statistical study that turns analysis into something a reader can act on.",
    status: "planned",
    year: null,
    stack: ["Python", "Data visualisation", "Statistics"],
    repo: null,
    demo: null,
    pipeline: [],
    placeholder: true,
    caseStudy: [],
  },
];

/** Marks an unknown tool on a plate. Shows "to confirm" until replaced. */
function draftTool(what: string) {
  return `${what} · to confirm`;
}

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug && !p.placeholder);

export const publishedProjects = projects.filter((p) => !p.placeholder);

export const projectsIn = (category: CategoryId) =>
  projects.filter((p) => p.category === category);
