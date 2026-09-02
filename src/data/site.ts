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

import type { UiKey } from "@/i18n/ui";

// Labels are translation keys (see src/i18n/ui.ts) rather than literal
// strings, since nav is rendered by Header/Footer in both locales.
export type NavChild = { labelKey: UiKey; href: string };
export type NavItem = { labelKey: UiKey; href: string; children?: NavChild[] };

export const nav: NavItem[] = [
  {
    labelKey: "nav.services",
    href: "/services/",
    children: [
      { labelKey: "nav.servicesOverview", href: "/services/" },
      { labelKey: "nav.serviceAi", href: "/services/ai-agent-development/" },
      { labelKey: "nav.serviceData", href: "/services/data-engineering/" },
      { labelKey: "nav.serviceFullstack", href: "/services/full-stack-development/" },
      { labelKey: "nav.serviceConsulting", href: "/services/it-consulting-staffing/" },
    ],
  },
  { labelKey: "nav.engineers", href: "/engineers/" },
  { labelKey: "nav.contact", href: "/contact/" },
];
