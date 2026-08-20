import Link from "next/link";

import {
  notFound,
} from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const project =
    await prisma.project.findUnique({
      where: {
        id,
      },
    });

  if (!project) {
    notFound();
  }

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/admin/projects"
          className="text-[7px] uppercase tracking-[0.25em] text-[#F4EFE6]/35 hover:text-[#D4AF37]"
        >
          ← Back to Projects
        </Link>

        <div className="mb-8 mt-5">
          <p className="text-[8px] uppercase tracking-[0.4em] text-[#D4AF37]">
            Portfolio Content
          </p>

          <h1 className="mt-2 font-serif text-3xl">
            Edit Project
          </h1>

          <p className="mt-3 text-sm text-[#F4EFE6]/35">
            Update project artwork and campaign details.
          </p>
        </div>

        <div className="border border-[#D4AF37]/12 bg-[#171414] p-6 sm:p-8">
          <ProjectForm
            initialData={{
              id:
                project.id,

              title:
                project.title,

              category:
                project.category,

              year:
                project.year ??
                "",

              description:
                project.description,

              coverImage:
                project.coverImage ??
                "",

              previewVideo:
                project.previewVideo ??
                "",

              videoPoster:
                project.videoPoster ??
                "",

              oneSheets:
                project.oneSheets,

              outdoor:
                project.outdoor,

              international:
                project.international,

              gallery:
                project.gallery,

              sortOrder:
                project.sortOrder,

              published:
                project.published,
            }}
          />
        </div>
      </div>
    </div>
  );
}