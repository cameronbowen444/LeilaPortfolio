"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { FaPlane } from "react-icons/fa";

type JourneyAnimationProps = {
  onComplete?: () => void;
};

export default function JourneyAnimation({
  onComplete,
}: JourneyAnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.35,
  });

  const [finished, setFinished] = useState(false);

  /* =====================================
     FINISH / FADE TIMING
  ===================================== */

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setFinished(true);

      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, 750);

      return () => clearTimeout(completeTimer);
    }, 4300);

    return () => clearTimeout(timer);
  }, [isInView, onComplete]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: finished ? 0 : 1,
        scale: finished ? 1.02 : 1,
        filter: finished
          ? "blur(3px)"
          : "blur(0px)",
      }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* =====================================
          MAP BACKGROUND
      ===================================== */}

      <motion.div
        initial={{
          scale: 1.05,
          x: 0,
          y: 0,
        }}
        animate={
          isInView
            ? {
                scale: [1.05, 1.08, 1.06],
                x: [0, -12, -5],
                y: [0, 5, -2],
              }
            : {}
        }
        transition={{
          duration: 4.2,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        {/* parchment */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,230,190,0.22),transparent_35%),radial-gradient(circle_at_75%_60%,rgba(80,40,20,0.18),transparent_35%),linear-gradient(135deg,#8f6748,#c39a70_45%,#7d583d)]" />

        {/* subtle texture */}

        <div className="absolute inset-0 opacity-[0.09] [background-image:repeating-radial-gradient(circle_at_20%_30%,rgba(255,255,255,.8)_0_1px,transparent_1px_3px)]" />

        {/* =====================================
            MAP CONTOUR LINES
        ===================================== */}

        <svg
          viewBox="0 0 1200 520"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full opacity-30"
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

        {/* =====================================
            MAP LABELS
        ===================================== */}

        <div className="absolute left-[8%] top-[18%] rotate-[-4deg] font-serif text-lg italic text-[#3b2418]/50">
          Europe
        </div>

        <div className="absolute left-[28%] top-[53%] rotate-[3deg] font-serif text-sm italic text-[#3b2418]/40">
          Mediterranean Sea
        </div>

        <div className="absolute left-[40%] top-[20%] rotate-[-2deg] font-serif text-base italic text-[#3b2418]/40">
          Atlantic Ocean
        </div>

        <div className="absolute right-[5%] top-[34%] rotate-[2deg] font-serif text-lg italic text-[#3b2418]/50">
          North America
        </div>
      </motion.div>

      {/* =====================================
          AGED VIGNETTE
      ===================================== */}

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle,transparent_42%,rgba(32,16,8,0.48)_100%)]" />

      {/* =====================================
          OLD FILM GRAIN
      ===================================== */}

      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.09] [background-image:repeating-radial-gradient(circle_at_20%_30%,rgba(255,255,255,.8)_0_1px,transparent_1px_3px)]" />

      {/* scratches */}

      <div className="pointer-events-none absolute left-[18%] top-0 z-20 h-full w-px bg-[#fff4d6]/8" />

      <div className="pointer-events-none absolute right-[27%] top-0 z-20 h-full w-px bg-black/10" />

      {/* =====================================
          MAP TITLE
      ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -5,
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
          duration: 0.6,
          delay: 0.2,
        }}
        className="absolute left-1/2 top-6 z-40 -translate-x-1/2"
      >
        <p className="whitespace-nowrap text-[7px] uppercase tracking-[0.5em] text-[#321d13]/70 sm:text-[8px]">
          A Journey Across Worlds
        </p>
      </motion.div>

      {/* =====================================
          IRAN
      ===================================== */}

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
          delay: 0.35,
        }}
        className="absolute bottom-[18%] left-[6%] z-40"
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

      {/* =====================================
          UNITED STATES
      ===================================== */}

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
          delay: 3.55,
        }}
        className="absolute right-[6%] top-[20%] z-40 text-right"
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

      {/* =====================================
          ROUTE
      ===================================== */}

      <svg
        viewBox="0 0 1000 420"
        preserveAspectRatio="none"
        className="absolute inset-0 z-30 h-full w-full"
      >
        {/* route shadow */}

        <path
          d="M100 325 C250 180, 360 95, 510 150 C660 205, 730 320, 900 105"
          fill="none"
          stroke="rgba(70,20,12,0.20)"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* animated dotted route */}

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
              duration: 3.8,
              ease: "linear",
            },
            opacity: {
              duration: 0.25,
            },
          }}
        />
      </svg>

      {/* =====================================
          PLANE
          
          IMPORTANT:
          These coordinates are sampled directly
          from the SAME curve as the dotted route.
      ===================================== */}

      {isInView && (
        <motion.div
          initial={{
            left: "10%",
            top: "77.4%",
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            left: [
              "10%",
              "17.2%",
              "24%",
              "30.5%",
              "37%",
              "43.8%",
              "51%",
              "57.9%",
              "64%",
              "69.8%",
              "75.7%",
              "82.2%",
              "90%",
            ],

            top: [
              "77.4%",
              "61.4%",
              "48.3%",
              "38.7%",
              "33%",
              "31.9%",
              "35.7%",
              "43%",
              "50.1%",
              "54.5%",
              "53.4%",
              "44.5%",
              "25%",
            ],

            rotate: [
              -43,
              -40,
              -35,
              -28,
              -15,
              4,
              18,
              26,
              30,
              18,
              -12,
              -38,
              -52,
            ],

            opacity: [
              0,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
            ],

            scale: [
              0.9,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              0.95,
            ],
          }}
          transition={{
            duration: 3.8,

            /*
             * LINEAR is important.
             * It prevents the plane from easing/stopping
             * at every individual waypoint.
             */
            ease: "linear",

            /*
             * Equal spacing through all points.
             * Gives the plane continuous movement.
             */
            times: [
              0,
              0.083,
              0.166,
              0.25,
              0.333,
              0.416,
              0.5,
              0.583,
              0.666,
              0.75,
              0.833,
              0.916,
              1,
            ],
          }}
          className="absolute z-50 -translate-x-1/2 -translate-y-1/2 text-[30px] text-[#751c1c] sm:text-[34px] md:text-[40px]"
        >
          <FaPlane className="drop-shadow-[2px_3px_2px_rgba(30,10,5,0.4)]" />
        </motion.div>
      )}

      {/* =====================================
          DESTINATION PULSE
      ===================================== */}

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
          duration: 1,
          delay: 3.55,
        }}
        className="absolute left-[90%] top-[25%] z-40 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#8f1f1f]"
      />

      {/* =====================================
          BOTTOM CAPTION
      ===================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
              }
            : {}
        }
        transition={{
          delay: 0.4,
          duration: 0.6,
        }}
        className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2"
      >
        <div className="flex items-center gap-3">
          <span className="h-px w-7 bg-[#5b2c20]/45" />

          <p className="whitespace-nowrap text-[6px] uppercase tracking-[0.42em] text-[#402417]/65 sm:text-[7px]">
            From Iran to America
          </p>

          <span className="h-px w-7 bg-[#5b2c20]/45" />
        </div>
      </motion.div>
    </motion.div>
  );
}