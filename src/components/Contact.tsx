"use client";

import {
  FormEvent,
  useState,
} from "react";

import { motion } from "motion/react";

import {
  FiAlertCircle,
  FiCheckCircle,
  FiMail,
  FiSend,
} from "react-icons/fi";

/* =====================================
   TYPES
===================================== */

type Kernel = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  rotate: number;
};

type ContactErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
};

/* =====================================
   SEEDED POPCORN ANIMATION
===================================== */

function seededRandom(seed: number) {
  const x =
    Math.sin(seed * 9999) * 10000;

  return x - Math.floor(x);
}

const fallingKernels: Kernel[] =
  Array.from({
    length: 18,
  }).map((_, index) => ({
    id: index,

    left: Number(
      (
        38 +
        seededRandom(index + 1) *
          24
      ).toFixed(3)
    ),

    delay: Number(
      (
        seededRandom(index + 20) *
        3.8
      ).toFixed(3)
    ),

    duration: Number(
      (
        2.4 +
        seededRandom(index + 40) *
          1.5
      ).toFixed(3)
    ),

    size: Number(
      (
        12 +
        seededRandom(index + 60) *
          9
      ).toFixed(3)
    ),

    drift: Number(
      (
        seededRandom(index + 80) *
          110 -
        55
      ).toFixed(3)
    ),

    rotate: Number(
      (
        seededRandom(index + 100) *
        360
      ).toFixed(3)
    ),
  }));

/* =====================================
   CONTACT COMPONENT
===================================== */

