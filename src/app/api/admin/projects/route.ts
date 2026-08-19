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

export async function POST(
  request: Request
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
    const body =
      await request.json();

    const result =
      projectSchema.safeParse(
        body
      );

    if (!result.success) {
      const fieldErrors: Record<
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
          !fieldErrors[field]
        ) {
          fieldErrors[field] =
            issue.message;
        }
      }

      return NextResponse.json(
        {
          error:
            "Some project fields need attention.",

          errors:
            fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const data =
      result.data;

    const baseSlug =
      createSlug(
        data.title
      );

    let slug =
      baseSlug;

    let counter = 2;

    while (
      await prisma.project.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug =
        `${baseSlug}-${counter}`;

      counter++;
    }

    const project =
      await prisma.project.create({
        data: {
          title:
            data.title,

          slug,

          category:
            data.category,

          year:
            data.year || null,

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
      "/admin"
    );
    revalidatePath(
      "/admin/projects"
    );

    return NextResponse.json(
      project,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE PROJECT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "The project could not be saved.",

        details:
          process.env.NODE_ENV ===
            "development" &&
          error instanceof Error
            ? error.message
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}