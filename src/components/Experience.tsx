"use client";

import { motion } from "motion/react";
import { FiMapPin } from "react-icons/fi";

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
      className="relative overflow-hidden bg-[#121212] px-5 py-16 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-20"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-[260px] w-[260px] rounded-full bg-[#5B1E3A]/10 blur-[120px]" />

        <div className="absolute right-[6%] top-[30%] h-[280px] w-[280px] rounded-full bg-[#D4AF37]/5 blur-[135px]" />
      </div>

      {/* Top divider */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="relative mx-auto max-w-[1080px]">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2.5 flex items-center gap-3">
              <span className="h-px w-7 bg-[#D4AF37]" />

              <p className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
                Experience
              </p>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px]">
              Behind the
              <span className="italic text-[#7E2A5A]"> scenes.</span>
            </h2>
          </div>

          <p className="max-w-[360px] text-[12px] leading-5 text-[#F4EFE6]/45 md:text-right">
            A look at the roles, teams, and creative environments that have
            shaped my work.
          </p>
        </div>

        {/* No Experience */}
        {experience.length === 0 && (
          <div className="border border-[#D4AF37]/10 bg-[#171414] px-6 py-10 text-center">
            <p className="font-serif text-xl text-[#F4EFE6]/50">
              Experience coming soon.
            </p>
          </div>
        )}

        {/* Tickets */}
        <div className="space-y-4">
          {experience.map((item, index) => (
            <motion.article
              key={item.id}
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
                amount: 0.18,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
              }}
              whileHover={{
                y: -3,
                rotate: index % 2 === 0 ? -0.12 : 0.12,
              }}
              className="relative"
            >
              {/* Ticket shadow */}
              <div className="absolute inset-0 translate-x-[4px] translate-y-[5px] bg-[#5B1E3A]/50" />

              {/* Ticket */}
              <div className="group relative overflow-hidden bg-[#C49A60] text-[#35191C] shadow-[0_14px_35px_rgba(0,0,0,0.28)]">
                {/* Paper texture */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,232,185,.14),transparent_30%,rgba(91,30,58,.07)),radial-gradient(circle_at_20%_30%,rgba(255,240,200,.12),transparent_30%)]" />

                {/* Outer frame */}
                <div className="pointer-events-none absolute inset-[6px] border-[2px] border-[#6D243C]/80" />

                {/* Inner frame */}
                <div className="pointer-events-none absolute inset-[11px] border border-[#D4AF37]/40" />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_145px]">
                  {/* Main side */}
                  <div className="relative px-6 py-5 sm:px-7 md:px-8">
                    {/* Top */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[#5B1E3A]/30 pb-3">
                      <div className="flex items-center gap-2.5">
                        <p className="text-[7px] font-bold uppercase tracking-[0.32em] text-[#5B1E3A]">
                          {item.current
                            ? "Now Showing"
                            : "Previous Feature"}
                        </p>

                        <span className="h-px w-5 bg-[#5B1E3A]/40" />
                      </div>

                      <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-[#35191C]/60">
                        {item.period}
                      </p>
                    </div>

                    {/* Ticket title */}
                    <div className="mb-4 text-center">
                      <p className="text-[7px] uppercase tracking-[0.28em] text-[#5B1E3A]/75">
                        Creative Experience Presents
                      </p>

                      <h3 className="mt-1.5 font-serif text-2xl font-semibold uppercase tracking-[0.03em] text-[#5B1E3A] sm:text-[28px]">
                        {item.role}
                      </h3>

                      <div className="mt-1.5 flex items-center justify-center gap-1.5">
                        {Array.from({ length: 5 }).map((_, star) => (
                          <span
                            key={star}
                            className="text-[7px] text-[#5B1E3A]"
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#35191C]">
                        {item.company}
                      </p>
                    </div>

                    {/* Info */}
                    <div className="grid gap-4 border-y border-[#5B1E3A]/25 py-4 lg:grid-cols-[0.7fr_1.3fr]">
                      <div className="border-b border-[#5B1E3A]/15 pb-4 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
                        <p className="text-[6px] font-semibold uppercase tracking-[0.25em] text-[#5B1E3A]">
                          Location
                        </p>

                        <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#35191C]/70">
                          <FiMapPin className="text-[#5B1E3A]" />

                          <span>
                            {item.location || "Los Angeles, CA"}
                          </span>
                        </div>

                        <p className="mt-4 text-[6px] font-semibold uppercase tracking-[0.25em] text-[#5B1E3A]">
                          Engagement
                        </p>

                        <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#35191C]/70">
                          {item.period}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] leading-5 text-[#35191C]/72 sm:text-[12px]">
                          {item.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="border border-[#5B1E3A]/30 bg-[#5B1E3A]/5 px-2 py-1.5 text-[6px] font-semibold uppercase tracking-[0.12em] text-[#4A1C29]"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[6px] uppercase tracking-[0.26em] text-[#35191C]/50">
                        Admit One • Creative Department
                      </p>

                      <p className="text-[6px] uppercase tracking-[0.26em] text-[#5B1E3A]/70">
                        Portfolio Feature
                      </p>
                    </div>
                  </div>

                  {/* Stub */}
                  <div className="relative border-t-2 border-dashed border-[#5B1E3A]/50 bg-[#B98A54] px-4 py-5 md:border-l-2 md:border-t-0">
                    <div className="absolute -left-[9px] -top-[9px] hidden h-[18px] w-[18px] rounded-full bg-[#121212] md:block" />

                    <div className="absolute -bottom-[9px] -left-[9px] hidden h-[18px] w-[18px] rounded-full bg-[#121212] md:block" />

                    <div className="pointer-events-none absolute inset-[7px] border border-[#5B1E3A]/30" />

                    <div className="relative flex h-full flex-col items-center justify-between text-center">
                      <div>
                        <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-[#5B1E3A]">
                          Admit One
                        </p>

                        <div className="mx-auto mt-2 h-px w-10 bg-[#5B1E3A]/40" />
                      </div>

                      <div className="my-4">
                        <p className="text-[6px] uppercase tracking-[0.2em] text-[#35191C]/50">
                          Seat
                        </p>

                        <p className="mt-1 font-serif text-xl font-semibold text-[#5B1E3A]">
                          A-{index + 1}
                        </p>
                      </div>

                      <div className="w-full">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="h-px flex-1 bg-[#5B1E3A]/25" />

                          <span className="text-[7px] text-[#5B1E3A]">
                            ★
                          </span>

                          <span className="h-px flex-1 bg-[#5B1E3A]/25" />
                        </div>

                        <p className="text-[5px] uppercase tracking-[0.2em] text-[#35191C]/50">
                          Status
                        </p>

                        <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.14em] text-[#5B1E3A]">
                          {item.current
                            ? "Present"
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