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
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">
              Portfolio Content
            </p>

            <h1 className="mt-2 font-serif text-[34px] leading-tight sm:text-[40px]">
              Experience
            </h1>

            <p className="mt-3 text-[14px] leading-6 text-[#F4EFE6]/42">
              Manage professional roles shown on the portfolio.
            </p>
          </div>

          <Link
            href="/admin/experience/new"
            className="group flex w-fit items-center gap-2.5 border border-[#D4AF37]/35 px-4 py-3 text-[9px] uppercase tracking-[0.22em] text-[#D4AF37] transition duration-300 hover:bg-[#D4AF37] hover:text-[#121212]"
          >
            <FiPlus className="text-sm" />

            Add Experience
          </Link>
        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {experience.length === 0 ? (
          <div className="border border-[#D4AF37]/12 bg-[#171414] px-6 py-16 text-center">
            <p className="font-serif text-[26px]">
              No experience added yet.
            </p>

            <p className="mt-3 text-[14px] text-[#F4EFE6]/35">
              Add Leila&apos;s first professional role.
            </p>

            <Link
              href="/admin/experience/new"
              className="mt-6 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] transition hover:text-[#F4EFE6]"
            >
              <FiPlus />

              Add Experience
            </Link>
          </div>
        ) : (
          /* =====================================
              EXPERIENCE LIST
          ===================================== */

          <div className="space-y-4">
            {experience.map((item, index) => (
              <div
                key={item.id}
                className="group relative overflow-hidden border border-[#D4AF37]/10 bg-[#171414] p-5 transition duration-300 hover:border-[#D4AF37]/25 sm:p-6"
              >
                {/* subtle hover atmosphere */}

                <div className="pointer-events-none absolute -right-24 -top-24 h-[180px] w-[180px] rounded-full bg-[#7E2A5A]/0 blur-[85px] transition duration-500 group-hover:bg-[#7E2A5A]/8" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* =====================================
                      LEFT
                  ===================================== */}

                  <div className="flex min-w-0 gap-4 sm:gap-5">
                    {/* INDEX */}

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#D4AF37]/18 bg-[#121212] font-serif text-[15px] text-[#D4AF37]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-[8px] uppercase tracking-[0.32em] text-[#D4AF37]">
                          {item.period}
                        </p>

                        {item.current && (
                          <span className="border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-2.5 py-1 text-[7px] uppercase tracking-[0.2em] text-[#D4AF37]">
                            Current
                          </span>
                        )}
                      </div>

                      <h2 className="mt-2 font-serif text-[22px] leading-tight sm:text-[24px]">
                        {item.role}
                      </h2>

                      <p className="mt-1.5 text-[13px] uppercase tracking-[0.14em] text-[#8A345F]">
                        {item.company}
                      </p>

                      {item.location && (
                        <p className="mt-2 text-[13px] text-[#F4EFE6]/32">
                          {item.location}
                        </p>
                      )}

                      {item.highlights.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="border border-[#D4AF37]/10 bg-[#121212]/40 px-2.5 py-1.5 text-[7px] uppercase tracking-[0.16em] text-[#F4EFE6]/35"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* =====================================
                      ACTIONS
                  ===================================== */}

                  <div className="flex items-center gap-2 sm:shrink-0">
                    <Link
                      href={`/admin/experience/${item.id}/edit`}
                      title="Edit experience"
                      className="flex h-10 w-10 items-center justify-center border border-[#D4AF37]/15 text-[15px] text-[#F4EFE6]/40 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]"
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}