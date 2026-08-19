import {
  NextResponse,
} from "next/server";

import {
  revalidatePath,
} from "next/cache";

import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";

import {
  projectSchema,
} from "@/lib/validations/project";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

function createSlug(
  title: string
) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function PUT(
  request: Request,
  context: Context
) {
  const admin =
    await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } =
      await context.params;

    const body =
      await request.json();

    const result =
      projectSchema.safeParse(
        body
      );

    if (!result.success) {
      const errors: Record<
        string,
        string
      > = {};

      for (
        const issue of
        result.error.issues
      ) {
        const field =
          issue.path[0]?.toString();

        if (
          field &&
          !errors[field]
        ) {
          errors[field] =
            issue.message;
        }
      }

      return NextResponse.json(
        {
          error:
            "Some fields need attention.",
          errors,
        },
        {
          status: 400,
        }
      );
    }

    const data =
      result.data;

    const existing =
      await prisma.project.findUnique({
        where: {
          id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          error:
            "Project not found.",
        },
        {
          status: 404,
        }
      );
    }

    let slug =
      existing.slug;

    if (
      existing.title !==
      data.title
    ) {
      const baseSlug =
        createSlug(
          data.title
        );

      slug =
        baseSlug;

      let counter = 2;

      while (true) {
        const match =
          await prisma.project.findFirst({
            where: {
              slug,
              NOT: {
                id,
              },
            },
          });

        if (!match) {
          break;
        }

        slug =
          `${baseSlug}-${counter}`;

        counter++;
      }
    }

    const project =
      await prisma.project.update({
        where: {
          id,
        },

        data: {
          title:
            data.title,

          slug,

          category:
            data.category,

          year:
            data.year ||
            null,

          description:
            data.description,

          coverImage:
            data.coverImage ||
            null,

          oneSheets:
            data.oneSheets,

          outdoor:
            data.outdoor,

          international:
            data.international,

          gallery:
            data.gallery,

          sortOrder:
            data.sortOrder,

          published:
            data.published,
        },
      });

    revalidatePath("/");
    revalidatePath(
      "/admin/projects"
    );

    return NextResponse.json(
      project
    );
  } catch (error) {
    console.error(
      "UPDATE PROJECT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to update project.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  context: Context
) {
  const admin =
    await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      {
        error:
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } =
      await context.params;

    await prisma.project.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    revalidatePath(
      "/admin/projects"
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE PROJECT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete project.",
      },
      {
        status: 500,
      }
    );
  }
}