"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

import {
  FiExternalLink,
  FiLogOut,
} from "react-icons/fi";

type Props = {
  name: string;
  email: string;
};

const links = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Projects",
    href: "/admin/projects",
  },
  {
    name: "Experience",
    href: "/admin/experience",
  },
];

export default function AdminHeader({
  name,
  email,
}: Props) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/15 bg-[#111111]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        {/* Brand */}
        <Link
          href="/admin"
          className="flex shrink-0 items-center gap-3"
        >
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 rotate-45 border border-[#D4AF37]/40" />

            <span className="relative font-serif text-sm italic">
              LM
            </span>
          </div>

          <div className="hidden sm:block">
            <p className="font-serif text-sm tracking-[0.12em]">
              LEILA
            </p>

            <p className="mt-1 text-[6px] uppercase tracking-[0.34em] text-[#D4AF37]">
              Portfolio Admin
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-6">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-2 py-2 text-[8px] uppercase tracking-[0.22em] transition ${
                  active
                    ? "text-[#D4AF37]"
                    : "text-[#F4EFE6]/40 hover:text-[#F4EFE6]"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute bottom-0 left-2 right-2 h-px bg-[#D4AF37]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Account */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right lg:block">
            <p className="text-[10px] text-[#F4EFE6]/70">
              {name}
            </p>

            <p className="mt-1 text-[8px] text-[#F4EFE6]/25">
              {email}
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            title="View portfolio"
            className="flex h-9 w-9 items-center justify-center border border-[#D4AF37]/15 text-[#F4EFE6]/40 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
          >
            <FiExternalLink />
          </Link>

          <SignOutButton redirectUrl="/admin/login">
            <button
              title="Sign out"
              className="flex h-9 items-center gap-2 border border-[#7E2A5A]/25 px-3 text-[8px] uppercase tracking-[0.18em] text-[#F4EFE6]/45 transition hover:border-[#7E2A5A]/60 hover:text-[#F4EFE6]"
            >
              <FiLogOut />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </SignOutButton>
        </div>
      </div>
    </header>
  );
}