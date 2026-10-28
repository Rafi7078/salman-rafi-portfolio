
/* =========================================
   PHASE 7C — SITE CONFIGURATION
========================================= */

function getProductionOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return null;
  }

  try {
    const url = new URL(raw);

    // Public production websites should use HTTPS.
    if (url.protocol !== "https:") {
      return null;
    }

    // Expect a domain origin, not a subpage.
    if (
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

const productionOrigin = getProductionOrigin();

const isProductionEnvironment =
  process.env.VERCEL_ENV !== undefined
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";

export const siteConfig = {
  name: "Salman Jahan Rafi",

  title:
    "Salman Jahan Rafi | AI, Data Analytics & QA Engineer",

  description:
    "Explore Salman Jahan Rafi's portfolio featuring AI and machine learning, data analytics, quality engineering, professional experience, technical skills, and selected projects.",

  shortDescription:
    "AI, data analytics, and quality engineering. Building practical solutions through technology.",

  location: "Dhaka, Bangladesh",

  email: "sajidbin7777@gmail.com",

  github: "https://github.com/Rafi7078",

  linkedin:
    "https://www.linkedin.com/in/salmanrafi002/",

  origin: productionOrigin ?? "http://localhost:3000",

  isIndexable:
    Boolean(productionOrigin) &&
    isProductionEnvironment,
} as const;
