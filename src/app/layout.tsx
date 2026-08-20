import type {
  Metadata,
  Viewport,
} from "next";

import {
  ClerkProvider,
} from "@clerk/nextjs";

import "./globals.css";

/* =====================================
   SITE CONFIG
===================================== */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://leila-portfolio-eta.vercel.app";

/* =====================================
   SEO METADATA
===================================== */

export const metadata: Metadata = {
  metadataBase:
    new URL(siteUrl),

  /* =====================================
     TITLE
  ===================================== */

  title: {
    default:
      "Leila Mirfakhraei | Graphic Designer & Key Art Designer",

    template:
      "%s | Leila Mirfakhraei",
  },

  /* =====================================
     DESCRIPTION
  ===================================== */

  description:
    "Portfolio of Leila Mirfakhraei, a graphic designer specializing in entertainment key art, theatrical campaigns, movie poster design, motion graphics, marketing, and visual storytelling.",

  /* =====================================
     SEARCH KEYWORDS
  ===================================== */

  keywords: [
    "Leila Mirfakhraei",
    "Leila Mirfakhraei graphic designer",
    "Leila Mirfakhraei portfolio",
    "graphic designer",
    "key art designer",
    "entertainment graphic designer",
    "entertainment designer",
    "movie poster designer",
    "film poster designer",
    "poster designer",
    "theatrical key art",
    "key art",
    "movie key art",
    "entertainment marketing",
    "motion graphics designer",
    "visual designer",
    "poster design",
    "campaign design",
    "creative designer",
    "Los Angeles graphic designer",
    "Los Angeles key art designer",
  ],

  /* =====================================
     AUTHOR
  ===================================== */

  authors: [
    {
      name:
        "Leila Mirfakhraei",

      url:
        siteUrl,
    },
  ],

  creator:
    "Leila Mirfakhraei",

  publisher:
    "Leila Mirfakhraei",

  /* =====================================
     CANONICAL
  ===================================== */

  alternates: {
    canonical:
      "/",
  },

  /* =====================================
     FAVICON / SEARCH ICON
  ===================================== */

  icons: {
    icon: [
      {
        url:
          "/logo.png",

        type:
          "image/png",
      },
    ],

    shortcut: [
      {
        url:
          "/logo.png",

        type:
          "image/png",
      },
    ],

    apple: [
      {
        url:
          "/logo.png",

        type:
          "image/png",
      },
    ],
  },

  /* =====================================
     OPEN GRAPH
     LinkedIn / Discord / iMessage etc.
  ===================================== */

  openGraph: {
    type:
      "website",

    locale:
      "en_US",

    url:
      siteUrl,

    siteName:
      "Leila Mirfakhraei",

    title:
      "Leila Mirfakhraei | Graphic Designer & Key Art Designer",

    description:
      "Entertainment key art, theatrical campaigns, movie poster design, motion graphics, marketing, and visual storytelling by graphic designer Leila Mirfakhraei.",

    images: [
      {
        url:
          "/logo.png",

        width:
          1200,

        height:
          1200,

        alt:
          "Leila Mirfakhraei LM monogram logo",
      },
    ],
  },

  /* =====================================
     TWITTER / X
  ===================================== */

  twitter: {
    card:
      "summary_large_image",

    title:
      "Leila Mirfakhraei | Graphic Designer & Key Art Designer",

    description:
      "Entertainment key art, theatrical campaigns, movie poster design, motion graphics, marketing, and visual storytelling.",

    images: [
      "/logo.png",
    ],
  },

  /* =====================================
     SEARCH ENGINE CRAWLING
  ===================================== */

  robots: {
    index:
      true,

    follow:
      true,

    nocache:
      false,

    googleBot: {
      index:
        true,

      follow:
        true,

      noimageindex:
        false,

      "max-video-preview":
        -1,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,
    },
  },

  /* =====================================
     OTHER
  ===================================== */

  category:
    "design",

  applicationName:
    "Leila Mirfakhraei Portfolio",
};

/* =====================================
   VIEWPORT
===================================== */

export const viewport: Viewport = {
  width:
    "device-width",

  initialScale:
    1,

  themeColor:
    "#0f0f0f",

  colorScheme:
    "dark",
};

/* =====================================
   ROOT LAYOUT
===================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="bg-[#0f0f0f]"
      >
        <body className="min-h-screen bg-[#0f0f0f] text-[#F4EFE6] antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}