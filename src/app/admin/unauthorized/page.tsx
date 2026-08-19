import {
  SignOutButton,
} from "@clerk/nextjs";

import {
  FiAlertTriangle,
  FiLogOut,
  FiLock,
} from "react-icons/fi";

export default function UnauthorizedPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#101010] px-5 text-[#F4EFE6]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-[350px] w-[350px] rounded-full bg-[#5B1E3A]/20 blur-[150px]" />

        <div className="absolute bottom-[10%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#D4AF37]/5 blur-[130px]" />
      </div>

      <div className="relative w-full max-w-[480px] border border-[#D4AF37]/15 bg-[#171414] p-7 shadow-[0_30px_100px_rgba(0,0,0,.55)] sm:p-9">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center border border-red-400/25 bg-red-500/5 text-red-400">
          <FiAlertTriangle />
        </div>

        <p className="mt-6 text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
          Portfolio Administration
        </p>

        <h1 className="mt-3 font-serif text-3xl">
          Access denied.
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#F4EFE6]/45">
          This Google account is signed in successfully, but it is not authorized
          to access the portfolio administration area.
        </p>

        <div className="mt-6 flex items-start gap-3 border border-[#D4AF37]/10 bg-[#101010] px-4 py-4">
          <FiLock className="mt-0.5 shrink-0 text-[#D4AF37]" />

          <p className="text-xs leading-5 text-[#F4EFE6]/40">
            Only approved administrator accounts can access Projects,
            Experience, and other portfolio management tools.
          </p>
        </div>

        <SignOutButton redirectUrl="/admin/login">
          <button
            type="button"
            className="group relative mt-7 flex w-full items-center justify-center gap-3 overflow-hidden border border-[#D4AF37]/35 bg-[#5B1E3A]/20 px-5 py-4"
          >
            <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

            <span className="relative flex items-center gap-3 text-[8px] uppercase tracking-[0.28em] text-[#D4AF37] transition-colors group-hover:text-[#101010]">
              <FiLogOut />
              Sign Out & Try Another Account
            </span>
          </button>
        </SignOutButton>
      </div>
    </main>
  );
}
