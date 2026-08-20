"use client";

import { motion } from "motion/react";
import {
  FiMapPin,
  FiArrowUpRight,
} from "react-icons/fi";

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  period: string;
  description: string;
  highlights: string[];
  current: boolean;
};

type ExperienceProps = {
  experience: ExperienceItem[];
};

export default function Experience({
  experience,
}: ExperienceProps) {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#121212] px-5 py-20 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-24"
    >
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[15%] h-[420px] w-[420px] rounded-full bg-[#5B1E3A]/14 blur-[160px]" />

        <div className="absolute -right-32 bottom-[5%] h-[420px] w-[420px] rounded-full bg-[#A45728]/7 blur-[170px]" />

        <div className="absolute left-1/2 top-[45%] h-[280px] w-[600px] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.02] blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.018] [background-image:repeating-linear-gradient(90deg,transparent_0px,transparent_170px,rgba(255,255,255,.15)_171px,transparent_172px)]" />
      </div>

      {/* top divider */}

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* =====================================
            HEADER
        ===================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#D4AF37]" />

              <p className="text-[9px] uppercase tracking-[0.42em] text-[#D4AF37]">
                Experience
              </p>
            </div>

            <h2 className="font-serif text-[38px] leading-none sm:text-[46px] lg:text-[52px]">
              Behind the
              <span className="italic text-[#8A345F]">
                {" "}
                scenes.
              </span>
            </h2>
          </div>

          <p className="max-w-[400px] text-[14px] leading-6 text-[#F4EFE6]/42 md:text-right">
            A look at the studios, roles, and creative environments
            behind the work.
          </p>
        </motion.div>

        {/* =====================================
            EMPTY STATE
        ===================================== */}

        {experience.length === 0 && (
          <div className="border border-[#D4AF37]/12 bg-[#151313] px-6 py-14 text-center">
            <p className="font-serif text-[24px] text-[#F4EFE6]/55">
              Experience coming soon.
            </p>
          </div>
        )}

        {/* =====================================
            EXPERIENCE TICKETS
        ===================================== */}

        <div className="space-y-5">
          {experience.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
              }}
              className="group relative"
            >
              {/* =====================================
                  TICKET SHADOW
              ===================================== */}

              <div className="absolute inset-0 translate-x-[5px] translate-y-[6px] bg-[#5B1E3A]/22 transition-transform duration-500 group-hover:translate-x-[7px] group-hover:translate-y-[8px]" />

              {/* =====================================
    MAIN TICKET
===================================== */}

<div className="relative overflow-hidden border border-[#D4AF37]/20 bg-[#151313] shadow-[0_22px_55px_rgba(0,0,0,0.4)]">
  {/* atmosphere */}

  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-32 -top-32 h-[300px] w-[300px] rounded-full bg-[#5B1E3A]/18 blur-[110px]" />

    <div className="absolute right-[5%] top-1/2 h-[200px] w-[280px] -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.025] blur-[100px]" />

    <div className="absolute inset-0 opacity-[0.025] [background-image:repeating-linear-gradient(0deg,transparent_0px,transparent_8px,rgba(255,255,255,.12)_9px,transparent_10px)]" />
  </div>

  {/* inner frame */}

  <div className="pointer-events-none absolute inset-[7px] border border-[#D4AF37]/10" />

  <div className="relative grid md:grid-cols-[1fr_190px]">
    {/* =====================================
        MAIN SIDE
    ===================================== */}

    <div className="relative px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
      {/* ticket micro header */}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="h-[6px] w-[6px] rotate-45 bg-[#D4AF37]" />

          <p className="text-[8px] uppercase tracking-[0.34em] text-[#D4AF37]/75">
            {item.current
              ? "Now Showing"
              : "Past Feature"}
          </p>
        </div>

        <p className="text-[8px] uppercase tracking-[0.24em] text-[#F4EFE6]/30">
          {item.period}
        </p>
      </div>

      {/* content */}

      <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div>
          <p className="mb-3 text-[8px] uppercase tracking-[0.34em] text-[#8A345F]">
            {item.company}
          </p>

          <h3 className="font-serif text-[32px] leading-[0.98] text-[#F4EFE6] sm:text-[38px] lg:text-[42px]">
            {item.role}
          </h3>

          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]/55" />

            <div className="flex items-center gap-2 text-[#F4EFE6]/32">
              <FiMapPin className="shrink-0 text-[13px] text-[#D4AF37]/65" />

              <p className="text-[11px] uppercase tracking-[0.15em]">
                {item.location || "Los Angeles, CA"}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:border-l lg:border-[#D4AF37]/10 lg:pl-10">
          <p className="text-[14px] leading-7 text-[#F4EFE6]/55">
            {item.description}
          </p>

          {item.highlights.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {item.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="border border-[#D4AF37]/12 bg-[#D4AF37]/[0.025] px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] text-[#F4EFE6]/42"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* bottom ticket metadata */}

      <div className="mt-7 grid grid-cols-3 gap-4 border-t border-[#D4AF37]/10 pt-4">
        <div>
          <p className="text-[6px] uppercase tracking-[0.26em] text-[#F4EFE6]/20">
            Theatre
          </p>

          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#D4AF37]/45">
            Portfolio
          </p>
        </div>

        <div>
          <p className="text-[6px] uppercase tracking-[0.26em] text-[#F4EFE6]/20">
            Feature
          </p>

          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#D4AF37]/45">
            Experience
          </p>
        </div>

        <div className="text-right">
          <p className="text-[6px] uppercase tracking-[0.26em] text-[#F4EFE6]/20">
            Entry
          </p>

          <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#D4AF37]/45">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>

    {/* =====================================
        STUB
    ===================================== */}

    <div className="relative border-t-2 border-dashed border-[#D4AF37]/30 bg-[#100F0F] px-5 py-6 md:border-l-2 md:border-t-0">
      {/* ticket punch-outs */}

      <div className="absolute -left-[12px] -top-[12px] hidden h-6 w-6 rounded-full bg-[#121212] md:block" />

      <div className="absolute -bottom-[12px] -left-[12px] hidden h-6 w-6 rounded-full bg-[#121212] md:block" />

      <div className="pointer-events-none absolute inset-[7px] border border-[#D4AF37]/10" />

      <div className="relative flex h-full flex-row items-center justify-between gap-6 md:flex-col md:items-stretch">
        {/* admit one */}

        <div className="md:text-center">
          <p className="text-[7px] uppercase tracking-[0.38em] text-[#D4AF37]/55">
            Admit One
          </p>

          <div className="mx-auto mt-3 hidden h-px w-10 bg-[#D4AF37]/20 md:block" />

          <p className="mt-2 font-serif text-[18px] italic text-[#F4EFE6]/70">
            Creative Dept.
          </p>
        </div>

        {/* ticket number */}

        <div className="hidden md:block">
          <p className="text-center text-[6px] uppercase tracking-[0.26em] text-[#F4EFE6]/20">
            Ticket No.
          </p>

          <p className="mt-2 text-center font-serif text-[30px] leading-none text-[#8A345F]">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>

        {/* faux barcode */}

        <div className="hidden md:block">
          <div className="mx-auto flex h-[36px] w-[78px] items-end justify-between gap-[2px] opacity-35">
            {[18, 28, 22, 34, 24, 31, 20, 35, 27, 32, 21].map(
              (height, barIndex) => (
                <span
                  key={barIndex}
                  className="w-[2px] bg-[#D4AF37]"
                  style={{ height }}
                />
              )
            )}
          </div>
        </div>

        {/* status */}

        <div className="text-right md:text-center">
          <p className="text-[6px] uppercase tracking-[0.26em] text-[#F4EFE6]/20">
            Status
          </p>

          <p className="mt-1.5 text-[8px] uppercase tracking-[0.2em] text-[#D4AF37]/65">
            {item.current
              ? "Now Showing"
              : "Completed"}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}