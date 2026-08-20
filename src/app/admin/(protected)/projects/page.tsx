import Link from "next/link";

import {
  FiEdit2,
  FiPlus,
} from "react-icons/fi";

import { prisma } from "@/lib/prisma";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

const categoryNames = {
  PRODUCTION: "Production",
  USU_MARKETING: "USU Marketing",
  PERSONAL: "Personal",
  MOTION_GRAPHICS: "Motion Graphics",
};

export default async function AdminProjectsPage() {
  const projects =
    await prisma.project.findMany({
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
              Projects
            </h1>

            <p className="mt-3 text-[14px] leading-6 text-[#F4EFE6]/42">
              Manage portfolio projects, campaign artwork, and supporting
              visuals.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="group flex w-fit items-center gap-2.5 border border-[#D4AF37]/35 px-4 py-3 text-[9px] uppercase tracking-[0.22em] text-[#D4AF37] transition duration-300 hover:bg-[#D4AF37] hover:text-[#121212]"
          >
            <FiPlus className="text-sm" />

            Add Project
          </Link>
        </div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {projects.length === 0 ? (
          <div className="border border-[#D4AF37]/12 bg-[#171414] px-6 py-16 text-center">
            <p className="font-serif text-[26px]">
              No projects added yet.
            </p>

            <p className="mt-3 text-[14px] text-[#F4EFE6]/35">
              Add Leila&apos;s first portfolio project.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] transition hover:text-[#F4EFE6]"
            >
              <FiPlus />

              Add Project
            </Link>
          </div>
        ) : (
          /* =====================================
              PROJECT LIST
          ===================================== */

          <div className="space-y-4">
            {projects.map(
              (project, index) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden border border-[#D4AF37]/10 bg-[#171414] p-5 transition duration-300 hover:border-[#D4AF37]/25 sm:p-6"
                >
                  {/* subtle hover atmosphere */}

                  <div className="pointer-events-none absolute -right-24 -top-24 h-[190px] w-[190px] rounded-full bg-[#7E2A5A]/0 blur-[90px] transition duration-500 group-hover:bg-[#7E2A5A]/8" />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* =====================================
                        IMAGE
                    ===================================== */}

                    <div className="relative h-[140px] w-[105px] shrink-0 overflow-hidden border border-[#D4AF37]/12 bg-[#101010]">
                      {project.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center px-3 text-center text-[8px] uppercase tracking-[0.2em] text-[#F4EFE6]/18">
                          No Image
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-[5px] border border-[#D4AF37]/8" />

                      <div className="absolute bottom-2 left-2 border border-[#D4AF37]/15 bg-[#121212]/85 px-2 py-1 backdrop-blur-sm">
                        <span className="font-serif text-[11px] text-[#D4AF37]/65">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* =====================================
                        INFO
                    ===================================== */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37]">
                          {
                            categoryNames[
                              project.category
                            ]
                          }
                        </span>

                        {project.published ? (
                          <span className="border border-[#D4AF37]/15 bg-[#D4AF37]/[0.04] px-2.5 py-1 text-[7px] uppercase tracking-[0.18em] text-[#D4AF37]/65">
                            Published
                          </span>
                        ) : (
                          <span className="border border-[#7E2A5A]/25 bg-[#7E2A5A]/[0.04] px-2.5 py-1 text-[7px] uppercase tracking-[0.18em] text-[#A95F84]">
                            Draft
                          </span>
                        )}
                      </div>

                      <h2 className="mt-2 font-serif text-[23px] leading-tight sm:text-[25px]">
                        {project.title}
                      </h2>

                      {project.year && (
                        <p className="mt-1.5 text-[12px] uppercase tracking-[0.15em] text-[#F4EFE6]/28">
                          {project.year}
                        </p>
                      )}

                      <p className="mt-3 line-clamp-2 max-w-[720px] text-[13px] leading-6 text-[#F4EFE6]/38">
                        {project.description}
                      </p>

                      {/* =====================================
                          SUPPORTING CONTENT
                      ===================================== */}

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {project.oneSheets
                          .slice(0, 3)
                          .map((item) => (
                            <span
                              key={item}
                              className="border border-[#D4AF37]/10 bg-[#121212]/40 px-2.5 py-1.5 text-[7px] uppercase tracking-[0.16em] text-[#F4EFE6]/35"
                            >
                              {item}
                            </span>
                          ))}

                        {project.oneSheets.length > 3 && (
                          <span className="text-[8px] uppercase tracking-[0.16em] text-[#F4EFE6]/25">
                            +{project.oneSheets.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* =====================================
                        ACTIONS
                    ===================================== */}

                    <div className="flex items-center gap-2 sm:ml-auto sm:shrink-0">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        title="Edit project"
                        className="flex h-10 w-10 items-center justify-center border border-[#D4AF37]/15 text-[15px] text-[#F4EFE6]/40 transition duration-300 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 hover:text-[#D4AF37]"
                      >
                        <FiEdit2 />
                      </Link>

                      <DeleteProjectButton
                        id={project.id}
                        title={project.title}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}