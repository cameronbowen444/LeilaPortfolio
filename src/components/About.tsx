"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { FaPlane } from "react-icons/fa";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.28,
  });

  const [showStory, setShowStory] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowStory(true);
    }, 4600);

    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#121212] px-5 py-20 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-24"
    >
      {/* Section border */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-24 h-[320px] w-[320px] rounded-full bg-[#5B1E3A]/15 blur-[130px]" />

        <div className="absolute -right-24 top-40 h-[360px] w-[360px] rounded-full bg-[#A45728]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1320px]">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-center gap-3 lg:justify-start"
        >
          <span className="h-px w-7 bg-[#D4AF37]" />

          <p className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]">
            About • The Journey
          </p>
        </motion.div>

        {/* =========================
            TRAVEL MAP
        ========================== */}
        <div className="mx-auto max-w-[1120px]">
          <div className="relative overflow-hidden border border-[#D4AF37]/25 bg-[#6f4f37] shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
            {/* Parchment / sepia map background */}
            <motion.div
              initial={{
                scale: 1.05,
                x: 0,
                y: 0,
              }}
              animate={
                isInView
                  ? {
                      scale: [1.05, 1.1, 1.07],
                      x: [0, -18, -8],
                      y: [0, 8, -4],
                    }
                  : {}
              }
              transition={{
                duration: 5,
                ease: "easeInOut",
              }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,230,190,0.22),transparent_35%),radial-gradient(circle_at_75%_60%,rgba(80,40,20,0.18),transparent_35%),linear-gradient(135deg,#8f6748,#c39a70_45%,#7d583d)]" />

              {/* map contour lines */}
              <svg
                viewBox="0 0 1200 520"
                className="absolute inset-0 h-full w-full opacity-30"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 210 C150 170, 270 250, 430 210 S760 120, 1200 180"
                  fill="none"
                  stroke="#3d2617"
                  strokeWidth="2"
                />

                <path
                  d="M0 330 C230 285, 300 380, 520 330 S880 260, 1200 310"
                  fill="none"
                  stroke="#3d2617"
                  strokeWidth="2"
                />

                <path
                  d="M300 0 C250 100, 350 180, 280 300 S350 470, 390 520"
                  fill="none"
                  stroke="#3d2617"
                  strokeWidth="1.5"
                />

                <path
                  d="M760 0 C690 120, 770 210, 710 310 S760 430, 820 520"
                  fill="none"
                  stroke="#3d2617"
                  strokeWidth="1.5"
                />
              </svg>

              {/* Fake map labels */}
              <div className="absolute left-[8%] top-[18%] rotate-[-4deg] font-serif text-lg italic text-[#3b2418]/55">
                Europe
              </div>

              <div className="absolute left-[28%] top-[53%] rotate-[3deg] font-serif text-sm italic text-[#3b2418]/45">
                Mediterranean Sea
              </div>

              <div className="absolute left-[40%] top-[20%] rotate-[-2deg] font-serif text-base italic text-[#3b2418]/45">
                Atlantic Ocean
              </div>

              <div className="absolute right-[5%] top-[34%] rotate-[2deg] font-serif text-lg italic text-[#3b2418]/55">
                North America
              </div>
            </motion.div>

            {/* aged vignette */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_42%,rgba(32,16,8,0.48)_100%)]" />

            {/* old film grain */}
            <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.11] [background-image:repeating-radial-gradient(circle_at_20%_30%,rgba(255,255,255,.8)_0_1px,transparent_1px_3px)]" />

            {/* scratch lines */}
            <div className="pointer-events-none absolute left-[18%] top-0 z-20 h-full w-px bg-[#fff4d6]/10" />

            <div className="pointer-events-none absolute right-[27%] top-0 z-20 h-full w-px bg-black/10" />

            {/* map viewport */}
            <div className="relative z-30 h-[310px] sm:h-[380px] md:h-[430px] lg:h-[470px]">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                }}
                className="absolute left-1/2 top-5 z-40 -translate-x-1/2 text-center"
              >
                <p className="text-[8px] uppercase tracking-[0.5em] text-[#321d13]/70">
                  A Journey Across Worlds
                </p>
              </motion.div>

              {/* IRAN */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                }}
                className="absolute bottom-[20%] left-[6%] z-40"
              >
                <div className="relative">
                  <span className="absolute -left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#8f1f1f] shadow-[0_0_0_5px_rgba(143,31,31,0.15)]" />

                  <p className="font-serif text-lg font-semibold text-[#2d1b12] sm:text-xl">
                    Iran
                  </p>

                  <p className="mt-1 text-[7px] uppercase tracking-[0.32em] text-[#6a2f20]">
                    Beginning
                  </p>
                </div>
              </motion.div>

              {/* USA */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  delay: 3.7,
                }}
                className="absolute right-[6%] top-[22%] z-40 text-right"
              >
                <div className="relative">
                  <span className="absolute -right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#8f1f1f] shadow-[0_0_0_5px_rgba(143,31,31,0.15)]" />

                  <p className="font-serif text-lg font-semibold text-[#2d1b12] sm:text-xl">
                    United States
                  </p>

                  <p className="mt-1 text-[7px] uppercase tracking-[0.32em] text-[#6a2f20]">
                    New Chapter
                  </p>
                </div>
              </motion.div>

              {/* ROUTE */}
              <svg
                viewBox="0 0 1000 420"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {/* dark route shadow */}
                <path
                  d="M100 325 C250 180, 360 95, 510 150 C660 205, 730 320, 900 105"
                  fill="none"
                  stroke="rgba(70,20,12,0.22)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* animated red route */}
                <motion.path
                  d="M100 325 C250 180, 360 95, 510 150 C660 205, 730 320, 900 105"
                  fill="none"
                  stroke="#8f1f1f"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="13 11"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={
                    isInView
                      ? {
                          pathLength: 1,
                          opacity: 1,
                        }
                      : {}
                  }
                  transition={{
                    pathLength: {
                      duration: 3.7,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 0.3,
                    },
                  }}
                />
              </svg>

              {/* Plane */}
              {isInView && (
                <motion.div
                  initial={{
                    left: "8%",
                    top: "74%",
                    rotate: -20,
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    left: [
                      "8%",
                      "23%",
                      "39%",
                      "55%",
                      "70%",
                      "89%",
                    ],
                    top: [
                      "74%",
                      "47%",
                      "25%",
                      "36%",
                      "62%",
                      "20%",
                    ],
                    rotate: [
                      -22,
                      -28,
                      5,
                      12,
                      -8,
                      -35,
                    ],
                    opacity: [0, 1, 1, 1, 1, 1],
                    scale: [0.8, 1, 1, 1, 1, 0.95],
                  }}
                  transition={{
                    duration: 3.8,
                    ease: "easeInOut",
                    times: [0, 0.18, 0.38, 0.58, 0.78, 1],
                  }}
                  className="absolute z-50 text-[22px] text-[#751c1c] sm:text-2xl md:text-3xl"
                >
                  <FaPlane className="drop-shadow-[2px_3px_1px_rgba(30,10,5,0.35)]" />
                </motion.div>
              )}

              {/* destination pulse */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.4,
                }}
                animate={
                  isInView
                    ? {
                        opacity: [0, 1, 0],
                        scale: [0.4, 1.3, 1.8],
                      }
                    : {}
                }
                transition={{
                  duration: 1.1,
                  delay: 3.65,
                }}
                className="absolute right-[7%] top-[21%] z-40 h-8 w-8 rounded-full border-2 border-[#8f1f1f]"
              />
            </div>

            {/* map footer */}
            <div className="relative z-40 flex items-center justify-center gap-3 border-t border-[#4c2c1c]/30 bg-[#4d2f22]/15 py-3">
              <span className="h-px w-8 bg-[#5b2c20]/50" />

              <p className="text-[7px] uppercase tracking-[0.42em] text-[#402417]/70">
                From Iran to America
              </p>

              <span className="h-px w-8 bg-[#5b2c20]/50" />
            </div>
          </div>
        </div>

        {/* =========================
            STORY REVEAL
        ========================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={
            showStory
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-12 grid max-w-[1100px] gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-14"
        >
          <div className="text-center md:text-left">
            <p className="mb-3 text-[8px] uppercase tracking-[0.45em] text-[#D4AF37]">
              Her Story
            </p>

            <h2 className="font-serif text-4xl leading-[1] sm:text-5xl">
              Design shaped by
              <span className="block italic text-[#7E2A5A]">
                two worlds.
              </span>
            </h2>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={
                showStory
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="text-sm leading-7 text-[#F4EFE6]/65 sm:text-[15px]"
            >
              Born in Iran and later began a new chapter in the United
              States, Leila&apos;s perspective was shaped by movement,
              culture, curiosity, and the experience of seeing the world
              through more than one lens.
            </motion.p>

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={
                showStory
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: 0.35,
                duration: 0.6,
              }}
              className="text-sm leading-7 text-[#F4EFE6]/50 sm:text-[15px]"
            >
              That journey continues to influence her work today, where
              storytelling, atmosphere, composition, and emotion come
              together through graphic design.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}