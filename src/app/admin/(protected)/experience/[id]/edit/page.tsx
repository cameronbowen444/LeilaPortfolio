import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import ExperienceForm from "@/components/admin/ExperienceForm";

type EditExperiencePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;

  const experience = await prisma.experience.findUnique({
    where: {
      id,
    },
  });

  if (!experience) {
    notFound();
  }

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[900px]">
        <Link
          href="/admin/experience"
          className="text-[7px] uppercase tracking-[0.25em] text-[#F4EFE6]/35 transition hover:text-[#D4AF37]"
        >
          ← Back to Experience
        </Link>

        <div className="mb-8 mt-5">
          <p className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Portfolio Content
          </p>

          <h1 className="mt-2 font-serif text-3xl">
            Edit Experience
          </h1>

          <p className="mt-3 text-sm text-[#F4EFE6]/35">
            Update this role and save your changes.
          </p>
        </div>

        <div className="border border-[#D4AF37]/12 bg-[#171414] p-6 sm:p-8">
          <ExperienceForm
            initialData={{
              id: experience.id,
              company: experience.company,
              role: experience.role,
              location: experience.location ?? "",
              period: experience.period,
              description: experience.description,
              highlights: experience.highlights,
              current: experience.current,
              sortOrder: experience.sortOrder,
            }}
          />
        </div>
      </div>
    </div>
  );
}