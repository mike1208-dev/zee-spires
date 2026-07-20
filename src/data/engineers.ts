/**
 * Team / Our Engineers.
 *
 * ⚠️ PLACEHOLDER DATA — these are fictional profiles created to demonstrate the
 * page. Replace with real engineers (with their consent) before launch, or use
 * "initials + background" if real names/photos can't be published.
 *
 * `photo` is intentionally empty; the UI renders a monogram avatar as a
 * fallback so the layout looks complete without image assets.
 */

export type Engineer = {
  name: string;
  initials: string;
  role: string;
  photo?: string;
  /** Notable prior companies, foregrounded for trust. */
  background: string[];
  bio: string;
  specialties: string[];
  stack: string[];
  location: string;
};

export const engineers: Engineer[] = [
  {
    name: "Aarav Mehta",
    initials: "AM",
    role: "Principal Engineer — AI & Agents",
    background: ["Microsoft", "Databricks"],
    bio: "Aarav has spent over a decade building large-scale ML and inference systems. He now leads our AI agent practice, focusing on retrieval, evaluation, and getting LLM systems reliable enough to trust in production.",
    specialties: ["LLM agents", "RAG systems", "ML infrastructure"],
    stack: ["Python", "PyTorch", "LangGraph", "Kubernetes"],
    location: "Seattle, USA",
  },
  {
    name: "Priya Raman",
    initials: "PR",
    role: "Staff Data Engineer",
    background: ["IBM", "Snowflake"],
    bio: "Priya designs data platforms that hold up under real load. She has built ingestion and warehousing systems for finance and healthcare, with a bias toward tested, well-modeled, observable pipelines.",
    specialties: ["Data platforms", "Dimensional modeling", "Streaming"],
    stack: ["dbt", "Airflow", "Kafka", "Snowflake"],
    location: "Austin, USA",
  },
  {
    name: "Daniel Okafor",
    initials: "DO",
    role: "Principal Full-Stack Engineer",
    background: ["Amazon", "Stripe"],
    bio: "Daniel takes products from whiteboard to scale. He cares about clean typed codebases, fast interfaces, and shipping in small increments — and he has led delivery on high-traffic consumer and B2B platforms.",
    specialties: ["Web platforms", "APIs", "Cloud architecture"],
    stack: ["TypeScript", "Next.js", "Node.js", "AWS"],
    location: "Remote — EST",
  },
  {
    name: "Sofia Alvarez",
    initials: "SA",
    role: "Lead Product & UX Designer",
    background: ["Google", "Atlassian"],
    bio: "Sofia designs interfaces around how people actually work. She partners closely with engineering so what's designed is what ships, and she has shaped products used by millions.",
    specialties: ["Product design", "Design systems", "UX research"],
    stack: ["Figma", "Prototyping", "Accessibility"],
    location: "Barcelona, Spain",
  },
  {
    name: "Hassan Ali",
    initials: "HA",
    role: "Staff DevOps / Platform Engineer",
    background: ["Microsoft", "Red Hat"],
    bio: "Hassan sets up infrastructure, CI/CD, and monitoring right the first time. He has run platform teams responsible for uptime across regulated, high-availability environments.",
    specialties: ["Cloud infrastructure", "CI/CD", "Observability"],
    stack: ["Terraform", "Kubernetes", "AWS", "Docker"],
    location: "Colombo, Sri Lanka",
  },
  {
    name: "Elena Novak",
    initials: "EN",
    role: "Principal Consultant — Technology Strategy",
    background: ["IBM", "McKinsey Digital"],
    bio: "Elena advises leadership on architecture and technology strategy. She translates business goals into delivery plans and embeds with teams to make sure they land.",
    specialties: ["Architecture", "Tech strategy", "Delivery leadership"],
    stack: ["Architecture", "Cloud", "Security", "Mentoring"],
    location: "Remote — CET",
  },
];
