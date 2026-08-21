"use client";

import {
  useRef,
  useState,
} from "react";

import {
  motion,
  useInView,
} from "motion/react";

import JourneyAnimation from "@/components/JourneyAnimation";

export default function About() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const isInView = useInView(
    sectionRef,
    {
      once: true,
      amount: 0.22,
    }
  );

  const [
    showStory,
    setShowStory,
  ] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#121212] px-5 py-24 text-[#F4EFE6] sm:px-7 sm:py-28 md:px-10 lg:px-12 lg:py-32"
    >
      {/* =====================================
          SECTION TOP LINE
      ===================================== */}

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />

      {/* =====================================
          BACKGROUND ATMOSPHERE
      ===================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-[10%] h-[460px] w-[460px] rounded-full bg-[#5B1E3A]/17 blur-[170px]" />

        <div className="absolute -right-40 bottom-[-40px] h-[470px] w-[470px] rounded-full bg-[#A45728]/10 blur-[180px]" />

        <div className="absolute left-1/2 top-[46%] h-[340px] w-[650px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.025] blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:repeating-linear-gradient(90deg,transparent_0px,transparent_170px,rgba(255,255,255,.18)_171px,transparent_172px)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* =====================================
            ABOUT HEADING
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.65,
          }}
          className="mb-10 md:mb-12"
        >
          <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
            <span className="h-px w-8 bg-[#D4AF37]" />

            <p className="text-[9px] uppercase tracking-[0.44em] text-[#D4AF37]">
              About • The Journey
            </p>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="font-serif text-[38px] leading-[0.98] sm:text-[46px] md:text-[52px] lg:text-[58px]">
              A story shaped
              <span className="block italic text-[#8A345F]">
                across two worlds.
              </span>
            </h2>
          </div>
        </motion.div>

        {/* =====================================
            MAIN PRODUCTION FRAME
        ===================================== */}

        <div className="mx-auto max-w-[1240px]">
          <motion.div
            initial={{
              opacity: 0,
              y: 28,
              scale: 0.985,
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="relative overflow-hidden border border-[#D4AF37]/25 bg-[#10100F] shadow-[0_35px_120px_rgba(0,0,0,0.58)]"
          >
            {/* =====================================
                FRAME CORNERS
            ===================================== */}

            <span className="pointer-events-none absolute left-3 top-3 z-31 h-7 w-7 border-l border-t border-[#D4AF37]/35" />

            <span className="pointer-events-none absolute right-3 top-3 z-31 h-7 w-7 border-r border-t border-[#D4AF37]/35" />

            <span className="pointer-events-none absolute bottom-3 left-3 z-31 h-7 w-7 border-b border-l border-[#D4AF37]/20" />

            <span className="pointer-events-none absolute bottom-3 right-3 z-30 h-7 w-7 border-b border-r border-[#D4AF37]/20" />

            {/* =====================================
                PRODUCTION HEADER
            ===================================== */}

            <div className="relative z-30 border-b border-[#D4AF37]/15 bg-[#0C0C0B]/95">
              {/* MOBILE HEADER */}

              <div className="flex min-h-[66px] items-center justify-center px-8 sm:hidden">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-[5px] w-[5px] rotate-45 border border-[#D4AF37]/80" />

                    <p className="text-[7px] uppercase tracking-[0.29em] text-[#D4AF37]/90">
                      A Journey Across Worlds
                    </p>

                    <span className="h-[5px] w-[5px] rotate-45 border border-[#D4AF37]/80" />
                  </div>

                  <p className="mt-2 font-serif text-[11px] italic text-[#F4EFE6]/30">
                    Iran → United States
                  </p>
                </div>
              </div>

              {/* DESKTOP HEADER */}

              <div className="hidden min-h-[66px] items-center justify-between px-8 sm:flex lg:px-10">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-7 w-7 items-center justify-center">
                    <span className="absolute h-[7px] w-[7px] rotate-45 border border-[#D4AF37]/70" />
                  </div>

                  <div>
                    <p className="text-[8px] uppercase tracking-[0.48em] text-[#D4AF37]/85 sm:text-[9px]">
                      A Journey Across Worlds
                    </p>

                    <p className="mt-1 font-serif text-xs italic text-[#F4EFE6]/25">
                      Visual Story • Chapter One
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-4 md:flex">
                  <p className="text-[7px] uppercase tracking-[0.36em] text-[#F4EFE6]/25">
                    Origin
                  </p>

                  <span className="h-px w-8 bg-[#D4AF37]/25" />

                  <p className="font-serif text-sm italic text-[#D4AF37]/45">
                    Iran → United States
                  </p>
                </div>
              </div>
            </div>

            {/* =====================================
                CONTENT VIEWPORT
            ===================================== */}

            <div className="relative h-[760px] sm:h-[730px] md:h-[620px] lg:h-[650px]">
              {/* =====================================
                  JOURNEY ANIMATION
              ===================================== */}

              {!showStory && (
                <JourneyAnimation
                  onComplete={() => {
                    setShowStory(
                      true
                    );
                  }}
                />
              )}

              {/* =====================================
                  STORY REVEAL
              ===================================== */}

              {showStory && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.985,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="absolute inset-0 pointer-events-auto"
                >
                {/* =====================================
                    STORY BACKGROUND
                ===================================== */}

                <div className="absolute inset-0 bg-[#121212]" />

                <div className="absolute -left-40 top-[-120px] h-[440px] w-[440px] rounded-full bg-[#5B1E3A]/24 blur-[160px]" />

                <div className="absolute -bottom-48 right-[-100px] h-[440px] w-[440px] rounded-full bg-[#A45728]/11 blur-[160px]" />

                <div className="absolute left-[42%] top-1/2 h-[300px] w-[480px] -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.025] blur-[120px]" />

                {/* production line */}

                <div className="pointer-events-none absolute left-[38%] top-[12%] hidden h-[76%] w-px bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent md:block" />

                {/* subtle texture */}

                <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:repeating-linear-gradient(0deg,transparent_0px,transparent_8px,rgba(255,255,255,.15)_9px,transparent_10px)]" />

                {/* =====================================
                    STORY CONTENT
                ===================================== */}

                <div className="relative z-10 flex h-full items-start px-6 pb-10 pt-9 sm:px-9 sm:pb-10 sm:pt-10 md:items-center md:px-14 md:py-10 lg:px-20 xl:px-24">
                  <div className="grid w-full gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14 lg:gap-20">
                    {/* =====================================
                        LEFT — PERSONAL WORK
                    ===================================== */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -22,
                      }}
                      animate={
                        showStory
                          ? {
                              opacity: 1,
                              x: 0,
                            }
                          : {}
                      }
                      transition={{
                        duration:
                          0.75,
                        delay:
                          0.12,
                      }}
                      className="text-center md:text-left"
                    >
                      <p className="mb-4 text-[8px] uppercase tracking-[0.42em] text-[#D4AF37] sm:mb-5 sm:text-[9px] sm:tracking-[0.48em]">
                        Personal Work
                      </p>

                      <div className="relative mx-auto w-full max-w-[330px] overflow-hidden border border-[#D4AF37]/20 bg-[#0D0D0D] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.45)] sm:max-w-[360px] md:mx-0">
                        <img
                          src="/images/bio.jpg"
                          alt="Personal design work by Leila Mirfakhraei"
                          className="max-h-[390px] w-full object-contain md:max-h-[430px]"
                        />

                        <div className="pointer-events-none absolute inset-2 border border-[#F4EFE6]/[0.06]" />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5B1E3A]/10 via-transparent to-transparent" />
                      </div>

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={
                          showStory
                            ? {
                                width:
                                  "100px",
                              }
                            : {}
                        }
                        transition={{
                          duration:
                            0.75,
                          delay:
                            0.38,
                        }}
                        className="mx-auto mt-6 h-px bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/15 md:mx-0"
                      />

                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={
                          showStory
                            ? {
                                opacity:
                                  1,
                              }
                            : {}
                        }
                        transition={{
                          duration:
                            0.6,
                          delay:
                            0.5,
                        }}
                        className="mt-4 flex items-center justify-center gap-3 md:justify-start"
                      >
                        <span className="h-[5px] w-[5px] rotate-45 bg-[#7E2A5A]" />

                        <p className="text-[7px] uppercase tracking-[0.31em] text-[#F4EFE6]/35 sm:text-[8px] sm:tracking-[0.36em]">
                          Iran → United States
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* =====================================
                        RIGHT — BIO
                    ===================================== */}

                    <div className="text-center md:text-left">
                      <motion.p
                        initial={{
                          opacity: 0,
                          y: 18,
                        }}
                        animate={
                          showStory
                            ? {
                                opacity:
                                  1,
                                y: 0,
                              }
                            : {}
                        }
                        transition={{
                          duration:
                            0.7,
                          delay:
                            0.26,
                        }}
                        className="font-serif text-[16px] leading-[1.7] text-[#F4EFE6]/78 sm:text-[18px] sm:leading-[1.72] md:text-[21px] md:leading-[1.75]"
                      >
                        Born in Iran and beginning a new chapter
                        in the United States, Leila&apos;s perspective
                        was shaped by movement, culture, curiosity,
                        and the experience of seeing the world through
                        more than one lens.
                      </motion.p>

                      <motion.div
                        initial={{
                          scaleX: 0,
                        }}
                        animate={
                          showStory
                            ? {
                                scaleX:
                                  1,
                              }
                            : {}
                        }
                        transition={{
                          duration:
                            0.8,
                          delay:
                            0.44,
                        }}
                        className="my-5 h-px origin-center bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent sm:my-6 md:my-7 md:origin-left md:bg-gradient-to-r md:from-[#D4AF37]/35 md:via-[#7E2A5A]/25 md:to-transparent"
                      />

                      <motion.p
                        initial={{
                          opacity: 0,
                          y: 18,
                        }}
                        animate={
                          showStory
                            ? {
                                opacity:
                                  1,
                                y: 0,
                              }
                            : {}
                        }
                        transition={{
                          duration:
                            0.7,
                          delay:
                            0.56,
                        }}
                        className="text-[14px] leading-7 text-[#F4EFE6]/52 sm:text-[15px] sm:leading-8 md:text-[17px] md:leading-9"
                      >
                        That journey continues to influence her work
                        today, where storytelling, atmosphere,
                        composition, and emotion come together through
                        graphic design.
                      </motion.p>

                      {/* =====================================
                          PRODUCTION CREDITS
                      ===================================== */}

                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={
                          showStory
                            ? {
                                opacity:
                                  1,
                                y: 0,
                              }
                            : {}
                        }
                        transition={{
                          duration:
                            0.65,
                          delay:
                            0.72,
                        }}
                        className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[#F4EFE6]/[0.06] pt-5 sm:mt-7 sm:grid-cols-3 sm:pt-6 md:mt-8"
                      >
                        <div>
                          <p className="text-[6px] uppercase tracking-[0.3em] text-[#D4AF37]/50 sm:text-[7px] sm:tracking-[0.35em]">
                            Perspective
                          </p>

                          <p className="mt-2 font-serif text-xs italic text-[#F4EFE6]/55 sm:text-sm">
                            Cultural
                          </p>
                        </div>

                        <div>
                          <p className="text-[6px] uppercase tracking-[0.3em] text-[#D4AF37]/50 sm:text-[7px] sm:tracking-[0.35em]">
                            Language
                          </p>

                          <p className="mt-2 font-serif text-xs italic text-[#F4EFE6]/55 sm:text-sm">
                            Visual
                          </p>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <p className="text-[6px] uppercase tracking-[0.3em] text-[#D4AF37]/50 sm:text-[7px] sm:tracking-[0.35em]">
                            Focus
                          </p>

                          <p className="mt-2 font-serif text-xs italic text-[#F4EFE6]/55 sm:text-sm">
                            Storytelling
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
              )}
            </div>

            {/* =====================================
                PRODUCTION FOOTER
            ===================================== */}

            <div className="relative z-30 flex h-[46px] items-center justify-between border-t border-[#D4AF37]/10 bg-[#0B0B0A] px-5 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3">
                <span className="h-[4px] w-[4px] rounded-full bg-[#7E2A5A]/70" />

                <p className="text-[6px] uppercase tracking-[0.38em] text-[#D4AF37]/30 sm:text-[7px]">
                  Leila Mirfakhraei
                </p>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <p className="text-[6px] uppercase tracking-[0.36em] text-[#F4EFE6]/20">
                  Visual Storytelling
                </p>

                <span className="h-px w-7 bg-[#D4AF37]/15" />

                <span className="font-serif text-[11px] italic text-[#D4AF37]/30">
                  LM
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}