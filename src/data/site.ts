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
  themeColor: "#080e1c",

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

export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Team", href: "/team/" },
  { label: "Process", href: "/process/" },
  { label: "Why Us", href: "/why-us/" },
  { label: "Contact", href: "/contact/" },
] as const;

export type NavItem = (typeof nav)[number];