export default function Contact() {
  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [website, setWebsite] =
    useState("");

  const [errors, setErrors] =
    useState<ContactErrors>({});

  const [sending, setSending] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  /* =====================================
     ERROR HELPERS
  ===================================== */

  function clearError(
    field: keyof ContactErrors
  ) {
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      general: undefined,
    }));
  }

  /* =====================================
     CLIENT VALIDATION
  ===================================== */

  function validateClient() {
    const next: ContactErrors = {};

    const cleanName = name.trim();
    const cleanEmail =
      email.trim();
    const cleanSubject =
      subject.trim();
    const cleanMessage =
      message.trim();

    if (!cleanName) {
      next.name =
        "Please enter your name.";
    } else if (
      cleanName.length < 2
    ) {
      next.name =
        "Your name must be at least 2 characters.";
    } else if (
      cleanName.length > 80
    ) {
      next.name =
        "Your name cannot exceed 80 characters.";
    }

    if (!cleanEmail) {
      next.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      )
    ) {
      next.email =
        "Please enter a valid email address.";
    } else if (
      cleanEmail.length > 150
    ) {
      next.email =
        "Email address is too long.";
    }

    if (!cleanSubject) {
      next.subject =
        "Please enter a subject.";
    } else if (
      cleanSubject.length < 3
    ) {
      next.subject =
        "Subject must be at least 3 characters.";
    } else if (
      cleanSubject.length > 120
    ) {
      next.subject =
        "Subject cannot exceed 120 characters.";
    }

    if (!cleanMessage) {
      next.message =
        "Please enter a message.";
    } else if (
      cleanMessage.length < 20
    ) {
      next.message =
        "Please write at least 20 characters so Leila has a little context.";
    } else if (
      cleanMessage.length > 3000
    ) {
      next.message =
        "Message cannot exceed 3000 characters.";
    }

    setErrors(next);

    return (
      Object.keys(next).length === 0
    );
  }

  /* =====================================
     SUBMIT
  ===================================== */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (sending) {
      return;
    }

    setSent(false);

    if (!validateClient()) {
      return;
    }

    setSending(true);
    setErrors({});

    try {
      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name:
                name.trim(),

              email:
                email.trim(),

              subject:
                subject.trim(),

              message:
                message.trim(),

              website,
            }),
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        );

      let data: any = null;

      if (
        contentType?.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();
      } else {
        const text =
          await response.text();

        console.error(
          "CONTACT SERVER RETURNED NON-JSON:",
          {
            status:
              response.status,

            statusText:
              response.statusText,

            body:
              text.slice(
                0,
                500
              ),
          }
        );

        setErrors({
          general:
            "The contact service returned an unexpected response. Please try again.",
        });

        return;
      }

      if (!response.ok) {
        console.error(
          "CONTACT API ERROR:",
          data
        );

        if (
          data?.errors &&
          typeof data.errors ===
            "object"
        ) {
          setErrors({
            ...data.errors,

            general:
              data.error ||
              "Please correct the fields below.",
          });
        } else {
          setErrors({
            general:
              data?.details ||
              data?.error ||
              "Your message could not be sent. Please try again.",
          });
        }

        return;
      }

      setSent(true);

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setWebsite("");
      setErrors({});

      setTimeout(() => {
        setSent(false);
      }, 6000);
    } catch (error) {
      console.error(
        "CONTACT FORM ERROR:",
        error
      );

      setErrors({
        general:
          "We couldn't reach the mail server. Please check your connection and try again.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0f0f0f] px-5 py-20 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-28"
    >
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[6%] top-[20%] h-[320px] w-[320px] rounded-full bg-[#5B1E3A]/18 blur-[140px]" />

        <div className="absolute bottom-[15%] right-[8%] h-[320px] w-[320px] rounded-full bg-[#D4AF37]/7 blur-[150px]" />
      </div>

      {/* TOP DIVIDER */}

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]" />

            <p className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]">
              Contact
            </p>

            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>

          <motion.h2
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
            }}
            transition={{
              duration: 0.6,
            }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl"
          >
            Let&apos;s make
            something

            <span className="italic text-[#7E2A5A]">
              {" "}
              worth watching.
            </span>
          </motion.h2>

          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-[#F4EFE6]/45">
            Have a project,
            campaign, or idea in
            mind? Drop a message
            below.
          </p>
        </div>

        {/* =====================================
            POPCORN MACHINE
        ===================================== */}

        <div className="relative mx-auto max-w-[860px]">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
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
              duration: 0.8,
            }}
            className="relative"
          >
            {/* =====================================
                TOP MARQUEE
            ===================================== */}

            <div className="relative rounded-t-[28px] border border-[#D4AF37]/30 bg-[#7A1D2A] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              {/* MARQUEE BULBS */}

              <div className="absolute left-5 right-5 top-2 flex justify-between">
                {Array.from({
                  length: 14,
                }).map(
                  (_, index) => (
                    <motion.span
                      key={index}
                      animate={{
                        opacity: [
                          0.5,
                          1,
                          0.5,
                        ],

                        scale: [
                          0.9,
                          1.1,
                          0.9,
                        ],
                      }}
                      transition={{
                        duration:
                          1.8,

                        repeat:
                          Infinity,

                        delay:
                          index *
                          0.07,
                      }}
                      className="h-2 w-2 rounded-full bg-[#F3C969] shadow-[0_0_10px_rgba(243,201,105,.8)]"
                    />
                  )
                )}
              </div>

              <div className="pt-3 text-center">
                <p className="font-serif text-xl tracking-[0.18em] text-[#F8EBD5] sm:text-2xl">
                  POP A MESSAGE
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.4em] text-[#F3C969]/75">
                  LET HER COOK!
                </p>
              </div>
            </div>

            {/* =====================================
                MACHINE BODY
            ===================================== */}

            <div className="relative border-x border-[#D4AF37]/25 bg-[#621824] px-5 pb-6 sm:px-8">
              {/* SIDE RAILS */}

              <div className="absolute left-0 top-0 h-full w-5 bg-gradient-to-r from-[#4d0d16] to-[#8d2431] sm:w-7" />

              <div className="absolute right-0 top-0 h-full w-5 bg-gradient-to-l from-[#4d0d16] to-[#8d2431] sm:w-7" />

              {/* =====================================
                  GLASS COMPARTMENT
              ===================================== */}

              <div className="relative min-h-[760px] overflow-hidden border-x border-b border-[#F3C969]/20 bg-[#151515]/93 sm:min-h-[720px]">
                {/* GLASS REFLECTION */}

                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.06),transparent_20%,transparent_72%,rgba(255,255,255,.025))]" />

                {/* WARM LIGHT */}

                <div className="pointer-events-none absolute left-1/2 top-8 h-[200px] w-[460px] -translate-x-1/2 rounded-full bg-[#F3C969]/10 blur-[85px]" />

                {/* =====================================
                    KETTLE
                ===================================== */}

                <div className="pointer-events-none absolute left-1/2 top-8 z-30 -translate-x-1/2">
                  {/* HANGER */}

                  <div className="mx-auto h-7 w-px bg-[#8f8f8f]" />

                  {/* KETTLE TOP */}

                  <div className="relative mx-auto h-8 w-[155px] rounded-t-[50%] border border-[#a7a7a7] bg-gradient-to-b from-[#d7d7d7] via-[#969696] to-[#5e5e5e] shadow-[0_8px_20px_rgba(0,0,0,.35)]">
                    <div className="absolute -left-7 top-3 h-[4px] w-9 -rotate-[28deg] rounded bg-[#777]" />

                    <div className="absolute -right-7 top-3 h-[4px] w-9 rotate-[28deg] rounded bg-[#777]" />
                  </div>

                  {/* KETTLE BODY */}

                  <div className="mx-auto h-[55px] w-[135px] rounded-b-[48px] border-x border-b border-[#8f8f8f] bg-gradient-to-b from-[#bcbcbc] via-[#8d8d8d] to-[#565656]" />

                  {/* POPPING POPCORN */}

                  {Array.from({
                    length: 6,
                  }).map(
                    (_, index) => (
                      <motion.div
                        key={
                          index
                        }
                        animate={{
                          x: [
                            0,

                            index %
                              2 ===
                            0
                              ? -18 -
                                index *
                                  2
                              : 18 +
                                index *
                                  2,

                            0,
                          ],

                          y: [
                            0,

                            -22 -
                              index *
                                6,

                            4,
                          ],

                          rotate: [
                            0,

                            index *
                              45,

                            index *
                              90,
                          ],

                          opacity: [
                            0.5,
                            1,
                            0.4,
                          ],
                        }}
                        transition={{
                          duration:
                            1.4 +
                            index *
                              0.08,

                          repeat:
                            Infinity,

                          delay:
                            index *
                            0.18,

                          ease:
                            "easeOut",
                        }}
                        className="absolute left-1/2 top-[54px]"
                      >
                        <PopcornKernel
                          size={
                            14 +
                            (index %
                              3) *
                              3
                          }
                        />
                      </motion.div>
                    )
                  )}
                </div>

                {/* =====================================
                    FALLING POPCORN
                ===================================== */}

                <div className="pointer-events-none absolute inset-0 z-20">
                  {fallingKernels.map(
                    (
                      kernel
                    ) => (
                      <motion.div
                        key={
                          kernel.id
                        }
                        initial={{
                          opacity:
                            0,

                          rotate:
                            0,
                        }}
                        animate={{
                          x: [
                            0,

                            kernel.drift,

                            kernel.drift *
                              0.35,
                          ],

                          y: [
                            0,
                            150,
                            360,
                            520,
                          ],

                          rotate: [
                            0,

                            kernel.rotate *
                              0.4,

                            kernel.rotate,
                          ],

                          opacity: [
                            0,
                            1,
                            1,
                            0.15,
                          ],
                        }}
                        transition={{
                          duration:
                            kernel.duration,

                          repeat:
                            Infinity,

                          delay:
                            kernel.delay,

                          ease:
                            "easeIn",
                        }}
                        className="absolute top-[110px]"
                        style={{
                          left: `${kernel.left.toFixed(
                            3
                          )}%`,
                        }}
                      >
                        <PopcornKernel
                          size={
                            kernel.size
                          }
                        />
                      </motion.div>
                    )
                  )}
                </div>

                {/* =====================================
                    CONTACT FORM
                ===================================== */}

                <div className="relative z-40 mx-auto max-w-[620px] px-5 pb-[210px] pt-[180px] sm:px-8">
                  <div className="mb-7 text-center">
                    <p className="text-[8px] uppercase tracking-[0.42em] text-[#D4AF37]">
                      Box Office
                    </p>

                    <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
                      Send a
                      message.
                    </h3>
                  </div>

                  <form
                    onSubmit={
                      handleSubmit
                    }
                    noValidate
                    className="space-y-4"
                  >
                    {/* GENERAL ERROR */}

                    {errors.general && (
                      <motion.div
                        initial={{
                          opacity:
                            0,
                          y: -6,
                        }}
                        animate={{
                          opacity:
                            1,
                          y: 0,
                        }}
                        className="flex items-start gap-3 border border-red-400/30 bg-red-500/[0.07] px-4 py-3.5"
                      >
                        <FiAlertCircle className="mt-0.5 shrink-0 text-red-400" />

                        <div>
                          <p className="text-[10px] font-medium text-red-300">
                            Message
                            not
                            sent
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-red-300/65">
                            {
                              errors.general
                            }
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* SUCCESS */}

                    {sent && (
                      <motion.div
                        initial={{
                          opacity:
                            0,
                          y: -6,
                        }}
                        animate={{
                          opacity:
                            1,
                          y: 0,
                        }}
                        className="flex items-start gap-3 border border-[#D4AF37]/30 bg-[#D4AF37]/[0.07] px-4 py-3.5"
                      >
                        <FiCheckCircle className="mt-0.5 shrink-0 text-[#D4AF37]" />

                        <div>
                          <p className="text-[10px] font-medium text-[#F4EFE6]">
                            Message
                            sent!
                          </p>

                          <p className="mt-1 text-[10px] leading-5 text-[#F4EFE6]/45">
                            Thanks
                            for
                            reaching
                            out.
                            Leila
                            will
                            receive
                            your
                            message
                            directly.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* NAME */}

                    <ContactField
                      label="Name"
                      value={name}
                      error={
                        errors.name
                      }
                      placeholder="Your name"
                      autoComplete="name"
                      onChange={(
                        value
                      ) => {
                        setName(
                          value
                        );

                        clearError(
                          "name"
                        );
                      }}
                    />

                    {/* EMAIL */}

                    <ContactField
                      label="Email"
                      type="email"
                      value={email}
                      error={
                        errors.email
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      onChange={(
                        value
                      ) => {
                        setEmail(
                          value
                        );

                        clearError(
                          "email"
                        );
                      }}
                    />

                    {/* SUBJECT */}

                    <ContactField
                      label="Subject"
                      value={
                        subject
                      }
                      error={
                        errors.subject
                      }
                      placeholder="What's the project?"
                      onChange={(
                        value
                      ) => {
                        setSubject(
                          value
                        );

                        clearError(
                          "subject"
                        );
                      }}
                    />

                    {/* MESSAGE */}

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <label
                          htmlFor="message"
                          className="text-[8px] uppercase tracking-[0.35em] text-[#F4EFE6]/45"
                        >
                          Message

                          <span className="ml-1 text-[#D4AF37]">
                            *
                          </span>
                        </label>

                        <span
                          className={`text-[8px] ${
                            message.length >=
                            2850
                              ? "text-[#D4AF37]"
                              : "text-[#F4EFE6]/20"
                          }`}
                        >
                          {
                            message.length
                          }
                          /3000
                        </span>
                      </div>

                      <textarea
                        id="message"
                        value={
                          message
                        }
                        rows={4}
                        maxLength={
                          3000
                        }
                        placeholder="Tell me a little about what you're working on..."
                        onChange={(
                          event
                        ) => {
                          setMessage(
                            event
                              .target
                              .value
                          );

                          clearError(
                            "message"
                          );
                        }}
                        className={`w-full resize-none border bg-[#0F0F0F]/88 px-4 py-3.5 text-sm leading-6 text-[#F4EFE6] outline-none transition placeholder:text-[#F4EFE6]/20 ${
                          errors.message
                            ? "border-red-400/60 focus:border-red-400"
                            : "border-[#D4AF37]/15 focus:border-[#D4AF37]/55"
                        }`}
                      />

                      {errors.message ? (
                        <ContactError>
                          {
                            errors.message
                          }
                        </ContactError>
                      ) : (
                        <p className="mt-1.5 text-[9px] leading-4 text-[#F4EFE6]/25">
                          Add
                          enough
                          detail
                          for
                          Leila
                          to
                          understand
                          the
                          project
                          and
                          what
                          you&apos;re
                          looking
                          for.
                        </p>
                      )}
                    </div>

                    {/* =====================================
                        HONEYPOT
                    ===================================== */}

                    <div
                      className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                      aria-hidden="true"
                    >
                      <label htmlFor="website">
                        Website
                      </label>

                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={
                          -1
                        }
                        autoComplete="off"
                        value={
                          website
                        }
                        onChange={(
                          event
                        ) =>
                          setWebsite(
                            event
                              .target
                              .value
                          )
                        }
                      />
                    </div>

                    {/* =====================================
                        SUBMIT BUTTON
                    ===================================== */}

                    <button
                      type="submit"
                      disabled={
                        sending
                      }
                      className="group relative flex w-full items-center justify-center overflow-hidden border border-[#D4AF37]/50 bg-[#7A1D2A] px-6 py-4 transition disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0 group-disabled:translate-y-full" />

                      <span className="relative flex items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#121212] group-disabled:text-[#F4EFE6]">
                        {sending
                          ? "Sending..."
                          : sent
                            ? "Message Sent"
                            : "Send Message"}

                        {sending ? (
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />
                        ) : sent ? (
                          <FiCheckCircle />
                        ) : (
                          <FiSend />
                        )}
                      </span>
                    </button>
                  </form>

                  {/* =====================================
                      EMAIL
                  ===================================== */}

                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#F4EFE6]/35">
                    <FiMail />

                    <a
                      href="mailto:leilamirfakhraei@gmail.com"
                      className="transition-colors duration-300 hover:text-[#D4AF37]"
                    >
                      leilamirfakhraei@gmail.com
                    </a>
                  </div>
                </div>

                {/* =====================================
                    STYLIZED POPCORN PILE
                ===================================== */}

                <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-[175px] w-full overflow-hidden">
                  {/* MAIN POPCORN BODY */}

                  <div className="absolute bottom-0 left-0 h-[135px] w-full bg-[#F6D86F]">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FFE99B] via-[#F6D86F] to-[#DFAE3F]" />

                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#A45728]/20 to-transparent" />

                    {/* KERNEL MARKS */}

                    {Array.from({
                      length: 30,
                    }).map(
                      (
                        _,
                        index
                      ) => (
                        <span
                          key={
                            index
                          }
                          className="absolute h-[6px] w-[8px] rounded-full border-b-2 border-[#A45728]/60"
                          style={{
                            left: `${
                              5 +
                              ((index *
                                13) %
                                90)
                            }%`,

                            top: `${
                              18 +
                              ((index *
                                23) %
                                65)
                            }%`,

                            transform: `rotate(${
                              (index %
                                5) *
                                25 -
                              50
                            }deg)`,
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* FRONT SCALLOPED MOUND */}

                  <div className="absolute bottom-[112px] left-0 flex w-full items-end">
                    {Array.from({
                      length: 18,
                    }).map(
                      (
                        _,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="relative -ml-[6px] first:ml-0"
                          style={{
                            width: `${
                              7 +
                              (index %
                                3)
                            }%`,
                          }}
                        >
                          <div
                            className="w-full rounded-[50%_50%_35%_35%] border-t-2 border-[#C99A32]/50 bg-[#FFE99B]"
                            style={{
                              height: `${
                                38 +
                                (index %
                                  4) *
                                  8
                              }px`,

                              transform: `translateY(${
                                (index %
                                  3) *
                                5
                              }px)`,
                            }}
                          />

                          {index %
                            2 ===
                            0 && (
                            <span
                              className="absolute left-1/2 top-[45%] h-[5px] w-[8px] -translate-x-1/2 rounded-full border-b-2 border-[#A45728]/60"
                              style={{
                                transform: `translateX(-50%) rotate(${
                                  index %
                                    4 ===
                                  0
                                    ? -20
                                    : 20
                                }deg)`,
                              }}
                            />
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {/* BACK MOUND */}

                  <div className="absolute bottom-[100px] left-[4%] flex w-[92%] items-end opacity-90">
                    {Array.from({
                      length: 13,
                    }).map(
                      (
                        _,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="relative -ml-[8px] first:ml-0"
                          style={{
                            width: `${
                              9 +
                              (index %
                                3)
                            }%`,
                          }}
                        >
                          <div
                            className="w-full rounded-[55%_45%_40%_40%] bg-[#F8DC78]"
                            style={{
                              height: `${
                                30 +
                                (index %
                                  4) *
                                  7
                              }px`,

                              transform: `translateY(${
                                8 +
                                (index %
                                  3) *
                                  4
                              }px)`,
                            }}
                          />
                        </div>
                      )
                    )}
                  </div>

                  {/* GLASS HIGHLIGHT */}

                  <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-r from-white/[0.03] via-transparent to-white/[0.02]" />

                  {/* BOTTOM SHADOW */}

                  <div className="absolute bottom-0 left-0 h-[7px] w-full bg-[#9B6B26]/35" />
                </div>
              </div>
            </div>

            {/* =====================================
                MACHINE BASE
            ===================================== */}

            <div className="relative rounded-b-[28px] border border-[#D4AF37]/30 bg-[#7A1D2A] px-5 py-5 shadow-[0_30px_70px_rgba(0,0,0,.45)]">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-[#F3C969]/35" />

                <p className="text-[8px] uppercase tracking-[0.42em] text-[#F3C969]/80">
                  Fresh Ideas •
                  Served Daily
                </p>

                <span className="h-px w-12 bg-[#F3C969]/35" />
              </div>

              {/* FEET */}

              <div className="absolute -bottom-4 left-10 h-4 w-12 rounded-b bg-[#511019]" />

              <div className="absolute -bottom-4 right-10 h-4 w-12 rounded-b bg-[#511019]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =====================================
   CONTACT FIELD
===================================== */

function ContactField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;

  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder: string;

  error?: string;

  type?: string;

  autoComplete?: string;
}) {
  const id = label
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[8px] uppercase tracking-[0.35em] text-[#F4EFE6]/45"
      >
        {label}

        <span className="ml-1 text-[#D4AF37]">
          *
        </span>
      </label>

      <input
        id={id}
        type={type}
        value={value}
        autoComplete={
          autoComplete
        }
        placeholder={
          placeholder
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        className={`w-full border bg-[#0F0F0F]/88 px-4 py-3.5 text-sm text-[#F4EFE6] outline-none transition placeholder:text-[#F4EFE6]/20 ${
          error
            ? "border-red-400/60 focus:border-red-400"
            : "border-[#D4AF37]/15 focus:border-[#D4AF37]/55"
        }`}
      />

      {error && (
        <ContactError>
          {error}
        </ContactError>
      )}
    </div>
  );
}

/* =====================================
   CONTACT ERROR
===================================== */

function ContactError({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.p
      initial={{
        opacity: 0,
        y: -3,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mt-1.5 flex items-start gap-1.5 text-[9px] leading-4 text-red-400"
    >
      <FiAlertCircle className="mt-[1px] shrink-0" />

      <span>
        {children}
      </span>
    </motion.p>
  );
}

/* =====================================
   POPCORN KERNEL
===================================== */

function PopcornKernel({
  size,
}: {
  size: number;
}) {
  return (
    <div
      className="relative drop-shadow-[0_3px_3px_rgba(0,0,0,.2)]"
      style={{
        width: size,
        height: size,
      }}
    >
      <span className="absolute left-[18%] top-[3%] h-[58%] w-[58%] rounded-[55%_45%_55%_45%] bg-[#FFF3C9]" />

      <span className="absolute right-[2%] top-[20%] h-[54%] w-[54%] rounded-[45%_55%_45%_55%] bg-[#F7D99A]" />

      <span className="absolute bottom-[2%] left-[8%] h-[53%] w-[53%] rounded-[50%] bg-[#FFE8AD]" />

      <span className="absolute bottom-[8%] right-[14%] h-[46%] w-[46%] rounded-[50%] bg-[#FFF4D6]" />

      <span className="absolute left-[42%] top-[43%] h-[17%] w-[17%] rounded-full bg-[#C77A38]/75" />
    </div>
  );
}