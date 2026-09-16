/**
 * Central site configuration and company facts.
 * Company details are taken from zeespires.com — confirm before launch.
 */

export const site = {
  name: "ZeeSpires",
  legalName: "ZeeSpires LLC",
  url: "https://zeespires.com",
  locale: "en_US",
  themeColor: "#07070b",

  contact: {
    email: "admin@zeespires.com",
    phone: "+65 9743 5146",
    // Placeholder booking link — swap for the real Calendly/Cal.com URL.
    bookingUrl: "https://cal.com/zeespires",
  },

  address: {
    street: "448A Sengkang West Way, #23-303",
    city: "Singapore",
    // Singapore has no state/region tier.
    region: "",
    postalCode: "791448",
    country: "Singapore",
    countryCode: "SG",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/zeespires",
    github: "https://github.com/zeespires",
    x: "https://x.com/zeespires",
  },
} as const;

const isCityState = site.address.city === site.address.country;
const cityRegionPostal =
  [site.address.city, site.address.region].filter(Boolean).join(", ") +
  (site.address.postalCode ? ` ${site.address.postalCode}` : "");

export const formattedAddress = {
  /** e.g. "448A Sengkang West Way, #23-303, Singapore 791448" */
  full: `${site.address.street}, ${cityRegionPostal}${isCityState ? "" : `, ${site.address.country}`}`,
  /** e.g. "Singapore" or "Cheyenne, WY · USA" */
  short: isCityState
    ? site.address.city
    : `${[site.address.city, site.address.region].filter(Boolean).join(", ")} · ${site.address.country}`,
};

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
