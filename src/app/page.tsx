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
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    }),

    prisma.experience.findMany({
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    }),
  ]);

  return (
    <main className="min-h-screen bg-[#121212] text-[#F4EFE6]">
      <Navbar />

      <Hero />

      <About />

      <Projects
        projects={projects}
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
  );
}