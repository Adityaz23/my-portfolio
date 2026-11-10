/**
 * Technologies, grouped and honestly levelled.
 *
 * These levels are a first pass based on which projects use what.
 * Adjust any of them — the section reads exactly what's here.
 */

export type Level = "daily" | "built" | "learning" | "exploring";

export const levels: { id: Level; label: string; note: string; weight: number }[] = [
  { id: "daily", label: "Use regularly", note: "Part of most things I build", weight: 4 },
  { id: "built", label: "Built with", note: "Used in at least one real project", weight: 3 },
  { id: "learning", label: "Learning", note: "Working through it now", weight: 2 },
  { id: "exploring", label: "Exploring", note: "Area of interest, early days", weight: 1 },
];

export interface Technology {
  name: string;
  level: Level;
  note: string;
}

export interface TechGroup {
  id: string;
  title: string;
  summary: string;
  items: Technology[];
}

export const techGroups: TechGroup[] = [
  {
    id: "software",
    title: "Software development",
    summary: "Languages and frameworks for interfaces, APIs and services.",
    items: [
      { name: "TypeScript", level: "daily", note: "Default for new frontend and backend work." },
      { name: "JavaScript", level: "daily", note: "The runtime underneath most of my web work." },
      { name: "Python", level: "daily", note: "LLM pipelines, scripting, and now data analysis." },
      { name: "React", level: "daily", note: "Component-driven interfaces." },
      { name: "Next.js", level: "built", note: "Frontend of the realtime chat app; this site." },
      { name: "Node.js", level: "built", note: "Server-side JavaScript for APIs and tooling." },
      { name: "Express.js", level: "built", note: "REST API for the realtime chat app." },
      { name: "NestJS", level: "built", note: "Backend of the doctor–receptionist app, in progress." },
      { name: "HTML & CSS", level: "daily", note: "Semantic markup and hand-written layout." },
      { name: "React Native", level: "learning", note: "Taking React patterns to mobile." },
      { name: "FastAPI", level: "learning", note: "Python APIs for serving models and pipelines." },
    ],
  },
  {
    id: "ai",
    title: "AI / LLM engineering",
    summary: "Building applications where a model is one part of a larger system.",
    items: [
      { name: "RAG", level: "built", note: "Retrieval over transcripts and book data." },
      { name: "Vector databases", level: "built", note: "Storing and searching embeddings." },
      { name: "Hugging Face", level: "built", note: "Embedding models in the Books project." },
      { name: "Groq", level: "built", note: "Fast LLM inference behind both RAG projects." },
      { name: "LLM applications", level: "built", note: "End-to-end apps around model calls." },
      { name: "LangChain", level: "learning", note: "Orchestration for chains and retrievers." },
      { name: "AI agents", level: "learning", note: "Tool-using, multi-step model workflows." },
      { name: "OpenRouter", level: "exploring", note: "Routing across hosted models." },
      { name: "Ollama", level: "exploring", note: "Running open models locally." },
      { name: "Open WebUI", level: "exploring", note: "Self-hosted interface for local models." },
      { name: "MCP", level: "exploring", note: "Model Context Protocol for tool access." },
    ],
  },
  {
    id: "data",
    title: "Data & databases",
    summary: "Storing data well, and learning to analyse it properly.",
    items: [
      { name: "PostgreSQL", level: "built", note: "Persistence for the realtime chat app." },
      { name: "SQL", level: "built", note: "Schemas and queries; now applying it to analysis." },
      { name: "ChromaDB", level: "built", note: "Vector store in both RAG projects." },
      { name: "MongoDB", level: "learning", note: "Document-oriented data modelling." },
      { name: "Supabase", level: "learning", note: "Managed Postgres with auth and storage." },
      { name: "Python for data", level: "learning", note: "Notebook-driven analysis." },
      { name: "Pandas", level: "learning", note: "Cleaning and reshaping tabular data." },
      { name: "NumPy", level: "learning", note: "Numerical arrays underneath the stack." },
      { name: "Data visualisation", level: "learning", note: "Choosing the chart that answers the question." },
      { name: "Statistics", level: "learning", note: "Telling a pattern from noise." },
    ],
  },
  {
    id: "tools",
    title: "Tools & infrastructure",
    summary: "What the work runs on and gets shipped with.",
    items: [
      { name: "Git", level: "daily", note: "Version control for everything." },
      { name: "GitHub", level: "daily", note: "Hosting, reviews and issues." },
      { name: "Linux", level: "daily", note: "Primary development environment." },
      { name: "VS Code", level: "daily", note: "Editor." },
      { name: "Cursor", level: "daily", note: "Editor with AI assistance." },
      { name: "Zed", level: "daily", note: "Fast native editor." },
      { name: "REST APIs", level: "built", note: "Designing and consuming HTTP interfaces." },
      { name: "Bun", level: "built", note: "Runtime for the chat app's API." },
      { name: "Docker", level: "learning", note: "Reproducible environments and services." },
      { name: "Kubernetes", level: "exploring", note: "Container orchestration." },
    ],
  },
];
