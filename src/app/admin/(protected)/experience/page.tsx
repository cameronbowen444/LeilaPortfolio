import Link from "next/link";

import {
  FiEdit2,
  FiPlus,
} from "react-icons/fi";

import { prisma } from "@/lib/prisma";
import DeleteExperienceButton from "@/components/admin/DeleteExperienceButton";

export default async function AdminExperiencePage() {
  const experience = await prisma.experience.findMany({
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
              Portfolio Content
            </p>

            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
              Experience
            </h1>

            <p className="mt-3 text-sm text-[#F4EFE6]/40">
              Manage professional roles shown on the portfolio.
            </p>
          </div>

          <Link
            href="/admin/experience/new"
            className="flex w-fit items-center gap-2 border border-[#D4AF37]/35 px-4 py-3 text-[8px] uppercase tracking-[0.22em] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#121212]"
          >
            <FiPlus />
            Add Experience
          </Link>
        </div>

        {/* Empty state */}
        {experience.length === 0 ? (
          <div className="border border-[#D4AF37]/12 bg-[#171414] px-6 py-16 text-center">
            <p className="font-serif text-2xl">
              No experience added yet.
            </p>

            <p className="mt-3 text-sm text-[#F4EFE6]/35">
              Add Leila&apos;s first professional role.
            </p>

            <Link
              href="/admin/experience/new"
              className="mt-6 inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.25em] text-[#D4AF37]"
            >
              <FiPlus />
              Add Experience
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {experience.map((item, index) => (
              <div
                key={item.id}
                className="group flex flex-col gap-5 border border-[#D4AF37]/10 bg-[#171414] p-5 transition hover:border-[#D4AF37]/25 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left */}
                <div className="flex min-w-0 gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D4AF37]/15 bg-[#121212] font-serif text-sm text-[#D4AF37]">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[7px] uppercase tracking-[0.3em] text-[#D4AF37]">
                        {item.period}
                      </p>

                      {item.current && (
                        <span className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-2 py-1 text-[6px] uppercase tracking-[0.2em] text-[#D4AF37]">
                          Current
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 font-serif text-xl">
                      {item.role}
                    </h2>

                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#7E2A5A]">
                      {item.company}
                    </p>

                    {item.location && (
                      <p className="mt-2 text-xs text-[#F4EFE6]/30">
                        {item.location}
                      </p>
                    )}

                    {item.highlights.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="border border-[#D4AF37]/10 px-2 py-1 text-[6px] uppercase tracking-[0.15em] text-[#F4EFE6]/30"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:shrink-0">
                  <Link
                    href={`/admin/experience/${item.id}/edit`}
                    title="Edit experience"
                    className="flex h-9 w-9 items-center justify-center border border-[#D4AF37]/15 text-[#F4EFE6]/40 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                  >
                    <FiEdit2 />
                  </Link>

                  <DeleteExperienceButton
                    id={item.id}
                    company={item.company}
                    role={item.role}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}