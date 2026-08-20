import type {
  MetadataRoute,
} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://leila-portfolio-eta.vercel.app";

  return [
    {
      url:
        siteUrl,

      lastModified:
        new Date(),

      changeFrequency:
        "monthly",

      priority:
        1,
    },
  ];
}