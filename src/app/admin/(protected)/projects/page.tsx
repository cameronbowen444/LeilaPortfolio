import Link from "next/link";

import {
  FiEdit2,
  FiPlus,
} from "react-icons/fi";

import { prisma } from "@/lib/prisma";

import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

const categoryNames = {
  PRODUCTION:
    "Production",

  USU_MARKETING:
    "USU Marketing",

  PERSONAL:
    "Personal",

  MOTION_GRAPHICS:
    "Motion Graphics",
};

export default async function AdminProjectsPage() {
  const projects =
    await prisma.project.findMany({
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
              Projects
            </h1>

            <p className="mt-3 text-sm text-[#F4EFE6]/40">
              Manage portfolio projects and campaign artwork.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="flex w-fit items-center gap-2 border border-[#D4AF37]/35 px-4 py-3 text-[8px] uppercase tracking-[0.22em] text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#121212]"
          >
            <FiPlus />
            Add Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="border border-[#D4AF37]/12 bg-[#171414] px-6 py-16 text-center">
            <p className="font-serif text-2xl">
              No projects added yet.
            </p>

            <p className="mt-3 text-sm text-[#F4EFE6]/35">
              Add Leila&apos;s first portfolio project.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-6 inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.25em] text-[#D4AF37]"
            >
              <FiPlus />
              Add Project
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map(
              (project) => (
                <div
                  key={
                    project.id
                  }
                  className="flex flex-col gap-5 border border-[#D4AF37]/10 bg-[#171414] p-4 transition hover:border-[#D4AF37]/25 sm:flex-row sm:items-center"
                >
                  {/* IMAGE */}

                  <div className="h-[120px] w-[90px] shrink-0 overflow-hidden border border-[#D4AF37]/10 bg-[#101010]">
                    {project.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          project.coverImage
                        }
                        alt={
                          project.title
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[7px] uppercase tracking-[0.2em] text-[#F4EFE6]/15">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* INFO */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[7px] uppercase tracking-[0.25em] text-[#D4AF37]">
                        {
                          categoryNames[
                            project.category
                          ]
                        }
                      </span>

                      {!project.published && (
                        <span className="border border-[#7E2A5A]/25 px-2 py-1 text-[6px] uppercase tracking-[0.18em] text-[#7E2A5A]">
                          Draft
                        </span>
                      )}
                    </div>

                    <h2 className="mt-2 font-serif text-xl">
                      {
                        project.title
                      }
                    </h2>

                    {project.year && (
                      <p className="mt-1 text-[9px] text-[#F4EFE6]/30">
                        {
                          project.year
                        }
                      </p>
                    )}

                    <p className="mt-2 line-clamp-2 max-w-[700px] text-xs leading-5 text-[#F4EFE6]/35">
                      {
                        project.description
                      }
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.oneSheets
                        .slice(
                          0,
                          2
                        )
                        .map(
                          (
                            item
                          ) => (
                            <span
                              key={
                                item
                              }
                              className="border border-[#D4AF37]/10 px-2 py-1 text-[6px] uppercase tracking-[0.15em] text-[#F4EFE6]/30"
                            >
                              {
                                item
                              }
                            </span>
                          )
                        )}
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-2 sm:ml-auto">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="flex h-9 w-9 items-center justify-center border border-[#D4AF37]/15 text-[#F4EFE6]/40 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                    >
                      <FiEdit2 />
                    </Link>

                    <DeleteProjectButton
                      id={
                        project.id
                      }
                      title={
                        project.title
                      }
                    />
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