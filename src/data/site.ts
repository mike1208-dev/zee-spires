/**
 * Central site configuration and company facts.
 * Company details are taken from zeespires.com — confirm before launch.
 */

export const site = {
  name: "ZeeSpires",
  legalName: "ZeeSpires US LLC",
  tagline: "Software built to reach higher.",
  shortDescription:
    "ZeeSpires is a senior-led software team delivering AI agents, data platforms, full-stack products, and IT consulting for ambitious B2B companies.",
  url: "https://zeespires.com",
  locale: "en_US",
  themeColor: "#07070b",

  contact: {
    email: "admin@zeespires.com",
    phone: "+94 78 843 0853",
    // Placeholder booking link — swap for the real Calendly/Cal.com URL.
    bookingUrl: "https://cal.com/zeespires",
  },

  address: {
    street: "1021 E Lincolnway, Unit #1933",
    city: "Cheyenne",
    region: "WY",
    postalCode: "82001",
    country: "USA",
    countryCode: "US",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/zeespires",
    github: "https://github.com/zeespires",
    x: "https://x.com/zeespires",
  },
} as const;

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Overview", href: "/services/" },
      { label: "AI Agent Development", href: "/services/ai-agent-development/" },
      { label: "Data Engineering", href: "/services/data-engineering/" },
      { label: "Full-Stack Development", href: "/services/full-stack-development/" },
      { label: "IT Consulting & Staffing", href: "/services/it-consulting-staffing/" },
    ],
  },
  { label: "Engineers", href: "/engineers/" },
  { label: "Contact", href: "/contact/" },
];
