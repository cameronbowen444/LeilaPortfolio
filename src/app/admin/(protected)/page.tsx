import Link from "next/link";

import {
  FiArrowRight,
  FiBriefcase,
  FiImage,
  FiPlus,
} from "react-icons/fi";

import { getAdminUser } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const admin = await getAdminUser();

  const [projectCount, experienceCount] = await Promise.all([
    prisma.project.count({
      where: {
        published: true,
      },
    }),
    prisma.experience.count(),
  ]);

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-[1200px]">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-10">
          <p className="text-[9px] uppercase tracking-[0.42em] text-[#D4AF37]">
            Portfolio Administration
          </p>

          <h1 className="mt-2 font-serif text-[34px] leading-tight sm:text-[40px]">
            Welcome back
            {admin?.firstName ? (
              <span className="italic text-[#8A345F]">
                {`, ${admin.firstName}`}
              </span>
            ) : null}
            .
          </h1>

          <p className="mt-3 max-w-[620px] text-[14px] leading-6 text-[#F4EFE6]/45">
            Manage projects and professional experience from one place.
          </p>
        </div>

        {/* =====================================
            STATS
        ===================================== */}

        <div className="grid gap-4 md:grid-cols-2">
          <DashboardCard
            title="Published Projects"
            value={projectCount}
            description="Portfolio projects currently visible on the public site."
            href="/admin/projects"
            icon={<FiImage />}
          />

          <DashboardCard
            title="Experience"
            value={experienceCount}
            description="Professional roles currently displayed in the portfolio."
            href="/admin/experience"
            icon={<FiBriefcase />}
          />
        </div>

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <div className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-7 bg-[#D4AF37]" />

            <p className="text-[9px] uppercase tracking-[0.38em] text-[#D4AF37]">
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

/* =====================================
   DASHBOARD CARD
===================================== */

function DashboardCard({
  title,
  value,
  description,
  href,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden border border-[#D4AF37]/12 bg-[#171414] p-6 transition duration-300 hover:border-[#D4AF37]/35"
    >
      {/* subtle atmosphere */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-[150px] w-[150px] rounded-full bg-[#7E2A5A]/8 blur-[70px]" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center border border-[#D4AF37]/20 text-[17px] text-[#D4AF37]">
            {icon}
          </div>

          <FiArrowRight className="text-[16px] text-[#F4EFE6]/25 transition group-hover:translate-x-1 group-hover:text-[#D4AF37]" />
        </div>

        <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-[#725563]">
          {title}
        </p>

        <p className="mt-2 font-serif text-[42px] leading-none text-[#F4EFE6]">
          {value}
        </p>

        <p className="mt-3 max-w-[420px] text-[13px] leading-6 text-[#F4EFE6]/42">
          {description}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <span className="text-[8px] uppercase tracking-[0.26em] text-[#D4AF37]/45 transition group-hover:text-[#D4AF37]">
            Manage
          </span>

          <FiArrowRight className="text-[11px] text-[#D4AF37]/40 transition group-hover:translate-x-1 group-hover:text-[#D4AF37]" />
        </div>
      </div>
    </Link>
  );
}

/* =====================================
   QUICK ACTION
===================================== */

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
        <p className="mb-1 text-[8px] uppercase tracking-[0.3em] text-[#D4AF37]/45">
          Create New
        </p>

        <h3 className="font-serif text-[22px]">
          {title}
        </h3>

        <p className="mt-2 max-w-[400px] text-[13px] leading-5 text-[#F4EFE6]/38">
          {description}
        </p>
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#D4AF37]/20 text-[#D4AF37] transition group-hover:bg-[#D4AF37] group-hover:text-[#121212]">
        <FiPlus />
      </div>
    </Link>
  );
}