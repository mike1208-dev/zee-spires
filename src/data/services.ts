/**
 * The four core services. Copy is polished placeholder — grounded, no hype —
 * written to match the ZeeSpires tone. Review and adjust before launch.
 */

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  /** One-line summary for cards and the home overview. */
  summary: string;
  /** Longer intro used on the Services page. */
  description: string;
  /** Concrete deliverables / capabilities. */
  capabilities: string[];
  /** Representative tools & technologies. */
  stack: string[];
  /** Simple line-icon key rendered by the Icon component. */
  icon: "agent" | "data" | "code" | "consulting";
};

export const services: Service[] = [
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    tagline: "Autonomous systems that do real work.",
    summary:
      "Production LLM agents that reason, use tools, and take action inside your workflows — not demos, but systems you can depend on.",
    description:
      "We design and ship AI agents that go beyond chat: retrieval over your own knowledge, tool and API calls, and multi-step workflows with guardrails and human-in-the-loop where it matters. We focus on evaluation, observability, and cost control so the system holds up once real users depend on it.",
    capabilities: [
      "Retrieval-augmented generation over your data (RAG)",
      "Tool-using and multi-step agent workflows",
      "Evaluation harnesses, guardrails & human-in-the-loop",
      "Observability, tracing, and cost/latency optimization",
      "Model selection, prompt engineering & fine-tuning",
    ],
    stack: [
      "Claude",
      "OpenAI",
      "LangGraph",
      "Vector DBs",
      "Python",
      "TypeScript",
    ],
    icon: "agent",
  },
  {
    slug: "data-engineering",
    title: "Data Engineering",
    tagline: "Pipelines and platforms that scale with you.",
    summary:
      "Reliable data platforms — ingestion, transformation, warehousing, and orchestration — that turn scattered data into a foundation you can build on.",
    description:
      "We build the data backbone that analytics, ML, and AI depend on: batch and streaming ingestion, well-modeled warehouses, tested transformations, and orchestration you can trust. Everything is versioned, documented, and monitored, so data quality issues surface before your stakeholders do.",
    capabilities: [
      "Batch & streaming ingestion pipelines",
      "Dimensional modeling & warehouse design",
      "dbt transformations with tests and lineage",
      "Orchestration, alerting & data-quality monitoring",
      "Analytics and ML/AI feature enablement",
    ],
    stack: [
      "Python",
      "dbt",
      "Airflow",
      "PostgreSQL",
      "Snowflake / BigQuery",
      "Kafka",
    ],
    icon: "data",
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    tagline: "From first sketch to a system running at scale.",
    summary:
      "Fast, resilient web and mobile products built on frameworks that scale — designed, engineered, and shipped end to end.",
    description:
      "We take ambitious ideas from whiteboard to production: thoughtful product and UX design, a modern typed codebase, solid APIs, and the cloud infrastructure to run it. We ship in small, reviewable increments and leave you with tests, documentation, and a team that answers.",
    capabilities: [
      "Web application development (React / Next.js / Astro)",
      "APIs, systems integration & backend services",
      "Cloud infrastructure, CI/CD & monitoring",
      "Product & UX design",
      "QA automation & ongoing support",
    ],
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "AWS / Cloudflare",
    ],
    icon: "code",
  },
  {
    slug: "it-consulting-staffing",
    title: "IT Consulting & IT Staffing",
    tagline: "Senior expertise, embedded in your team.",
    summary:
      "Strategic technology guidance and vetted senior engineers — as advisors or as an embedded team that works the way you work.",
    description:
      "When you need seasoned judgment or extra hands, we provide both: architecture and technology-strategy consulting, and senior engineers who embed directly with your team. Every engagement is senior-led, with direct access to the people doing the work — no account-manager layer in between.",
    capabilities: [
      "Technology strategy & architecture review",
      "Cloud, security & delivery consulting",
      "Embedded senior engineers (staff augmentation)",
      "Fractional technical leadership",
      "Fixed-scope or embedded-team engagements",
    ],
    stack: [
      "Architecture",
      "Cloud",
      "DevOps",
      "Security",
      "Delivery",
      "Mentoring",
    ],
    icon: "consulting",
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
