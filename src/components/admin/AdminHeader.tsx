"use client";

import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import {
  FiExternalLink,
  FiLogOut,
} from "react-icons/fi";

type Props = {
  name: string;
  email: string;
};

export default function AdminHeader({
  name,
  email,
}: Props) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D4AF37]/15 bg-[#0D0D0D]/92 backdrop-blur-2xl">
      {/* subtle cinematic glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-24 h-[220px] w-[300px] rounded-full bg-[#7E2A5A]/12 blur-[100px]" />

        <div className="absolute right-[10%] -top-28 h-[200px] w-[280px] rounded-full bg-[#D4AF37]/5 blur-[110px]" />
      </div>

      {/* top accent line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

      <div className="relative mx-auto flex min-h-[86px] max-w-[1450px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        {/* =====================================
            LEFT / BRAND
        ===================================== */}

        <Link
          href="/admin"
          className="group flex min-w-0 items-center gap-4"
        >
          {/* monogram */}

          <div className="relative flex h-[50px] w-[50px] shrink-0 items-center justify-center">
            <div className="absolute inset-[3px] rotate-45 border border-[#D4AF37]/45 transition-all duration-500 group-hover:rotate-[135deg] group-hover:border-[#D4AF37]" />

            <div className="absolute inset-[9px] rotate-45 border border-[#7E2A5A]/50 transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#A64A79]" />

            <span className="relative z-10 font-serif text-lg italic text-[#F4EFE6]">
              LM
            </span>
          </div>

          {/* identity */}

          <div className="min-w-0">
            <p className="truncate font-serif text-[14px] uppercase tracking-[0.18em] text-[#F4EFE6] sm:text-[16px] sm:tracking-[0.22em]">
              Leila Mirfakhraei
            </p>

            <div className="mt-1.5 flex items-center gap-2">
              <span className="h-px w-5 shrink-0 bg-[#D4AF37]" />

              <p className="truncate text-[8px] uppercase tracking-[0.32em] text-[#D4AF37] sm:text-[9px] sm:tracking-[0.38em]">
                Portfolio Administration
              </p>
            </div>

            {/* signed in user */}

            <div className="mt-1.5 hidden items-center gap-2 lg:flex">
              <p className="text-[10px] text-[#F4EFE6]/45">
                {name}
              </p>

              <span className="h-[3px] w-[3px] rounded-full bg-[#7E2A5A]" />

              <p className="text-[9px] text-[#F4EFE6]/25">
                {email}
              </p>
            </div>
          </div>
        </Link>

        {/* =====================================
            RIGHT / ACTIONS
        ===================================== */}

        <div className="flex shrink-0 items-center gap-3">
          {/* VIEW PORTFOLIO */}

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[46px] items-center justify-center gap-3 overflow-hidden border border-[#D4AF37]/35 bg-[#D4AF37]/[0.025] px-4 sm:min-w-[165px] sm:px-6"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-500 ease-out group-hover:scale-x-100" />

            <span className="relative hidden text-[9px] uppercase tracking-[0.28em] text-[#D4AF37] transition-colors duration-300 group-hover:text-[#101010] sm:inline">
              View Portfolio
            </span>

            <FiExternalLink className="relative text-base text-[#D4AF37] transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] group-hover:text-[#101010]" />
          </Link>

          {/* LOGOUT */}

          <SignOutButton redirectUrl="/admin/login">
            <button
              type="button"
              className="group relative flex h-[46px] items-center justify-center gap-3 overflow-hidden border border-[#7E2A5A]/35 bg-[#7E2A5A]/[0.06] px-4 sm:min-w-[135px] sm:px-6"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-[#7E2A5A] transition-transform duration-500 ease-out group-hover:scale-x-100" />

              <FiLogOut className="relative text-base text-[#B56B8D] transition-colors duration-300 group-hover:text-[#F4EFE6]" />

              <span className="relative hidden text-[9px] uppercase tracking-[0.28em] text-[#F4EFE6]/60 transition-colors duration-300 group-hover:text-[#F4EFE6] sm:inline">
                Logout
              </span>
            </button>
          </SignOutButton>
        </div>
      </div>

      {/* bottom cinematic line */}

      <div className="absolute bottom-0 left-1/2 h-px w-[72%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </header>
  );
}