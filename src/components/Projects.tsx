"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiX, FiArrowUpRight } from "react-icons/fi";

type DatabaseCategory =
  | "PRODUCTION"
  | "USU_MARKETING"
  | "PERSONAL"
  | "MOTION_GRAPHICS";

type Category =
  | "Production"
  | "USU Marketing"
  | "Personal"
  | "Motion Graphics";

export type Project = {
  id: string;

  title: string;

  slug: string;

  category: DatabaseCategory;

  year: string | null;

  description: string;

  coverImage: string | null;

  oneSheets: string[];

  outdoor: string[];

  international: string[];

  gallery: string[];

  sortOrder: number;

  published: boolean;
};

type ProjectsProps = {
  projects: Project[];
};

const categories: Category[] = [
  "Production",
  "USU Marketing",
  "Personal",
  "Motion Graphics",
];

const categoryMap: Record<
  DatabaseCategory,
  Category
> = {
  PRODUCTION: "Production",

  USU_MARKETING: "USU Marketing",

  PERSONAL: "Personal",

  MOTION_GRAPHICS: "Motion Graphics",
};

export default function Projects({
  projects,
}: ProjectsProps) {
  const [activeCategory, setActiveCategory] =
    useState<Category>("Production");

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (project) =>
      categoryMap[project.category] ===
      activeCategory
  );

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <>
      <section
        id="projects"
        className="relative overflow-hidden bg-[#121212] px-5 py-20 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-24"
      >
        {/* =========================
            BACKGROUND
        ========================== */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-[#5B1E3A]/15 blur-[150px]" />

          <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1D3D44]/10 blur-[150px]" />
        </div>

        {/* top line */}

        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

        <div className="relative mx-auto max-w-[1320px]">
          {/* =========================
              HEADING
          ========================== */}

          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#D4AF37]" />

                <p className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]">
                  Selected Work
                </p>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl">
                Projects
                <span className="italic text-[#7E2A5A]">
                  .
                </span>
              </h2>
            </div>

            <p className="max-w-[420px] text-sm leading-6 text-[#F4EFE6]/50 md:text-right">
              A selection of entertainment,
              marketing, personal, and motion
              design work.
            </p>
          </div>

          {/* =========================
              CATEGORY NAV
          ========================== */}

          <div className="mb-10 overflow-x-auto border-y border-[#D4AF37]/15">
            <div className="flex min-w-max items-center gap-8 py-4 md:gap-10">
              {categories.map(
                (category) => {
                  const active =
                    activeCategory ===
                    category;

                  const count =
                    projects.filter(
                      (project) =>
                        categoryMap[
                          project.category
                        ] === category
                    ).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setActiveCategory(
                          category
                        )
                      }
                      className="group relative whitespace-nowrap py-2"
                    >
                      <span
                        className={`text-[9px] uppercase tracking-[0.32em] transition-colors duration-300 ${
                          active
                            ? "text-[#D4AF37]"
                            : "text-[#F4EFE6]/45 group-hover:text-[#F4EFE6]"
                        }`}
                      >
                        {category}
                      </span>

                      {count > 0 && (
                        <span className="ml-2 text-[7px] text-[#F4EFE6]/20">
                          {count
                            .toString()
                            .padStart(
                              2,
                              "0"
                            )}
                        </span>
                      )}

                      <span
                        className={`absolute bottom-0 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                          active
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* =========================
              EMPTY CATEGORY
          ========================== */}

          {filteredProjects.length ===
            0 && (
            <motion.div
              key={activeCategory}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="flex min-h-[280px] items-center justify-center border border-[#D4AF37]/10 bg-[#171414]/30 px-6 text-center"
            >
              <div>
                <p className="font-serif text-2xl text-[#F4EFE6]/50">
                  More work coming soon.
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/50">
                  {activeCategory}
                </p>
              </div>
            </motion.div>
          )}

          {/* =========================
              PROJECT GRID
          ========================== */}

          {filteredProjects.length >
            0 && (
            <motion.div
              layout
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map(
                  (
                    project,
                    index
                  ) => (
                    <motion.button
                      layout
                      key={
                        project.id
                      }
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 20,
                      }}
                      transition={{
                        duration:
                          0.45,
                        delay:
                          index *
                          0.05,
                      }}
                      onClick={() =>
                        setSelectedProject(
                          project
                        )
                      }
                      className="group relative overflow-hidden border border-[#D4AF37]/10 bg-[#0D0D0D] text-left"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {project.coverImage ? (
                          <img
                            src={
                              project.coverImage
                            }
                            alt={
                              project.title
                            }
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          />
                        ) : (
                          <ProjectPlaceholder
                            title={
                              project.title
                            }
                          />
                        )}

                        {/* Hover shadow */}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/95 via-[#5B1E3A]/20 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-90" />

                        {/* border */}

                        <div className="pointer-events-none absolute inset-3 border border-[#F4EFE6]/0 transition-colors duration-500 group-hover:border-[#D4AF37]/30" />

                        {/* year */}

                        {project.year && (
                          <div className="absolute left-5 top-5">
                            <p className="text-[8px] uppercase tracking-[0.35em] text-[#F4EFE6]/60">
                              {
                                project.year
                              }
                            </p>
                          </div>
                        )}

                        {/* bottom title */}

                        <div className="absolute bottom-5 right-5 max-w-[80%] translate-y-3 text-right opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="mb-2 text-[8px] uppercase tracking-[0.35em] text-[#D4AF37]">
                            {
                              categoryMap[
                                project
                                  .category
                              ]
                            }
                          </p>

                          <h3 className="font-serif text-2xl italic text-[#F4EFE6] sm:text-3xl">
                            {
                              project.title
                            }
                          </h3>

                          <div className="mt-3 flex items-center justify-end gap-2 text-[8px] uppercase tracking-[0.28em] text-[#F4EFE6]/60">
                            View Project
                            <FiArrowUpRight />
                          </div>
                        </div>

                        {/* Mobile information */}

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent px-5 pb-5 pt-16 md:hidden">
                          <p className="text-[7px] uppercase tracking-[0.3em] text-[#D4AF37]">
                            {
                              categoryMap[
                                project
                                  .category
                              ]
                            }
                          </p>

                          <p className="mt-1 font-serif text-xl italic">
                            {
                              project.title
                            }
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  )
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================
          PROJECT MODAL
      ========================== */}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={
              selectedProject
            }
            onClose={() =>
              setSelectedProject(
                null
              )
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* =====================================
   MODAL
===================================== */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const hasDeliverables =
    project.oneSheets.length > 0 ||
    project.outdoor.length > 0 ||
    project.international.length >
      0;

  const hasGallery =
    project.gallery.length > 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-[100] bg-black/85 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-6"
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 30,
          scale: 0.98,
        }}
        transition={{
          duration: 0.4,
          ease: [
            0.22,
            1,
            0.36,
            1,
          ],
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
        className="relative mx-auto flex h-full max-w-[1250px] flex-col overflow-hidden border border-[#D4AF37]/20 bg-[#101010] text-[#F4EFE6]"
      >
        {/* =========================
            STATIC HEADER
        ========================== */}

        <div className="relative z-50 flex shrink-0 items-center justify-between border-b border-[#D4AF37]/15 bg-[#101010]/95 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
          <div>
            <p className="mb-1 text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
              Project Details
            </p>

            <p className="font-serif text-lg sm:text-xl">
              {project.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F4EFE6]/30 text-xl transition-all duration-300 hover:rotate-90 hover:border-[#D4AF37] hover:text-[#D4AF37] sm:h-12 sm:w-12"
          >
            <FiX />
          </button>
        </div>

        {/* =========================
            SCROLLABLE CONTENT
        ========================== */}

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            {/* HERO IMAGE */}

            {project.coverImage ? (
              <div className="relative overflow-hidden border border-[#D4AF37]/15">
                <img
                  src={
                    project.coverImage
                  }
                  alt={
                    project.title
                  }
                  className="max-h-[670px] w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121212]/45 via-transparent to-transparent" />
              </div>
            ) : (
              <div className="relative aspect-[16/8] overflow-hidden border border-[#D4AF37]/15">
                <ProjectPlaceholder
                  title={
                    project.title
                  }
                />
              </div>
            )}

            {/* =========================
                MAIN DETAILS
            ========================== */}

            <div className="py-10 md:py-14">
              <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-start">
                <div>
                  <p className="mb-3 text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
                    {
                      categoryMap[
                        project
                          .category
                      ]
                    }

                    {project.year &&
                      ` • ${project.year}`}
                  </p>

                  <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl">
                    {project.title}
                  </h2>
                </div>

                <p className="text-sm leading-7 text-[#F4EFE6]/60 sm:text-[15px]">
                  {
                    project.description
                  }
                </p>
              </div>
            </div>

            {/* =========================
                DELIVERABLES
            ========================== */}

            {hasDeliverables && (
              <div
                className={`grid gap-4 ${
                  [
                    project
                      .oneSheets,
                    project.outdoor,
                    project
                      .international,
                  ].filter(
                    (items) =>
                      items.length >
                      0
                  ).length === 1
                    ? "md:grid-cols-1"
                    : [
                          project
                            .oneSheets,
                          project
                            .outdoor,
                          project
                            .international,
                        ].filter(
                          (
                            items
                          ) =>
                            items.length >
                            0
                        ).length ===
                        2
                      ? "md:grid-cols-2"
                      : "md:grid-cols-3"
                }`}
              >
                {project.oneSheets
                  .length >
                  0 && (
                  <DetailList
                    title="One Sheets"
                    items={
                      project.oneSheets
                    }
                  />
                )}

                {project.outdoor
                  .length >
                  0 && (
                  <DetailList
                    title="Outdoor"
                    items={
                      project.outdoor
                    }
                  />
                )}

                {project
                  .international
                  .length >
                  0 && (
                  <DetailList
                    title="International"
                    items={
                      project
                        .international
                    }
                  />
                )}
              </div>
            )}

            {/* =========================
                ADDITIONAL WORK
            ========================== */}

            {hasGallery && (
              <div className="mt-14 border-t border-[#D4AF37]/15 pt-10">
                <div className="mb-7 flex items-end justify-between gap-6">
                  <div>
                    <p className="mb-2 text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
                      Project Gallery
                    </p>

                    <h3 className="font-serif text-3xl sm:text-4xl">
                      Additional
                      Work
                    </h3>
                  </div>

                  <p className="hidden text-[8px] uppercase tracking-[0.35em] text-[#725563] sm:block">
                    Explore the
                    campaign
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.gallery.map(
                    (
                      image,
                      index
                    ) => (
                      <motion.div
                        key={`${image}-${index}`}
                        initial={{
                          opacity:
                            0,
                          y: 20,
                        }}
                        whileInView={{
                          opacity:
                            1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount:
                            0.15,
                        }}
                        transition={{
                          duration:
                            0.5,
                          delay:
                            index *
                            0.05,
                        }}
                        className={`overflow-hidden border border-[#D4AF37]/10 ${
                          index %
                            3 ===
                          0
                            ? "md:col-span-2"
                            : ""
                        }`}
                      >
                        <img
                          src={
                            image
                          }
                          alt={`${project.title} artwork ${
                            index +
                            1
                          }`}
                          className={`w-full object-cover ${
                            index %
                              3 ===
                            0
                              ? "max-h-[700px]"
                              : "h-full min-h-[320px]"
                          }`}
                        />
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* END */}

            <div className="mt-14 flex items-center justify-center gap-4 pb-5">
              <span className="h-px w-12 bg-[#D4AF37]/30" />

              <span className="h-2 w-2 rotate-45 border border-[#D4AF37]" />

              <span className="h-px w-12 bg-[#D4AF37]/30" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =====================================
   DETAIL LIST
===================================== */

function DetailList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border border-[#D4AF37]/15 bg-[#171414] p-6 sm:p-7">
      <p className="mb-5 text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">
        {title}
      </p>

      <ul className="space-y-4">
        {items.map(
          (
            item,
            index
          ) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-3 text-sm leading-6 text-[#F4EFE6]/65"
            >
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#7E2A5A]" />

              <span>
                {item}
              </span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

/* =====================================
   NO IMAGE PLACEHOLDER
===================================== */

function ProjectPlaceholder({
  title,
}: {
  title: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#171414]">
      <div className="absolute left-[15%] top-[20%] h-[180px] w-[180px] rounded-full bg-[#5B1E3A]/20 blur-[80px]" />

      <div className="absolute bottom-[10%] right-[12%] h-[160px] w-[160px] rounded-full bg-[#D4AF37]/5 blur-[80px]" />

      <div className="relative text-center">
        <div className="mx-auto mb-4 h-8 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

        <p className="text-[7px] uppercase tracking-[0.4em] text-[#D4AF37]/50">
          Artwork Coming Soon
        </p>

        <p className="mt-2 max-w-[280px] font-serif text-xl italic text-[#F4EFE6]/30">
          {title}
        </p>
      </div>
    </div>
  );
}