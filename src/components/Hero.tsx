"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiArrowDownRight } from "react-icons/fi";

const titles = [
  "Graphic Designer",
  "Key Art Designer",
  "Visual Storyteller",
];

const filmImages = [
  "/images/work/poster-1.jpg",
  "/images/work/poster-2.jpg",
  "/images/work/poster-3.jpg",
  "/images/work/poster-4.jpg",
  "/images/work/poster-5.jpg",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (displayedText.length < currentTitle.length) {
            setDisplayedText(
              currentTitle.slice(0, displayedText.length + 1)
            );
          } else {
            setDeleting(true);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(
              currentTitle.slice(0, displayedText.length - 1)
            );
          } else {
            setDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      deleting
        ? 40
        : displayedText.length === currentTitle.length
          ? 1200
          : 75
    );

    return () => clearTimeout(timeout);
  }, [displayedText, deleting, titleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#121212] pt-24 text-[#F4EFE6]"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-[300px] w-[300px] rounded-full bg-[#5B1E3A]/20 blur-[120px]" />

        <div className="absolute -right-24 top-24 h-[360px] w-[360px] rounded-full bg-[#1D3D44]/15 blur-[130px]" />

        <div className="absolute bottom-[-180px] left-[40%] h-[320px] w-[320px] rounded-full bg-[#A45728]/10 blur-[130px]" />
      </div>

      {/* top line */}
      <div className="absolute left-0 top-24 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      {/* HERO LAYOUT */}
      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1320px] grid-cols-1 items-center gap-8 px-5 py-8 sm:px-7 md:px-9 lg:h-[calc(100vh-6rem)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:px-10 lg:py-0">
        {/* LEFT */}
        <div className="relative z-10 mx-auto w-full max-w-[520px] text-center lg:mx-0 lg:text-left">
          {/* label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 border border-[#D4AF37]/30 bg-[#5B1E3A]/10 px-3.5 py-2"
          >
            <span className="h-px w-4 bg-[#D4AF37]" />

            <p className="text-[8px] uppercase tracking-[0.32em] text-[#D4AF37]">
              Portfolio • Leila Mirfakhraei
            </p>
          </motion.div>

          {/* greeting */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mb-2 text-[9px] uppercase tracking-[0.38em] text-[#725563]"
          >
            Hello, I&apos;m Leila
          </motion.p>

          {/* heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-[42px] leading-[0.95] sm:text-5xl md:text-[56px] lg:text-[58px] xl:text-[64px]"
          >
            I create
            <span className="block italic text-[#F4EFE6]">
              visual stories.
            </span>
          </motion.h1>

          {/* typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-4 flex min-h-[34px] items-center justify-center lg:justify-start"
          >
            <p className="text-sm uppercase tracking-[0.14em] text-[#D4AF37] sm:text-base md:text-lg">
              {displayedText}

              <span className="ml-1 inline-block animate-pulse text-[#7E2A5A]">
                |
              </span>
            </p>
          </motion.div>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="mx-auto mt-3 max-w-[460px] text-[13px] leading-6 text-[#F4EFE6]/60 sm:text-sm lg:mx-0"
          >
            Graphic designer creating cinematic key art, entertainment
            campaigns, and expressive visual identities through storytelling,
            composition, and emotion.
          </motion.p>

          {/* buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <a
              href="#work"
              className="group relative overflow-hidden border border-[#D4AF37]/50 px-5 py-3"
            >
              <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

              <span className="relative flex items-center gap-2 text-[8px] uppercase tracking-[0.28em] text-[#D4AF37] transition-colors group-hover:text-[#121212]">
                View Work
                <FiArrowDownRight className="text-sm" />
              </span>
            </a>

            <a
              href="#contact"
              className="px-3 py-3 text-[8px] uppercase tracking-[0.28em] text-[#F4EFE6]/45 transition-colors hover:text-[#F4EFE6]"
            >
              Let&apos;s Connect
            </a>
          </motion.div>
        </div>

        {/* DESKTOP FILM */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden h-[calc(100vh-7.5rem)] max-h-[720px] items-center justify-center overflow-hidden lg:flex"
        >
          {/* glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7E2A5A]/10 blur-[120px]" />

          {/* film viewport */}
          <div className="relative h-full w-[360px] overflow-hidden xl:w-[390px]">
            {/* fades */}
            <div className="pointer-events-none absolute left-0 top-0 z-30 h-20 w-full bg-gradient-to-b from-[#121212] via-[#121212]/85 to-transparent" />

            <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-20 w-full bg-gradient-to-t from-[#121212] via-[#121212]/85 to-transparent" />

            {/* moving full reel */}
            <motion.div
              animate={{
                y: ["0%", "-50%"],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-1/2 top-0 w-full -translate-x-1/2"
            >
              {[...filmImages, ...filmImages].map((image, index) => (
                <DesktopFilmFrame
                  key={`${image}-${index}`}
                  image={image}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* MOBILE / TABLET HORIZONTAL FILM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative mt-2 w-full overflow-visible lg:hidden"
        >
          <div className="relative h-[280px] w-full overflow-hidden sm:h-[320px] md:h-[340px]">
            {/* soft side fades */}
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-8 bg-gradient-to-r from-[#121212] to-transparent sm:w-12" />

            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-8 bg-gradient-to-l from-[#121212] to-transparent sm:w-12" />

            {/* moving horizontal film */}
            <motion.div
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-0 top-1/2 flex -translate-y-1/2"
            >
              {[...filmImages, ...filmImages].map((image, index) => (
                <MobileFilmFrame
                  key={`${image}-${index}`}
                  image={image}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================
   DESKTOP VERTICAL FILM
========================= */

function DesktopFilmFrame({ image }: { image: string }) {
  return (
    <div className="relative flex h-[280px] w-full bg-[#080808]">
      {/* LEFT FILM EDGE */}
      <div className="relative w-[44px] shrink-0 border-r border-[#2a2a2a] bg-[#0A0A0A]">
        <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-around py-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="h-[16px] w-[22px] rounded-[3px] bg-[#F4EFE6]/85"
            />
          ))}
        </div>
      </div>

      {/* CENTER FRAME */}
      <div className="relative flex-1 border-y-[5px] border-[#080808] bg-[#141414] p-[5px]">
        <div className="relative h-full w-full overflow-hidden rounded-[5px] border border-[#D4AF37]/15 bg-[#181818]">
          <img
            src={image}
            alt="Leila graphic design work"
            className="h-full w-full object-cover"
          />

          {/* cinematic tone */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5B1E3A]/20 via-transparent to-transparent" />

          {/* inner frame */}
          <div className="pointer-events-none absolute inset-[5px] rounded-[3px] border border-[#F4EFE6]/10" />
        </div>
      </div>

      {/* RIGHT FILM EDGE */}
      <div className="relative w-[44px] shrink-0 border-l border-[#2a2a2a] bg-[#0A0A0A]">
        <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 flex-col justify-around py-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="h-[16px] w-[22px] rounded-[3px] bg-[#F4EFE6]/85"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   MOBILE HORIZONTAL FILM
========================= */

function MobileFilmFrame({ image }: { image: string }) {
  return (
    <div className="relative h-[245px] w-[280px] shrink-0 bg-[#080808] px-3 py-7 sm:h-[280px] sm:w-[330px] md:h-[300px] md:w-[360px]">
      {/* top sprockets */}
      <div className="absolute left-0 top-2 flex w-full justify-around px-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-2 w-4 rounded-[2px] bg-[#F4EFE6]/80"
          />
        ))}
      </div>

      {/* image */}
      <div className="relative h-full overflow-hidden rounded-[3px] border border-[#D4AF37]/15 bg-[#181818]">
        <img
          src={image}
          alt="Leila graphic design work"
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5B1E3A]/20 via-transparent to-transparent" />

        <div className="pointer-events-none absolute inset-[5px] border border-[#F4EFE6]/10" />
      </div>

      {/* bottom sprockets */}
      <div className="absolute bottom-2 left-0 flex w-full justify-around px-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className="h-2 w-4 rounded-[2px] bg-[#F4EFE6]/80"
          />
        ))}
      </div>
    </div>
  );
}