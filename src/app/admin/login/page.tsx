import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

import { getAdminUser } from "@/lib/admin";

export default async function AdminLoginPage() {
  const { userId } = await auth();

  if (userId) {
    const admin = await getAdminUser();

    if (admin) {
      redirect("/admin");
    }

    redirect("/admin/unauthorized");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#121212] px-5 text-[#F4EFE6]">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-[330px] w-[330px] rounded-full bg-[#5B1E3A]/20 blur-[140px]" />

        <div className="absolute bottom-[10%] right-[15%] h-[320px] w-[320px] rounded-full bg-[#D4AF37]/7 blur-[140px]" />
      </div>

      {/* top line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />

      <div className="relative w-full max-w-[430px]">
        <div className="border border-[#D4AF37]/20 bg-[#171414]/90 p-8 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
          {/* monogram */}
          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center">
              <div className="absolute inset-0 rotate-45 border border-[#D4AF37]/40" />

              <div className="absolute inset-[6px] rotate-45 border border-[#7E2A5A]/45" />

              <span className="relative font-serif text-xl italic">
                LM
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[8px] uppercase tracking-[0.45em] text-[#D4AF37]">
              Portfolio Administration
            </p>

            <h1 className="mt-3 font-serif text-3xl">
              Welcome back.
            </h1>

            <p className="mx-auto mt-3 max-w-[310px] text-sm leading-6 text-[#F4EFE6]/40">
              Sign in with an authorized Google account to manage the
              portfolio.
            </p>
          </div>

          <div className="mt-8">
            <SignInButton
              mode="modal"
              forceRedirectUrl="/admin"
            >
              <button
                type="button"
                className="group relative flex w-full items-center justify-center overflow-hidden border border-[#D4AF37]/45 px-5 py-4"
              >
                <span className="absolute inset-0 translate-y-full bg-[#D4AF37] transition-transform duration-300 group-hover:translate-y-0" />

                <span className="relative text-[9px] uppercase tracking-[0.34em] text-[#D4AF37] transition-colors group-hover:text-[#121212]">
                  Continue with Google
                </span>
              </button>
            </SignInButton>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#D4AF37]/15" />

            <span className="text-[6px] uppercase tracking-[0.35em] text-[#725563]">
              Authorized Access Only
            </span>

            <span className="h-px flex-1 bg-[#D4AF37]/15" />
          </div>
        </div>
      </div>
    </main>
  );
}