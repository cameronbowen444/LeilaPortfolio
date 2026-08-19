import Link from "next/link";

import ExperienceForm from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[900px]">
        <Link
          href="/admin/experience"
          className="text-[7px] uppercase tracking-[0.25em] text-[#F4EFE6]/35 transition hover:text-[#D4AF37]"
        >
          ← Back to Experience
        </Link>

        <div className="mb-8 mt-5">
          <p className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Portfolio Content
          </p>

          <h1 className="mt-2 font-serif text-3xl">
            Add Experience
          </h1>
        </div>

        <div className="border border-[#D4AF37]/12 bg-[#171414] p-6 sm:p-8">
          <ExperienceForm />
        </div>
      </div>
    </div>
  );
}