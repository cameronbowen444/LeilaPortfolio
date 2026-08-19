import Link from "next/link";

import {
  FiArrowRight,
  FiBriefcase,
  FiImage,
  FiPlus,
} from "react-icons/fi";

import { getAdminUser } from "@/lib/admin";

export default async function AdminDashboard() {
  const admin = await getAdminUser();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-[0.42em] text-[#D4AF37]">
              Portfolio Administration
            </p>

            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
              Welcome back
              {admin?.firstName ? `, ${admin.firstName}` : ""}.
            </h1>

            <p className="mt-3 text-sm text-[#F4EFE6]/40">
              Manage projects and professional experience from one place.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="text-[8px] uppercase tracking-[0.28em] text-[#D4AF37] transition hover:text-[#F4EFE6]"
          >
            View Live Portfolio →
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <DashboardCard
            title="Projects"
            value="0"
            description="Portfolio projects currently published."
            href="/admin/projects"
            icon={<FiImage />}
          />

          <DashboardCard
            title="Experience"
            value="0"
            description="Professional roles currently displayed."
            href="/admin/experience"
            icon={<FiBriefcase />}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-7 bg-[#D4AF37]" />

            <p className="text-[8px] uppercase tracking-[0.38em] text-[#D4AF37]">
              Quick Actions
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <QuickAction
              title="Add Project"
              description="Add artwork, campaigns, and project details."
              href="/admin/projects/new"
            />

            <QuickAction
              title="Add Experience"
              description="Add professional roles, dates, and highlights."
              href="/admin/experience/new"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  description,
  href,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group border border-[#D4AF37]/12 bg-[#171414] p-6 transition duration-300 hover:border-[#D4AF37]/35"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37]">
          {icon}
        </div>

        <FiArrowRight className="text-[#F4EFE6]/25 transition group-hover:translate-x-1 group-hover:text-[#D4AF37]" />
      </div>

      <p className="mt-7 text-[8px] uppercase tracking-[0.35em] text-[#725563]">
        {title}
      </p>

      <p className="mt-2 font-serif text-4xl">
        {value}
      </p>

      <p className="mt-3 text-xs leading-6 text-[#F4EFE6]/40">
        {description}
      </p>
    </Link>
  );
}

function QuickAction({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-6 border border-[#F4EFE6]/7 bg-[#121212] p-5 transition hover:border-[#D4AF37]/25"
    >
      <div>
        <h3 className="font-serif text-xl">
          {title}
        </h3>

        <p className="mt-2 max-w-[400px] text-xs leading-5 text-[#F4EFE6]/35">
          {description}
        </p>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37] transition group-hover:bg-[#D4AF37] group-hover:text-[#121212]">
        <FiPlus />
      </div>
    </Link>
  );
}