
import type {
  Metadata,
  Viewport,
} from "next";

import type { ReactNode } from "react";

import "./globals.css";

import { siteConfig } from "./site-config";

/* =========================================
   PHASE 7C — SEO METADATA
========================================= */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  applicationName:
    `${siteConfig.name} Portfolio`,

  authors: [
    {
      name: siteConfig.name,
    },
  ],

  creator: siteConfig.name,
  publisher: siteConfig.name,

  keywords: [
    "Salman Jahan Rafi",
    "Salman Rafi",
    "Data Analyst",
    "QA Engineer",
    "Quality Assurance",
    "Software Testing",
    "Playwright",
    "TypeScript",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analytics",
    "Power BI",
    "Python",
    "AI Portfolio",
    "Bangladesh",
  ],

  category: "technology",

  alternates: siteConfig.isIndexable
    ? {
        canonical: "/",
      }
    : undefined,

  openGraph: {
    type: "website",

    locale: "en_US",

    siteName:
      `${siteConfig.name} — Portfolio`,

    title: siteConfig.title,

    description: siteConfig.description,

    url: siteConfig.isIndexable
      ? siteConfig.origin
      : undefined,
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.title,

    description: siteConfig.shortDescription,
  },

  robots: siteConfig.isIndexable
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
      },
};

/* =========================================
   VIEWPORT / BROWSER COLOR
========================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171715",
};

/* =========================================
   STRUCTURED DATA

   Person schema for search engines.
========================================= */

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",

  name: siteConfig.name,

  description: siteConfig.description,

  jobTitle: "Data Analyst / QA Engineer",

  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },

  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Analytics",
    "Power BI",
    "Quality Assurance",
    "Software Test Automation",
    "Python",
    "TypeScript",
  ],

  sameAs: [
    siteConfig.github,
    siteConfig.linkedin,
  ],

  ...(siteConfig.isIndexable
    ? {
        url: siteConfig.origin,
        image:
          `${siteConfig.origin}/images/hero-portrait.png`,
      }
    : {}),
};

/* =========================================
   ROOT LAYOUT
========================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              personSchema
            ).replace(/</g, "\\u003c"),
          }}
        />
      </head>

      <body>
        {children}

        {/*
          JavaScript-disabled fallback:

          The cinematic intro is interactive,
          but visitors without JavaScript should
          still be able to read the portfolio.

          Important declarations override the
          template's inline display:none.
        */}

        <noscript>
          <style>{`
            .sr-intro {
              display: none !important;
            }

            .sr-intro__portfolio {
              display: block !important;
              visibility: visible !important;
            }

            .reveal {
              opacity: 1 !important;
              visibility: visible !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </body>
    </html>
  );
}
