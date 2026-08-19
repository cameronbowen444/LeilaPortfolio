"use client";

import { motion } from "motion/react";
import {
  SiFigma,
  SiBlender,
  SiCinema4D,
} from "react-icons/si";

type Tool = {
  name: string;
  short: string;
  badge?: string;
  icon?: React.ElementType;
  accent: string;
  glow: string;
};

const tools: Tool[] = [
  {
    name: "Photoshop",
    short: "Photo Editing • Compositing",
    badge: "Ps",
    accent: "#31A8FF",
    glow: "rgba(49,168,255,0.22)",
  },
  {
    name: "Illustrator",
    short: "Vector Graphics • Illustration",
    badge: "Ai",
    accent: "#FF9A00",
    glow: "rgba(255,154,0,0.22)",
  },
  {
    name: "InDesign",
    short: "Layout Design • Print",
    badge: "Id",
    accent: "#FF3366",
    glow: "rgba(255,51,102,0.22)",
  },
  {
    name: "After Effects",
    short: "Motion Design • Compositing",
    badge: "Ae",
    accent: "#9999FF",
    glow: "rgba(153,153,255,0.22)",
  },
  {
    name: "Premiere Pro",
    short: "Video Editing • Post Production",
    badge: "Pr",
    accent: "#9999FF",
    glow: "rgba(153,153,255,0.22)",
  },
  {
    name: "Figma",
    short: "UI Design • Collaboration",
    icon: SiFigma,
    accent: "#F24E1E",
    glow: "rgba(242,78,30,0.22)",
  },

  {
    name: "Blender",
    short: "3D Design • Rendering",
    icon: SiBlender,
    accent: "#E87D0D",
    glow: "rgba(232,125,13,0.22)",
  },
  {
    name: "Cinema 4D",
    short: "3D Motion • Rendering",
    icon: SiCinema4D,
    accent: "#5E9F99",
    glow: "rgba(94,159,153,0.22)",
  },
];

export default function Technologies() {
  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-[#0f0f0f] px-5 py-20 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-24"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[45%] h-[500px] w-[850px] -translate-x-1/2 rounded-full bg-[#5B1E3A]/12 blur-[160px]" />
        <div className="absolute left-[10%] top-[20%] h-[280px] w-[280px] rounded-full bg-[#1D3D44]/10 blur-[130px]" />
        <div className="absolute right-[8%] top-[25%] h-[280px] w-[280px] rounded-full bg-[#D4AF37]/6 blur-[140px]" />
      </div>

      {/* top divider */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* HEADER */}
        <div className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]" />

            <p className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]">
              Creative Toolkit
            </p>

            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl"
          >
            Tools behind the
            <span className="italic text-[#7E2A5A]"> work.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-[#F4EFE6]/45"
          >
            A creative workspace built around design, compositing, motion,
            illustration, and visual storytelling.
          </motion.p>
        </div>

        {/* STUDIO DESK / CONTROL ROOM */}
        <div className="relative">
          {/* monitor glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1D3D44]/12 blur-[150px]" />

          {/* workstation surface */}
          <div className="relative overflow-hidden rounded-[26px] border border-[#D4AF37]/12 bg-[#151313]/85 px-5 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:px-7 md:px-9 md:py-10">
            {/* top chrome/control line */}
            <div className="mb-8 flex items-center justify-between border-b border-[#F4EFE6]/5 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#7E2A5A]" />
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]/70" />
                <span className="h-2 w-2 rounded-full bg-[#5E9F99]/70" />
              </div>

              <p className="text-[8px] uppercase tracking-[0.4em] text-[#F4EFE6]/20">
                Creative Suite
              </p>
            </div>

            {/* TOOL GRID */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {tools.map((tool, index) => {
                const Icon = tool.icon;

                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.04,
                    }}
                    whileHover={{
                      y: -7,
                      scale: 1.025,
                    }}
                    className="group relative"
                  >
                    {/* colored hover glow */}
                    <div
                      className="pointer-events-none absolute inset-3 rounded-[24px] opacity-0 blur-[35px] transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: tool.glow,
                      }}
                    />

                    {/* tool panel */}
                    <div className="relative flex min-h-[190px] flex-col items-center justify-center overflow-hidden rounded-[20px] border border-[#F4EFE6]/7 bg-[#111111]/95 px-4 py-6 transition-all duration-500 group-hover:border-[#F4EFE6]/15">
                      {/* subtle top reflection */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.025] to-transparent" />

                      {/* app icon */}
                      <div
                        className="relative flex h-[70px] w-[70px] items-center justify-center rounded-[17px] border bg-[#171717] shadow-[0_18px_35px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110"
                        style={{
                          borderColor: `${tool.accent}45`,
                          boxShadow: `0 18px 40px rgba(0,0,0,.35), 0 0 20px ${tool.glow}`,
                        }}
                      >
                        <div className="absolute inset-[5px] rounded-[12px] border border-white/[0.035]" />

                        {tool.badge ? (
                          <span
                            className="relative text-3xl font-semibold tracking-tight"
                            style={{ color: tool.accent }}
                          >
                            {tool.badge}
                          </span>
                        ) : Icon ? (
                          <Icon
                            className="relative text-[34px]"
                            style={{ color: tool.accent }}
                          />
                        ) : null}
                      </div>

                      {/* tool name */}
                      <h3 className="mt-5 text-center text-sm font-medium text-[#F4EFE6]/85">
                        {tool.name}
                      </h3>

                      {/* tool use */}
                      <p className="mt-2 text-center text-[10px] leading-5 text-[#F4EFE6]/32">
                        {tool.short}
                      </p>

                      {/* hover accent */}
                      <span
                        className="mt-4 h-px w-0 transition-all duration-500 group-hover:w-12"
                        style={{
                          backgroundColor: tool.accent,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* bottom workstation detail */}
            <div className="mt-9 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-[#D4AF37]/20" />

              <p className="text-[7px] uppercase tracking-[0.42em] text-[#F4EFE6]/20">
                Design • Motion • Illustration
              </p>

              <span className="h-px w-12 bg-[#D4AF37]/20" />
            </div>
          </div>

          {/* reflection underneath */}
          <div className="pointer-events-none mx-auto h-16 w-[85%] bg-gradient-to-b from-[#D4AF37]/4 to-transparent blur-[18px]" />
        </div>
      </div>
    </section>
  );
}