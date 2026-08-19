"use client";

import { signIn } from "next-auth/react";

export default function AdminLoginButton() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/admin",
        })
      }
      className="group relative flex w-full items-center justify-center overflow-hidden border border-[#D4AF37]/45 px-5 py-4"
    >
      <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

      <span className="relative text-[9px] uppercase tracking-[0.34em] text-[#D4AF37] transition-colors group-hover:text-[#121212]">
        Continue with Google
      </span>
    </button>
  );
}