"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  FiArrowUpRight,
  FiFilm,
  FiImage,
  FiLoader,
  FiPlay,
  FiX,
} from "react-icons/fi";

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
  previewVideo: string | null;
  videoPoster: string | null;
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
  const [
    activeCategory,
    setActiveCategory,
  ] = useState<Category>(
    "Production"
  );

  const [
    selectedProject,
    setSelectedProject,
  ] = useState<Project | null>(
    null
  );

  const filteredProjects =
    projects.filter(
      (project) =>
        categoryMap[
          project.category
        ] === activeCategory
    );

  useEffect(() => {
    document.body.style.overflow =
      selectedProject
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [selectedProject]);

  return (
    <>
      <section
        id="projects"
        className="relative overflow-hidden bg-[#121212] px-5 py-20 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-[#5B1E3A]/15 blur-[150px]" />
          <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#1D3D44]/10 blur-[150px]" />
        </div>

        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

        <div className="relative mx-auto max-w-[1320px]">
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
              marketing, personal, and
              motion design work.
            </p>
          </div>

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
                          project
                            .category
                        ] ===
                        category
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

          {filteredProjects.length >
            0 && (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map(
                  (
                    project,
                    index
                  ) => (
                    <motion.button
                      layout
                      key={project.id}
                      initial={{
                        opacity: 0,
                        y: 18,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: 18,
                      }}
                      transition={{
                        duration:
                          0.4,
                        delay:
                          index *
                          0.04,
                      }}
                      onClick={() =>
                        setSelectedProject(
                          project
                        )
                      }
                      className="group text-left"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden border border-[#D4AF37]/10 bg-[#0D0D0D]">
                        <ProjectCardMedia
                          project={
                            project
                          }
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/95 via-transparent to-black/10" />

                        <div className="pointer-events-none absolute inset-3 border border-[#F4EFE6]/0 transition-colors duration-500 group-hover:border-[#D4AF37]/30" />

                        {project.category ===
                          "MOTION_GRAPHICS" &&
                          project.previewVideo && (
                            <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#0D0D0D]/75 text-[#D4AF37] backdrop-blur">
                              <FiPlay className="ml-0.5 text-xs" />
                            </div>
                          )}

                        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-16">
                          <div className="mb-2 flex items-center justify-between gap-4">
                            <p className="text-[7px] uppercase tracking-[0.3em] text-[#D4AF37]">
                              {
                                categoryMap[
                                  project
                                    .category
                                ]
                              }
                            </p>

                            {project.year && (
                              <span className="text-[7px] tracking-[0.22em] text-[#F4EFE6]/35">
                                {
                                  project.year
                                }
                              </span>
                            )}
                          </div>

                          <h3 className="font-serif text-xl leading-tight italic sm:text-2xl">
                            {
                              project.title
                            }
                          </h3>

                          <div className="mt-3 flex items-center gap-2 text-[7px] uppercase tracking-[0.28em] text-[#F4EFE6]/40 transition-colors group-hover:text-[#D4AF37]">
                            View Project
                            <FiArrowUpRight />
                          </div>
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

function ProjectCardMedia({
  project,
}: {
  project: Project;
}) {
  const source =
    project.coverImage ||
    project.videoPoster;

  if (!source) {
    return (
      <ProjectPlaceholder
        title={
          project.title
        }
      />
    );
  }

  return (
    <LoadedImage
      src={source}
      alt={project.title}
      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      wrapperClassName="absolute inset-0 flex items-center justify-center bg-[#0B0B0B]"
    />
  );
}

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

  const isMotion =
    project.category ===
    "MOTION_GRAPHICS";

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/88 p-3 backdrop-blur-md sm:p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 28,
          scale: 0.985,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.985,
        }}
        transition={{
          duration: 0.35,
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
        className="relative mx-auto flex h-[calc(100dvh-24px)] w-full max-w-[1120px] flex-col overflow-hidden border border-[#D4AF37]/20 bg-[#101010] text-[#F4EFE6] shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:h-[calc(100dvh-40px)]"
      >
        <div className="relative z-50 flex shrink-0 items-center justify-between border-b border-[#D4AF37]/15 bg-[#101010] px-5 py-4 sm:px-7">
          <div className="min-w-0 pr-5">
            <p className="mb-1 text-[7px] uppercase tracking-[0.38em] text-[#D4AF37]">
              {
                categoryMap[
                  project.category
                ]
              }
              {project.year &&
                ` • ${project.year}`}
            </p>

            <p className="truncate font-serif text-lg sm:text-xl">
              {project.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#F4EFE6]/25 text-lg transition hover:rotate-90 hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <FiX />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="p-5 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="lg:sticky lg:top-[96px]">
              {isMotion &&
              project.previewVideo ? (
                <LoadedVideo
                  src={
                    project.previewVideo
                  }
                  poster={
                    project.videoPoster ||
                    project.coverImage ||
                    undefined
                  }
                  title={
                    project.title
                  }
                />
              ) : project.coverImage ? (
                <LoadedImage
                  src={
                    project.coverImage
                  }
                  alt={
                    project.title
                  }
                  className="max-h-[72vh] w-full object-contain"
                  wrapperClassName="flex min-h-[420px] items-center justify-center overflow-hidden border border-[#D4AF37]/15 bg-[#090909] p-3 sm:min-h-[520px]"
                />
              ) : (
                <div className="relative aspect-[2/3] overflow-hidden border border-[#D4AF37]/15">
                  <ProjectPlaceholder
                    title={
                      project.title
                    }
                  />
                </div>
              )}

              {isMotion &&
                project.previewVideo && (
                  <div className="mt-3 flex items-center gap-2 text-[8px] uppercase tracking-[0.28em] text-[#F4EFE6]/30">
                    <FiFilm className="text-[#D4AF37]" />
                    Motion Preview
                  </div>
                )}
            </div>

            <div>
              <p className="mb-3 text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
                Project Details
              </p>

              <h2 className="font-serif text-4xl leading-[0.98] sm:text-5xl lg:text-[58px]">
                {project.title}
              </h2>

              <p className="mt-6 max-w-[620px] text-[14px] leading-7 text-[#F4EFE6]/58 sm:text-[15px]">
                {project.description}
              </p>

              {hasDeliverables && (
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {project.oneSheets
                    .length > 0 && (
                    <DetailList
                      title="One Sheets"
                      items={
                        project.oneSheets
                      }
                    />
                  )}

                  {project.outdoor
                    .length > 0 && (
                    <DetailList
                      title="Outdoor"
                      items={
                        project.outdoor
                      }
                    />
                  )}

                  {project
                    .international
                    .length > 0 && (
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
            </div>
          </div>

          {hasGallery && (
            <div className="mt-10 border-t border-[#D4AF37]/15 pt-8 sm:mt-12">
              <div className="mb-6">
                <p className="mb-2 text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
                  Project Gallery
                </p>

                <h3 className="font-serif text-3xl sm:text-4xl">
                  Additional Work
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map(
                  (
                    image,
                    index
                  ) => (
                    <motion.div
                      key={`${image}-${index}`}
                      initial={{
                        opacity: 0,
                        y: 16,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.12,
                      }}
                      transition={{
                        duration: 0.4,
                        delay:
                          index *
                          0.035,
                      }}
                      className="flex min-h-[280px] items-center justify-center overflow-hidden border border-[#D4AF37]/10 bg-[#090909] p-2"
                    >
                      <LoadedImage
                        src={image}
                        alt={`${project.title} artwork ${
                          index + 1
                        }`}
                        className="max-h-[520px] w-full object-contain"
                        wrapperClassName="flex h-full w-full items-center justify-center"
                      />
                    </motion.div>
                  )
                )}
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-center gap-4 pb-2">
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

function LoadedImage({
  src,
  alt,
  className,
  wrapperClassName,
}: {
  src: string;
  alt: string;
  className: string;
  wrapperClassName?: string;
}) {
  const imageRef =
    useRef<HTMLImageElement | null>(
      null
    );

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  const [
    failed,
    setFailed,
  ] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);

    const image =
      imageRef.current;

    if (
      image?.complete &&
      image.naturalWidth > 0
    ) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={`relative ${
        wrapperClassName || ""
      }`}
    >
      <AnimatePresence>
        {!loaded && !failed && (
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
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#0D0D0D]"
          >
            <div className="flex flex-col items-center gap-3">
              <FiLoader className="animate-spin text-lg text-[#D4AF37]" />

              <span className="text-[7px] uppercase tracking-[0.3em] text-[#F4EFE6]/25">
                Loading Artwork
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {failed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0D0D0D] px-6 text-center">
          <div>
            <FiImage className="mx-auto text-xl text-[#D4AF37]/50" />

            <p className="mt-3 text-[8px] uppercase tracking-[0.28em] text-[#F4EFE6]/30">
              Artwork unavailable
            </p>
          </div>
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => {
          setLoaded(true);
          setFailed(false);
        }}
        onError={() => {
          setLoaded(false);
          setFailed(true);

          console.error(
            "PROJECT IMAGE FAILED TO LOAD:",
            src
          );
        }}
        className={`${className} transition-opacity duration-500 ${
          loaded
            ? "opacity-100"
            : "opacity-0"
        }`}
      />
    </div>
  );
}

function LoadedVideo({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const [
    loaded,
    setLoaded,
  ] = useState(false);

  return (
    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden border border-[#D4AF37]/15 bg-black sm:min-h-[420px]">
      <AnimatePresence>
        {!loaded && (
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
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#0B0B0B]"
          >
            <div className="flex flex-col items-center gap-3">
              <FiLoader className="animate-spin text-xl text-[#D4AF37]" />
              <span className="text-[7px] uppercase tracking-[0.3em] text-[#F4EFE6]/25">
                Loading Motion
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        onLoadedData={() =>
          setLoaded(true)
        }
        onCanPlay={() =>
          setLoaded(true)
        }
        aria-label={`${title} motion preview`}
        className={`max-h-[72vh] w-full object-contain transition-opacity duration-500 ${
          loaded
            ? "opacity-100"
            : "opacity-0"
        }`}
      />
    </div>
  );
}

function DetailList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border border-[#D4AF37]/12 bg-[#171414] p-5">
      <p className="mb-4 text-[8px] uppercase tracking-[0.35em] text-[#D4AF37]">
        {title}
      </p>

      <ul className="space-y-3">
        {items.map(
          (
            item,
            index
          ) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-3 text-[13px] leading-5 text-[#F4EFE6]/60"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#7E2A5A]" />
              <span>{item}</span>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function ProjectPlaceholder({
  title,
}: {
  title: string;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#171414]">
      <div className="absolute left-[15%] top-[20%] h-[180px] w-[180px] rounded-full bg-[#5B1E3A]/20 blur-[80px]" />
      <div className="absolute bottom-[10%] right-[12%] h-[160px] w-[160px] rounded-full bg-[#D4AF37]/5 blur-[80px]" />

      <div className="relative px-6 text-center">
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