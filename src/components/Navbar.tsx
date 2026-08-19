"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Technologies", href: "#technologies" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="fixed left-0 top-0 z-50 w-full border-b border-[#D4AF37]/30 bg-[#121212]/90 backdrop-blur-xl"
      >
        {/* Cinematic background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(126,42,90,0.18),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(212,175,55,0.08),transparent_25%)]" />

        <nav className="relative mx-auto flex h-24 max-w-[1450px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Logo / Identity */}
          <Link href="/" className="group flex items-center gap-4">
            <div className="relative flex h-13 w-13 items-center justify-center">
              <div className="absolute inset-0 rotate-45 border border-[#D4AF37]/40 transition-all duration-500 group-hover:rotate-0 group-hover:border-[#D4AF37]" />

              <div className="absolute inset-[5px] rotate-45 border border-[#7E2A5A]/50 transition-all duration-500 group-hover:rotate-0" />

              <span className="relative font-serif text-xl italic text-[#F4EFE6]">
                LM
              </span>
            </div>

            <div className="hidden sm:block">
              <p className="font-serif text-[15px] tracking-[0.22em] text-[#F4EFE6]">
                LAYLA MIRFAKHRAEI
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-px w-5 bg-[#D4AF37]" />

                <p className="text-[9px] uppercase tracking-[0.42em] text-[#D4AF37]">
                  Graphic Designer
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative py-2"
              >
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#F4EFE6]/70 transition-colors duration-300 group-hover:text-[#D4AF37]">
                  {link.name}
                </span>

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-[#7E2A5A] via-[#D4AF37] to-[#A45728] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}

            {/* Contact CTA */}
            <Link
              href="#contact"
              className="group relative overflow-hidden border border-[#D4AF37]/50 px-6 py-3"
            >
              <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

              <span className="relative text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] transition-colors duration-300 group-hover:text-[#121212]">
                Let&apos;s Talk
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="group flex h-11 w-11 items-center justify-center border border-[#D4AF37]/40 bg-[#5B1E3A]/10 text-xl text-[#F4EFE6] transition-all hover:border-[#D4AF37] hover:bg-[#5B1E3A]/30 lg:hidden"
          >
            <FiMenu className="transition-transform group-hover:scale-110" />
          </button>
        </nav>

        {/* Bottom gold accent */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-[#121212]/80 backdrop-blur-md lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed right-0 top-0 z-[70] flex h-screen w-[88%] max-w-[420px] flex-col overflow-hidden border-l border-[#D4AF37]/30 bg-[#121212] px-7 py-7 lg:hidden"
            >
              {/* Background Atmosphere */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,42,90,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(164,87,40,0.15),transparent_35%)]" />

              <div className="relative flex h-full flex-col">
                {/* Sidebar Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-serif text-xl tracking-[0.12em] text-[#F4EFE6]">
                      LAYLA
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-px w-5 bg-[#D4AF37]" />

                      <p className="text-[9px] uppercase tracking-[0.4em] text-[#D4AF37]">
                        Graphic Designer
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className="flex h-11 w-11 items-center justify-center border border-[#D4AF37]/40 text-xl text-[#F4EFE6] transition hover:border-[#D4AF37] hover:bg-[#5B1E3A]/30"
                  >
                    <FiX />
                  </button>
                </div>

                {/* Cinema Divider */}
                <div className="my-10 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />

                  <span className="h-2 w-2 rotate-45 border border-[#D4AF37]" />

                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-1 flex-col justify-center">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 35 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.12 + index * 0.08,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between border-b border-[#F4EFE6]/8 py-6"
                      >
                        <span className="font-serif text-4xl italic text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#D4AF37]">
                          {link.name}
                        </span>

                        <span className="text-xl text-[#7E2A5A] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#D4AF37]">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Contact Button */}
                <Link
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="group relative mb-8 mt-6 flex items-center justify-center overflow-hidden border border-[#D4AF37]/50 px-6 py-4"
                >
                  <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

                  <span className="relative text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] transition-colors duration-300 group-hover:text-[#121212]">
                    Let&apos;s Talk
                  </span>
                </Link>

                {/* Footer */}
                <div className="border-t border-[#D4AF37]/20 pt-6">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#725563]">
                    Design • Direction • Visual
                  </p>

                  <p className="mt-3 font-serif text-sm italic text-[#F4EFE6]/50">
                    Bringing stories to life through design.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}