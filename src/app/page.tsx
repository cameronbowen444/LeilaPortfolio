import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Technologies from "@/components/Technologies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { prisma } from "@/lib/prisma";

export const dynamic =
  "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://leilamirfakhraei.com";

export default async function Home() {
  const [
    projects,
    experience,
  ] = await Promise.all([
    prisma.project.findMany({
      where: {
        published: true,
      },

      orderBy: [
        {
          sortOrder:
            "asc",
        },
        {
          createdAt:
            "desc",
        },
      ],
    }),

    prisma.experience.findMany({
      orderBy: [
        {
          sortOrder:
            "asc",
        },
        {
          createdAt:
            "desc",
        },
      ],
    }),
  ]);

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "Person",

    name:
      "Leila Mirfakhraei",

    url:
      siteUrl,

    image:
      `${siteUrl}/logo.png`,

    jobTitle:
      "Graphic Designer & Key Art Designer",

    description:
      "Graphic designer specializing in entertainment key art, theatrical campaigns, movie poster design, motion graphics, marketing, and visual storytelling.",

    knowsAbout: [
      "Graphic Design",
      "Key Art",
      "Entertainment Design",
      "Movie Poster Design",
      "Theatrical Campaigns",
      "Motion Graphics",
      "Marketing Design",
      "Visual Storytelling",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe InDesign",
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Figma",
      "Blender",
      "Cinema 4D",
    ],

    sameAs: [],
  };

  return (
    <>
      {/* =====================================
          STRUCTURED DATA / SEO
      ===================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData
            ),
        }}
      />

      {/* =====================================
          SITE
      ===================================== */}

      <main className="min-h-screen bg-[#121212] text-[#F4EFE6]">
        <Navbar />

        <Hero />

        <About />

        <Projects
          projects={
            projects
          }
        />

        <Experience
          experience={
            experience
          }
        />

        <Technologies />

        <Contact />

        <Footer />
      </main>
    </>
  );
}