"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { FiArrowDownRight } from "react-icons/fi";

const titles = ["Graphic Designer", "Key Art Designer", "Visual Storyteller"];

const filmImages = [
  "/images/gt3.jpg",
  "/images/heart2.jpg",
  "/images/insidious3.jpg",
  "/images/insidious5.jpg",
  "/images/miles.jpg",
  "/images/resident4.jpg",
  "/images/sheep2.jpg",
  "/images/spiderman.jpg",
  "/images/summer3.jpg",
  "/images/tarot2.jpg",
  "/images/uncharted.jpg",
  "/images/venom2.jpg",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isInView = useInView(sectionRef, {
    amount: 0.08,
  });

  const prefersReducedMotion = useReducedMotion();

  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(titles[0]);
      setDeleting(false);
      setTitleIndex(0);
      return;
    }

    if (!isInView) {
      return;
    }

    const currentTitle = titles[titleIndex];

    const timeout = window.setTimeout(
      () => {
        if (!deleting) {
          if (displayedText.length < currentTitle.length) {
            setDisplayedText(
              currentTitle.slice(
                0,
                displayedText.length + 1
              )
            );
          } else {
            setDeleting(true);
          }
        } else if (displayedText.length > 0) {
          setDisplayedText(
            currentTitle.slice(
              0,
              displayedText.length - 1
            )
          );
        } else {
          setDeleting(false);

          setTitleIndex(
            (previous) =>
              (previous + 1) % titles.length
          );
        }
      },
      deleting
        ? 40
        : displayedText.length === currentTitle.length
          ? 1200
          : 75
    );

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    displayedText,
    deleting,
    titleIndex,
    isInView,
    prefersReducedMotion,
  ]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#121212] pt-24 text-[#F4EFE6]"
    >
      {/* =====================================
          CINEMATIC BACKGROUND
      ===================================== */}

      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/backg.png')",
          backgroundPosition: "center center",
        }}
      />

      {/* very light global darkening */}
      <div className="pointer-events-none absolute inset-0 bg-black/5" />

      {/* only protect the text area */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#121212]/50 via-[#121212]/10 to-transparent" />

      {/* subtle bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#121212]/45 to-transparent" />

      {/* subtle top line */}
      <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* =====================================
          HERO LAYOUT
      ===================================== */}

      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1360px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-7 md:px-9 lg:h-[calc(100vh-6rem)] lg:grid-cols-[1fr_0.9fr] lg:gap-4 lg:px-10 lg:py-0">
        {/* =====================================
            LEFT
        ===================================== */}

        <div className="relative z-20 mx-auto w-full max-w-[590px] text-center lg:mx-0 lg:text-left">
          {/* NAME */}

          <motion.p
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-5 font-serif text-2xl italic tracking-[0.05em] text-[#F4EFE6]/80 sm:text-3xl"
          >
            Leila Mirfakhraei
          </motion.p>

          {/* HEADLINE */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.08,
            }}
            className="font-serif text-[54px] leading-[0.9] sm:text-[64px] md:text-[72px] lg:text-[74px] xl:text-[82px] "
          >
            Imagination, Concept,
            <span className="mt-1 block italic text-[#F4EFE6]">
              Design, Creation.
            </span>
          </motion.h1>

          {/* =====================================
              ANIMATED ROLE
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.25,
            }}
            className="mt-8 flex min-h-[40px] items-center justify-center lg:justify-start"
          >
            <span className="mr-4 h-px w-8 bg-[#7E2A5A]" />

            <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37] sm:text-base md:text-lg">
              {displayedText}

              <span className="ml-1 inline-block animate-pulse text-[#7E2A5A]">
                |
              </span>
            </p>
          </motion.div>

          {/* =====================================
              BUTTONS
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.38,
            }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            {/* PRIMARY */}

            <a
              href="#projects"
              className="group relative min-w-[220px] overflow-hidden border border-[#D4AF37]/55 bg-[#4A111C]/70 px-8 py-[18px] text-center backdrop-blur-[2px]"
            >
              <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

              <span className="relative flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.32em] text-[#E7C764] transition-colors duration-300 group-hover:text-[#121212]">
                View Projects
                <FiArrowDownRight className="text-lg" />
              </span>
            </a>

            {/* SECONDARY */}

            <a
              href="/resume.pdf"
              download="Leila-Mirfakhraei-Resume.pdf"
              className="group relative min-w-[210px] overflow-hidden border border-[#F4EFE6]/25 bg-black/20 px-8 py-[18px] text-center backdrop-blur-[2px] transition-all duration-300 hover:border-[#D4AF37]/55 hover:bg-black/35"
            >
              <span className="relative text-[10px] uppercase tracking-[0.32em] text-[#F4EFE6]/75 transition-colors duration-300 group-hover:text-[#D4AF37]">
                Download Resume
              </span>

              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-[#D4AF37] transition-all duration-300 group-hover:w-[75%]" />
            </a>
          </motion.div>
        </div>

        {/* =====================================
            DESKTOP FILM
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 35,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="relative hidden h-[calc(100vh-7.5rem)] max-h-[730px] -translate-x-3 items-center justify-center overflow-hidden lg:flex xl:-translate-x-5"
        >
          {/* slight shadow behind film */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/20 blur-[80px]" />

          {/* FILM VIEWPORT */}

          <div className="relative h-full w-[325px] overflow-hidden xl:w-[350px]">
            {/* TOP FADE */}

            <div className="pointer-events-none absolute left-0 top-0 z-30 h-20 w-full bg-gradient-to-b from-[#121212]/80 via-[#121212]/30 to-transparent" />

            {/* BOTTOM FADE */}

            <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-20 w-full bg-gradient-to-t from-[#121212]/80 via-[#121212]/30 to-transparent" />

            {/* MOVING FILM */}

            <motion.div
              animate={
                isInView && !prefersReducedMotion
                  ? {
                      y: ["0%", "-50%"],
                    }
                  : {
                      y: "0%",
                    }
              }
              transition={{
                duration: 30,
                repeat:
                  isInView && !prefersReducedMotion
                    ? Infinity
                    : 0,
                ease: "linear",
              }}
              className="absolute left-1/2 top-0 w-full -translate-x-1/2"
            >
              {[...filmImages, ...filmImages].map((image, index) => (
                <DesktopFilmFrame key={`${image}-${index}`} image={image} />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* =====================================
            MOBILE / TABLET FILM
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.5,
          }}
          className="relative mt-2 w-full overflow-visible lg:hidden"
        >
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[320px] md:h-[340px]">
            {/* LEFT FADE */}

            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-10 bg-gradient-to-r from-[#121212] via-[#121212]/50 to-transparent sm:w-14" />

            {/* RIGHT FADE */}

            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-10 bg-gradient-to-l from-[#121212] via-[#121212]/50 to-transparent sm:w-14" />

            {/* MOVING HORIZONTAL FILM */}

            <motion.div
              animate={
                isInView && !prefersReducedMotion
                  ? {
                      x: ["0%", "-50%"],
                    }
                  : {
                      x: "0%",
                    }
              }
              transition={{
                duration: 26,
                repeat:
                  isInView && !prefersReducedMotion
                    ? Infinity
                    : 0,
                ease: "linear",
              }}
              className="absolute left-0 top-1/2 flex -translate-y-1/2"
            >
              {[...filmImages, ...filmImages].map((image, index) => (
                <MobileFilmFrame key={`${image}-${index}`} image={image} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =====================================
   DESKTOP VERTICAL FILM
===================================== */

function DesktopFilmFrame({ image }: { image: string }) {
  return (
    <div className="relative flex h-[280px] w-full bg-[#080808]/95 shadow-[0_8px_30px_rgba(0,0,0,.45)]">
      {/* LEFT FILM EDGE */}

      <div className="relative w-[42px] shrink-0 border-r border-[#2a2a2a] bg-[#090909]">
        <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-around py-2">
          {Array.from({
            length: 9,
          }).map((_, index) => (
            <span
              key={index}
              className="h-[16px] w-[21px] rounded-[3px] bg-[#E9E5DD]/90"
            />
          ))}
        </div>
      </div>

      {/* CENTER IMAGE */}

      <div className="relative flex-1 border-y-[5px] border-[#080808] bg-[#141414] p-[5px]">
        <div className="relative h-full w-full overflow-hidden rounded-[4px] border border-[#D4AF37]/15 bg-[#181818]">
          <img
            src={image}
            alt="Leila graphic design work"
            className="h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5B1E3A]/15 via-transparent to-black/5" />

          <div className="pointer-events-none absolute inset-[5px] rounded-[2px] border border-[#F4EFE6]/10" />
        </div>
      </div>

      {/* RIGHT FILM EDGE */}

      <div className="relative w-[42px] shrink-0 border-l border-[#2a2a2a] bg-[#090909]">
        <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-around py-2">
          {Array.from({
            length: 9,
          }).map((_, index) => (
            <span
              key={index}
              className="h-[16px] w-[21px] rounded-[3px] bg-[#E9E5DD]/90"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =====================================
   MOBILE HORIZONTAL FILM
===================================== */

function MobileFilmFrame({ image }: { image: string }) {
  return (
    <div className="relative h-[245px] w-[280px] shrink-0 bg-[#080808]/95 px-3 py-7 sm:h-[280px] sm:w-[330px] md:h-[300px] md:w-[360px]">
      {/* TOP SPROCKETS */}

      <div className="absolute left-0 top-2 flex w-full justify-around px-1">
        {Array.from({
          length: 9,
        }).map((_, index) => (
          <span key={index} className="h-2 w-4 rounded-[2px] bg-[#E9E5DD]/85" />
        ))}
      </div>

      {/* IMAGE */}

      <div className="relative h-full overflow-hidden rounded-[3px] border border-[#D4AF37]/15 bg-[#181818]">
        <img
          src={image}
          alt="Leila graphic design work"
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5B1E3A]/15 via-transparent to-black/5" />

        <div className="pointer-events-none absolute inset-[5px] border border-[#F4EFE6]/10" />
      </div>

      {/* BOTTOM SPROCKETS */}

      <div className="absolute bottom-2 left-0 flex w-full justify-around px-1">
        {Array.from({
          length: 9,
        }).map((_, index) => (
          <span key={index} className="h-2 w-4 rounded-[2px] bg-[#E9E5DD]/85" />
        ))}
      </div>
    </div>
  );
}