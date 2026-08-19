"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiBriefcase,
  FiExternalLink,
  FiGrid,
  FiImage,
  FiLogOut,
} from "react-icons/fi";

import { SignOutButton } from "@clerk/nextjs";

type Props = {
  name: string;
  email: string;
  image?: string;
};

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FiGrid,
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FiImage,
  },
  {
    name: "Experience",
    href: "/admin/experience",
    icon: FiBriefcase,
  },
];

export default function AdminSidebar({
  name,
  email,
  image,
}: Props) {
  const pathname = usePathname();

  return (
    <aside className="border-[#D4AF37]/15 bg-[#151313] lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-[250px] lg:border-r">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="border-b border-[#D4AF37]/15 px-6 py-6">
          <Link
            href="/admin"
            className="flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rotate-45 border border-[#D4AF37]/40" />

              <span className="relative font-serif text-sm italic">
                LM
              </span>
            </div>

            <div>
              <p className="font-serif text-sm tracking-[0.12em]">
                LEILA
              </p>

              <p className="mt-1 text-[6px] uppercase tracking-[0.35em] text-[#D4AF37]">
                Portfolio Admin
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-[9px] uppercase tracking-[0.2em] transition ${
                  active
                    ? "bg-[#5B1E3A]/25 text-[#D4AF37]"
                    : "text-[#F4EFE6]/45 hover:bg-white/[0.03] hover:text-[#F4EFE6]"
                }`}
              >
                <Icon className="text-base" />

                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-[#D4AF37]/15 p-4">
          <div className="mb-4 flex items-center gap-3">
            {image ? (
              <img
                src={image}
                alt={name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5B1E3A]/40 font-serif">
                {name.charAt(0)}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-xs">
                {name}
              </p>

              <p className="mt-1 truncate text-[9px] text-[#F4EFE6]/30">
                {email}
              </p>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-3 px-3 py-2.5 text-[8px] uppercase tracking-[0.2em] text-[#F4EFE6]/40 transition hover:text-[#D4AF37]"
          >
            <FiExternalLink />

            View Portfolio
          </Link>

          <SignOutButton redirectUrl="/admin/login">
            <button className="flex w-full items-center gap-3 px-3 py-2.5 text-[8px] uppercase tracking-[0.2em] text-[#F4EFE6]/40 transition hover:text-[#7E2A5A]">
              <FiLogOut />

              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}