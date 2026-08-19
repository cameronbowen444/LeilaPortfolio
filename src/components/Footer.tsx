"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  FiMail,
  FiInstagram,
  FiLinkedin,
  FiArrowUpRight,
} from "react-icons/fi";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Technologies", href: "#technologies" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B0B0B] text-[#F4EFE6]">
      {/* Top Divider */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />

      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-[-100px] h-[300px] w-[300px] rounded-full bg-[#5B1E3A]/18 blur-[120px]" />

        <div className="absolute right-[8%] top-[15%] h-[240px] w-[240px] rounded-full bg-[#1D3D44]/10 blur-[130px]" />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1180px] px-5 py-14 sm:px-7 md:px-10 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.8fr_1fr] md:items-start md:gap-14 lg:gap-16">
          {/* =========================
              LEFT
          ========================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:justify-self-start"
          >
            <Link
              href="#home"
              className="group inline-flex items-center gap-4"
            >
              {/* Monogram */}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rotate-45 border border-[#D4AF37]/40 transition-all duration-500 group-hover:rotate-0 group-hover:border-[#D4AF37]" />

                <div className="absolute inset-[6px] rotate-45 border border-[#7E2A5A]/45 transition-all duration-500 group-hover:rotate-0" />

                <span className="relative font-serif text-xl italic text-[#F4EFE6]">
                  LM
                </span>
              </div>

              {/* Name */}
              <div>
                <p className="font-serif text-lg tracking-[0.12em] text-[#F4EFE6]">
                  LEILA MIRFAKHRAEI
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-px w-5 bg-[#D4AF37]" />

                  <p className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
                    Visual Designer
                  </p>
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-[330px] text-sm leading-7 text-[#F4EFE6]/45">
              Creating expressive visual work through storytelling,
              composition, atmosphere, and design.
            </p>
          </motion.div>

          {/* =========================
              CENTER / EXPLORE
          ========================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="md:justify-self-start"
          >
            <div className="mb-5 flex items-center gap-3 ">
              <span className="h-px w-6 bg-[#D4AF37]" />

              <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">
                Explore
              </p>
            </div>

            <nav className="grid grid-cols-2 gap-x-8 gap-y-4 md:justify-items-start">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative w-fit text-[11px] uppercase tracking-[0.22em] text-[#F4EFE6]/55 transition-colors duration-300 hover:text-[#F4EFE6]"
                >
                  {link.name}

                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* =========================
              RIGHT / CONNECT
          ========================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="md:justify-self-end"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-6 bg-[#D4AF37]" />

              <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">
                Connect
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <a
                href="mailto:hello@leiladesign.com"
                className="group flex items-center gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#5B1E3A]/10 text-[#D4AF37] transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#5B1E3A]/30">
                  <FiMail />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[#725563]">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-[#F4EFE6]/65 transition-colors group-hover:text-[#F4EFE6]">
                    hello@leiladesign.com
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="group flex items-center gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#5B1E3A]/10 text-[#D4AF37] transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#5B1E3A]/30">
                  <FiInstagram />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[#725563]">
                    Instagram
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm text-[#F4EFE6]/65 transition-colors group-hover:text-[#F4EFE6]">
                    @leiladesign
                    <FiArrowUpRight className="text-xs" />
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="group flex items-center gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-[#5B1E3A]/10 text-[#D4AF37] transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#5B1E3A]/30">
                  <FiLinkedin />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-[#725563]">
                    LinkedIn
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm text-[#F4EFE6]/65 transition-colors group-hover:text-[#F4EFE6]">
                    Connect
                    <FiArrowUpRight className="text-xs" />
                  </p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/35 to-[#D4AF37]/10" />

        {/* =========================
            BOTTOM BAR
        ========================== */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-[8px] uppercase tracking-[0.34em] text-[#F4EFE6]/30">
            © 2026 Leila Mirfakhraei. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#D4AF37]/25" />

            <p className="font-serif text-xs italic text-[#F4EFE6]/35">
              Visual Design • Art Direction • Storytelling
            </p>

            <span className="h-px w-6 bg-[#D4AF37]/25" />
          </div>
        </div>
      </div>
    </footer>
  );
}