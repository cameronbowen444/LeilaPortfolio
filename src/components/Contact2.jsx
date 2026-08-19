"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "motion/react";
import { FiMail, FiSend } from "react-icons/fi";

type Kernel = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
};

export default function Contact() {
  const [sent, setSent] = useState(false);

  const kernels = useMemo<Kernel[]>(
    () =>
      Array.from({ length: 22 }).map((_, index) => ({
        id: index,
        left: 6 + Math.random() * 88,
        delay: Math.random() * 4,
        duration: 2.6 + Math.random() * 2,
        size: 9 + Math.random() * 10,
        rotate: Math.random() * 240 - 120,
      })),
    []
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSent(true);

    setTimeout(() => {
      setSent(false);
    }, 3000);
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0f0f0f] px-5 py-20 text-[#F4EFE6] sm:px-7 md:px-10 lg:px-12 lg:py-28"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[20%] h-[320px] w-[320px] rounded-full bg-[#5B1E3A]/18 blur-[140px]" />

        <div className="absolute right-[8%] bottom-[15%] h-[300px] w-[300px] rounded-full bg-[#D4AF37]/7 blur-[150px]" />
      </div>

      {/* top divider */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

      <div className="relative mx-auto max-w-[1180px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D4AF37]" />

            <p className="text-[9px] uppercase tracking-[0.45em] text-[#D4AF37]">
              Contact
            </p>

            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl"
          >
            Let&apos;s make something
            <span className="italic text-[#7E2A5A]"> worth watching.</span>
          </motion.h2>

          <p className="mx-auto mt-4 max-w-[560px] text-sm leading-7 text-[#F4EFE6]/45">
            Have a project, campaign, or idea in mind? Drop a message below.
          </p>
        </div>

        {/* POPCORN MACHINE */}
        <div className="relative mx-auto max-w-[850px]">
          {/* Ambient red glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B1E2D]/13 blur-[130px]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* =========================
                MARQUEE TOP
            ========================== */}
            <div className="relative rounded-t-[28px] border border-[#D4AF37]/30 bg-[#7A1D2A] px-4 py-5 shadow-[0_25px_80px_rgba(0,0,0,0.4)] sm:px-7">
              {/* bulbs */}
              <div className="absolute left-4 right-4 top-2 flex justify-between">
                {Array.from({ length: 13 }).map((_, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      opacity: [0.45, 1, 0.45],
                      scale: [0.9, 1.15, 0.9],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: index * 0.08,
                    }}
                    className="h-2 w-2 rounded-full bg-[#F3C969] shadow-[0_0_10px_rgba(243,201,105,.75)]"
                  />
                ))}
              </div>

              <div className="pt-3 text-center">
                <p className="font-serif text-xl tracking-[0.18em] text-[#F8EBD5] sm:text-2xl">
                  NOW SHOWING
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.42em] text-[#F3C969]/75">
                  Your Next Creative Project
                </p>
              </div>
            </div>

            {/* =========================
                MACHINE BODY
            ========================== */}
            <div className="relative border-x border-[#D4AF37]/25 bg-[#3A1018] px-4 pb-5 pt-0 sm:px-7">
              {/* side pillars */}
              <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-[#5D121C] to-[#8E2430] sm:w-6" />

              <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-[#5D121C] to-[#8E2430] sm:w-6" />

              {/* Glass */}
              <div className="relative min-h-[660px] overflow-hidden border-x border-b border-[#F3C969]/20 bg-[#161616]/92 shadow-inner sm:min-h-[610px]">
                {/* glass reflections */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.06),transparent_18%,transparent_70%,rgba(255,255,255,.025))]" />

                <div className="pointer-events-none absolute left-[12%] top-0 h-full w-px bg-white/[0.04]" />

                {/* popcorn animation */}
                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
                  {kernels.map((kernel) => (
                    <motion.div
                      key={kernel.id}
                      initial={{
                        x: "-50%",
                        y: 560,
                        rotate: 0,
                        opacity: 0,
                      }}
                      animate={{
                        y: [
                          560,
                          380,
                          170,
                          60,
                          190,
                          420,
                          580,
                        ],
                        rotate: [
                          0,
                          kernel.rotate / 3,
                          kernel.rotate,
                          kernel.rotate * 1.4,
                          kernel.rotate * 1.8,
                        ],
                        opacity: [0, 1, 1, 1, 1, 0.8, 0],
                      }}
                      transition={{
                        duration: kernel.duration,
                        repeat: Infinity,
                        delay: kernel.delay,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-0"
                      style={{
                        left: `${kernel.left}%`,
                      }}
                    >
                      <PopcornKernel size={kernel.size} />
                    </motion.div>
                  ))}
                </div>

                {/* warm glow inside machine */}
                <div className="pointer-events-none absolute left-1/2 top-[14%] h-[250px] w-[430px] -translate-x-1/2 rounded-full bg-[#F3C969]/8 blur-[90px]" />

                {/* FORM */}
                <div className="relative z-20 mx-auto max-w-[620px] px-5 py-12 sm:px-8 sm:py-14">
                  <div className="mb-8 text-center">
                    <p className="text-[8px] uppercase tracking-[0.42em] text-[#D4AF37]">
                      Box Office
                    </p>

                    <h3 className="mt-3 font-serif text-3xl sm:text-4xl">
                      Send a message.
                    </h3>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-[8px] uppercase tracking-[0.35em] text-[#F4EFE6]/45"
                      >
                        Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full border border-[#D4AF37]/15 bg-[#0F0F0F]/80 px-4 py-3.5 text-sm text-[#F4EFE6] outline-none transition placeholder:text-[#F4EFE6]/20 focus:border-[#D4AF37]/55"
                      />
                    </div>

                    {/* email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-[8px] uppercase tracking-[0.35em] text-[#F4EFE6]/45"
                      >
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full border border-[#D4AF37]/15 bg-[#0F0F0F]/80 px-4 py-3.5 text-sm text-[#F4EFE6] outline-none transition placeholder:text-[#F4EFE6]/20 focus:border-[#D4AF37]/55"
                      />
                    </div>

                    {/* subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-[8px] uppercase tracking-[0.35em] text-[#F4EFE6]/45"
                      >
                        Subject
                      </label>

                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        placeholder="What's the project?"
                        className="w-full border border-[#D4AF37]/15 bg-[#0F0F0F]/80 px-4 py-3.5 text-sm text-[#F4EFE6] outline-none transition placeholder:text-[#F4EFE6]/20 focus:border-[#D4AF37]/55"
                      />
                    </div>

                    {/* message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-[8px] uppercase tracking-[0.35em] text-[#F4EFE6]/45"
                      >
                        Message
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell me a little about what you're working on..."
                        className="w-full resize-none border border-[#D4AF37]/15 bg-[#0F0F0F]/80 px-4 py-3.5 text-sm leading-6 text-[#F4EFE6] outline-none transition placeholder:text-[#F4EFE6]/20 focus:border-[#D4AF37]/55"
                      />
                    </div>

                    {/* submit */}
                    <button
                      type="submit"
                      className="group relative flex w-full items-center justify-center overflow-hidden border border-[#D4AF37]/50 bg-[#7A1D2A] px-6 py-4"
                    >
                      <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

                      <span className="relative flex items-center gap-3 text-[9px] uppercase tracking-[0.35em] text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#121212]">
                        {sent ? "Message Sent" : "Send Message"}

                        <FiSend />
                      </span>
                    </button>
                  </form>

                  {/* direct email */}
                  <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#F4EFE6]/35">
                    <FiMail />

                    <span>hello@leiladesign.com</span>
                  </div>
                </div>

                {/* POPCORN COLLECTION AT BOTTOM */}
                <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-full">
                  {Array.from({ length: 28 }).map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        y: [0, -3, 0],
                        rotate: [
                          0,
                          index % 2 === 0 ? 6 : -6,
                          0,
                        ],
                      }}
                      transition={{
                        duration: 2 + (index % 4) * 0.4,
                        repeat: Infinity,
                        delay: index * 0.05,
                      }}
                      className="absolute bottom-[-8px]"
                      style={{
                        left: `${(index * 3.7) % 96}%`,
                      }}
                    >
                      <PopcornKernel size={18 + (index % 4) * 3} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* =========================
                POPCORN MACHINE BASE
            ========================== */}
            <div className="relative rounded-b-[28px] border border-[#D4AF37]/30 bg-[#7A1D2A] px-5 py-5 shadow-[0_30px_70px_rgba(0,0,0,.4)]">
              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-[#F3C969]/35" />

                <p className="text-[8px] uppercase tracking-[0.42em] text-[#F3C969]/80">
                  Fresh Ideas • Served Daily
                </p>

                <span className="h-px w-12 bg-[#F3C969]/35" />
              </div>

              {/* machine feet */}
              <div className="absolute -bottom-4 left-10 h-4 w-12 rounded-b bg-[#511019]" />
              <div className="absolute -bottom-4 right-10 h-4 w-12 rounded-b bg-[#511019]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PopcornKernel({ size }: { size: number }) {
  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      <span className="absolute left-[22%] top-[4%] h-[55%] w-[55%] rounded-[55%_45%_55%_45%] bg-[#FFF1C9] shadow-[0_2px_4px_rgba(0,0,0,.18)]" />

      <span className="absolute right-[4%] top-[20%] h-[52%] w-[52%] rounded-[45%_55%_45%_55%] bg-[#F7DFA9]" />

      <span className="absolute bottom-[4%] left-[10%] h-[50%] w-[50%] rounded-[50%] bg-[#FFE8B9]" />

      <span className="absolute bottom-[10%] right-[18%] h-[44%] w-[44%] rounded-[50%] bg-[#FFF4D7]" />

      <span className="absolute left-[42%] top-[42%] h-[16%] w-[16%] rounded-full bg-[#C97B3B]/70" />
    </div>
  );
}