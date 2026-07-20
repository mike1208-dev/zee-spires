/**
 * Shared content: process stages, differentiators (why us), tech stack,
 * and impact stats. Placeholder copy in the ZeeSpires tone.
 */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consult",
    description:
      "We start by understanding the problem, the constraints, and what success actually looks like — then agree on scope, timeline, and how we'll work together.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Architecture and interfaces designed around how your people and systems really work. You see the shape of the solution before we build it.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Senior engineers ship in small, reviewable increments. You get working software early and often, with tests and documentation as we go.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "We ship to production with the infrastructure, monitoring, and CI/CD to run it — and hand over a codebase your team can own.",
  },
  {
    number: "05",
    title: "Support",
    description:
      "Structured testing and a support line that answers. We stay accountable after launch, whether fixed-scope or as an embedded team.",
  },
];

export type Differentiator = {
  title: string;
  description: string;
  icon: "shield" | "users" | "signal" | "layers" | "compass" | "spark";
};

export const differentiators: Differentiator[] = [
  {
    title: "Senior-led teams only",
    description:
      "Every engagement is staffed by experienced engineers who have built and run systems at scale — no juniors learning on your budget.",
    icon: "users",
  },
  {
    title: "Direct access to the builders",
    description:
      "You talk to the people writing the code. No account-manager layer, no telephone game between you and the work.",
    icon: "signal",
  },
  {
    title: "U.S. registered LLC",
    description:
      "A U.S.-registered company with clear accountability and contracts, working across U.S. and South Asia time zones for real coverage.",
    icon: "shield",
  },
  {
    title: "Backgrounds you can trust",
    description:
      "Engineers with experience at leading companies like Microsoft and IBM, bringing hard-won judgment to every decision.",
    icon: "spark",
  },
  {
    title: "Fixed-scope or embedded",
    description:
      "Engage us for a defined deliverable, or embed our engineers in your team. Whatever fits how you need to work.",
    icon: "layers",
  },
  {
    title: "Grounded, not hyped",
    description:
      "We talk in concrete capabilities and trade-offs, not buzzwords. We'd rather under-promise and ship than oversell and slip.",
    icon: "compass",
  },
];

/** Grouped tech stack shown on Home and Why Us. */
export const techStack: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "Python", "Go", "Swift", "Kotlin", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Astro", "Tailwind CSS"],
  },
  {
    group: "Backend & Data",
    items: ["Node.js", "Django", "PostgreSQL", "Redis", "GraphQL", "dbt"],
  },
  {
    group: "AI & ML",
    items: ["Claude", "OpenAI", "LangGraph", "PyTorch", "Vector DBs"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Cloudflare", "Docker", "Kubernetes", "Terraform"],
  },
];

export const stats: { value: string; label: string }[] = [
  { value: "10+", label: "Years average engineer experience" },
  { value: "4", label: "Core disciplines, one accountable team" },
  { value: "2", label: "Continents of time-zone coverage" },
  { value: "100%", label: "Senior-led engagements" },
];

/** Industries we work across. */
export const industries: string[] = [
  "Fintech",
  "Healthcare",
  "SaaS & Platforms",
  "E-commerce & Retail",
  "Logistics",
  "Professional Services",
];
