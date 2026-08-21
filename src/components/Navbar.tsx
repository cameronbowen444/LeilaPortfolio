"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  FiArrowUpRight,
  FiMenu,
  FiX,
} from "react-icons/fi";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Technologies", href: "#technologies" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState<string | null>(null);

  const scrollFrameRef =
    useRef<number | null>(null);

  /* =====================================
     SCROLL + ACTIVE SECTION STATE
     Same behavior, one throttled listener.
  ===================================== */

  useEffect(() => {
    const sectionIds = [
      "about",
      "projects",
      "experience",
      "technologies",
      "contact",
    ];

    const updateNavigationState = () => {
      scrollFrameRef.current = null;

      setScrolled(window.scrollY > 35);

      const scrollPosition =
        window.scrollY +
        Math.min(
          window.innerHeight * 0.34,
          280
        );

      let currentSection:
        | string
        | null = null;

      for (const id of sectionIds) {
        const section =
          document.getElementById(id);

        if (!section) {
          continue;
        }

        const sectionTop =
          section.offsetTop;

        if (
          scrollPosition >=
          sectionTop
        ) {
          currentSection = id;
        }
      }

      /*
       * Keep the navbar unselected while the
       * visitor is still in the hero.
       */
      const aboutSection =
        document.getElementById(
          "about"
        );

      if (
        aboutSection &&
        scrollPosition <
          aboutSection.offsetTop
      ) {
        currentSection = null;
      }

      setActiveSection(
        currentSection
      );
    };

    const requestUpdate = () => {
      if (
        scrollFrameRef.current !==
        null
      ) {
        return;
      }

      scrollFrameRef.current =
        window.requestAnimationFrame(
          updateNavigationState
        );
    };

    updateNavigationState();

    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    return () => {
      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (
        scrollFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          scrollFrameRef.current
        );

        scrollFrameRef.current =
          null;
      }
    };
  }, []);

  /* =====================================
     LOCK BODY WHEN MOBILE MENU IS OPEN
  ===================================== */

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      {/* =====================================
          NAVBAR
      ===================================== */}

      <motion.header
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed left-0 top-0 z-50 w-full
          transition-all duration-500
          ${
            scrolled
              ? "border-b border-[#D4AF37]/15 bg-[#0D0D0D]/88 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
              : "border-b border-[#D4AF37]/20 bg-gradient-to-b from-black/45 via-black/15 to-transparent"
          }
        `}
      >
        {/* =====================================
            SUBTLE NAV LIGHTING
        ===================================== */}

        <div
          className={`
            pointer-events-none absolute inset-0
            transition-opacity duration-500
            ${
              scrolled
                ? "opacity-100"
                : "opacity-30"
            }
          `}
        >
          <div className="absolute -left-20 top-[-100px] h-[220px] w-[320px] rounded-full bg-[#7E2A5A]/10 blur-[100px]" />

          <div className="absolute right-[12%] top-[-100px] h-[190px] w-[260px] rounded-full bg-[#D4AF37]/5 blur-[100px]" />
        </div>

        {/* =====================================
            NAV CONTENT
        ===================================== */}

        <nav
          className={`
            relative mx-auto flex max-w-[1500px] items-center justify-between
            px-4 transition-all duration-500
            sm:px-6 lg:px-10 xl:px-12
            ${
              scrolled
                ? "h-[76px]"
                : "h-[92px]"
            }
          `}
        >
          {/* =====================================
              BRAND
          ===================================== */}

          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 sm:gap-4"
          >
            {/* MONOGRAM */}

            <div
              className={`
                relative flex shrink-0 items-center justify-center
                transition-all duration-500
                ${
                  scrolled
                    ? "h-[44px] w-[44px]"
                    : "h-[50px] w-[50px] sm:h-[54px] sm:w-[54px]"
                }
              `}
            >
              {/* outside diamond */}

              <div className="absolute inset-[3px] rotate-45 border border-[#D4AF37]/45 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-[#D4AF37]" />

              {/* inside diamond */}

              <div className="absolute inset-[8px] rotate-45 border border-[#7E2A5A]/55 transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#A64A79]" />

              {/* glow */}

              <div className="absolute inset-2 rounded-full bg-[#D4AF37]/0 blur-xl transition-all duration-500 group-hover:bg-[#D4AF37]/10" />

              <span className="relative z-10 font-serif text-lg italic tracking-[-0.04em] text-[#F4EFE6] sm:text-xl">
                LM
              </span>
            </div>

            {/* BRAND TEXT - STAYS ON MOBILE */}

            <div className="min-w-0">
              <p
                className={`
                  truncate font-serif uppercase text-[#F4EFE6]
                  transition-all duration-500
                  ${
                    scrolled
                      ? "text-[11px] tracking-[0.17em] sm:text-[13px] sm:tracking-[0.2em]"
                      : "text-[11px] tracking-[0.17em] sm:text-[14px] sm:tracking-[0.22em]"
                  }
                `}
              >
                Leila Mirfakhraei
              </p>

              <div className="mt-[5px] flex items-center gap-2">
                <span className="h-px w-4 shrink-0 bg-[#D4AF37] sm:w-5" />

                <span className="truncate text-[7px] uppercase tracking-[0.25em] text-[#D4AF37] sm:text-[8px] sm:tracking-[0.38em]">
                  Graphic Designer
                </span>
              </div>
            </div>
          </Link>

          {/* =====================================
              DESKTOP NAV
          ===================================== */}

          <div className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navLinks.map(
              (link) => {
                const sectionId =
                  link.href.slice(1);

                const active =
                  activeSection ===
                  sectionId;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() =>
                      setActiveSection(
                        sectionId
                      )
                    }
                    aria-current={
                      active
                        ? "location"
                        : undefined
                    }
                    className="group relative flex h-10 items-center"
                  >
                    <span
                      className={`relative text-[10px] uppercase tracking-[0.27em] transition-colors duration-300 xl:text-[11px] ${
                        active
                          ? "text-[#D4AF37]"
                          : "text-[#F4EFE6]/65 group-hover:text-[#F4EFE6]"
                      }`}
                    >
                      {link.name}
                    </span>

                    {/* active / hover dot */}

                    <span
                      className={`absolute -bottom-[1px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#D4AF37] transition-all duration-300 ${
                        active
                          ? "scale-100 opacity-100 shadow-[0_0_8px_rgba(212,175,55,0.75)]"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                );
              }
            )}

            {/* DIVIDER */}

            <span className="h-5 w-px bg-[#F4EFE6]/10" />

            {/* CONTACT */}

            <Link
              href="#contact"
              onClick={() =>
                setActiveSection(
                  "contact"
                )
              }
              aria-current={
                activeSection ===
                "contact"
                  ? "location"
                  : undefined
              }
              className={`group relative flex min-w-[145px] items-center justify-center overflow-hidden border px-5 py-[13px] backdrop-blur-sm transition-all duration-300 ${
                activeSection ===
                "contact"
                  ? "border-[#D4AF37] bg-[#D4AF37]"
                  : "border-[#D4AF37]/40 bg-black/10 hover:border-[#D4AF37]"
              }`}
            >
              <span
                className={`absolute inset-0 origin-left bg-[#D4AF37] transition-transform duration-500 ease-out ${
                  activeSection ===
                  "contact"
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />

              <span
                className={`relative flex items-center gap-3 text-[9px] uppercase tracking-[0.3em] transition-colors duration-300 ${
                  activeSection ===
                  "contact"
                    ? "text-[#101010]"
                    : "text-[#D4AF37] group-hover:text-[#101010]"
                }`}
              >
                Let&apos;s Talk

                <FiArrowUpRight className="text-sm transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" />
              </span>
            </Link>
          </div>

          {/* =====================================
              MOBILE MENU BUTTON
          ===================================== */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Open navigation menu"
            className="group relative ml-3 flex h-[44px] w-[44px] shrink-0 items-center justify-center overflow-hidden border border-[#D4AF37]/30 bg-black/15 backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37]/70 lg:hidden"
          >
            <span className="absolute inset-0 translate-y-full bg-[#7E2A5A]/25 transition-transform duration-300 group-hover:translate-y-0" />

            <FiMenu className="relative z-10 text-xl text-[#F4EFE6]" />
          </button>
        </nav>

        {/* =====================================
            BOTTOM CINEMA LINE
        ===================================== */}

        <div
          className={`
            absolute bottom-0 left-1/2 h-px -translate-x-1/2
            bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent
            transition-all duration-500
            ${
              scrolled
                ? "w-[72%] opacity-35"
                : "w-full opacity-55"
            }
          `}
        />
      </motion.header>

      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={() =>
                setMenuOpen(false)
              }
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-[6px] lg:hidden"
            />

            {/* DRAWER */}

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[90%] max-w-[410px] flex-col overflow-hidden border-l border-[#D4AF37]/20 bg-[#0D0D0D]/95 backdrop-blur-2xl lg:hidden"
            >
              {/* ATMOSPHERE */}

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-32 -top-28 h-[340px] w-[340px] rounded-full bg-[#7E2A5A]/25 blur-[120px]" />

                <div className="absolute -bottom-32 left-[-140px] h-[320px] w-[320px] rounded-full bg-[#D4AF37]/8 blur-[120px]" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[length:100%_8px] opacity-20" />
              </div>

              <div className="relative z-10 flex h-full flex-col px-6 pb-7 pt-6">
                {/* =====================================
                    MOBILE HEADER
                ===================================== */}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* little LM */}

                    <div className="relative flex h-11 w-11 items-center justify-center">
                      <div className="absolute inset-[3px] rotate-45 border border-[#D4AF37]/45" />

                      <span className="relative font-serif text-base italic text-[#F4EFE6]">
                        LM
                      </span>
                    </div>

                    <div>
                      <p className="font-serif text-[13px] uppercase tracking-[0.18em] text-[#F4EFE6]">
                        Leila Mirfakhraei
                      </p>

                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="h-px w-4 bg-[#D4AF37]" />

                        <p className="text-[7px] uppercase tracking-[0.3em] text-[#D4AF37]">
                          Graphic Designer
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    aria-label="Close navigation menu"
                    className="group flex h-11 w-11 items-center justify-center border border-[#F4EFE6]/15 bg-white/[0.02] text-xl text-[#F4EFE6] transition-all duration-300 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                  >
                    <FiX className="transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </div>

                {/* =====================================
                    DECORATIVE DIVIDER
                ===================================== */}

                <div className="my-8 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/35" />

                  <span className="h-[5px] w-[5px] rotate-45 bg-[#D4AF37]/70" />

                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/35" />
                </div>

                {/* =====================================
                    MOBILE LINKS
                ===================================== */}

                <nav className="flex flex-1 flex-col justify-center">
                  {navLinks.map(
                    (link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{
                          opacity: 0,
                          x: 30,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.1 +
                            index *
                              0.07,
                        }}
                      >
                        <Link
                          href={
                            link.href
                          }
                          onClick={() => {
                            setActiveSection(
                              link.href.slice(
                                1
                              )
                            );

                            setMenuOpen(
                              false
                            );
                          }}
                          aria-current={
                            activeSection ===
                            link.href.slice(1)
                              ? "location"
                              : undefined
                          }
                          className="group relative flex items-center justify-between border-b border-[#F4EFE6]/[0.07] py-5"
                        >
                          <div className="flex items-baseline gap-4">
                            <span
                              className={`text-[8px] tracking-[0.18em] transition-colors ${
                                activeSection ===
                                link.href.slice(1)
                                  ? "text-[#D4AF37]"
                                  : "text-[#D4AF37]/45"
                              }`}
                            >
                              0
                              {index + 1}
                            </span>

                            <span
                              className={`font-serif text-[34px] italic leading-none transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#D4AF37] ${
                                activeSection ===
                                link.href.slice(1)
                                  ? "translate-x-1 text-[#D4AF37]"
                                  : "text-[#F4EFE6]"
                              }`}
                            >
                              {
                                link.name
                              }
                            </span>
                          </div>

                          <FiArrowUpRight
                            className={`text-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#D4AF37] ${
                              activeSection ===
                              link.href.slice(1)
                                ? "text-[#D4AF37]"
                                : "text-[#7E2A5A]"
                            }`}
                          />
                        </Link>
                      </motion.div>
                    )
                  )}
                </nav>

                {/* =====================================
                    MOBILE CONTACT
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
                    delay: 0.4,
                  }}
                  className="mt-7"
                >
                  <Link
                    href="#contact"
                    onClick={() => {
                      setActiveSection(
                        "contact"
                      );

                      setMenuOpen(false);
                    }}
                    className="group relative flex w-full items-center justify-between overflow-hidden border border-[#D4AF37]/40 bg-[#4A111C]/30 px-6 py-5"
                  >
                    <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-500 group-hover:scale-x-100" />

                    <span className="relative text-[9px] uppercase tracking-[0.35em] text-[#D4AF37] transition-colors group-hover:text-[#101010]">
                      Start a Project
                    </span>

                    <FiArrowUpRight className="relative text-lg text-[#D4AF37] transition-colors group-hover:text-[#101010]" />
                  </Link>
                </motion.div>

                {/* =====================================
                    FOOTER
                ===================================== */}

                <div className="mt-6 flex items-center justify-between border-t border-[#F4EFE6]/[0.06] pt-5">
                  <p className="text-[7px] uppercase tracking-[0.28em] text-[#F4EFE6]/30">
                    Entertainment Design
                  </p>

                  <span className="font-serif text-xs italic text-[#D4AF37]/45">
                    LM
                  </span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}