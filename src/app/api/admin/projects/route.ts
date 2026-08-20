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

/* =====================================
   SLUG
===================================== */

function createSlug(
  title: string
) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    );
}

/* =====================================
   CREATE PROJECT
===================================== */

export async function POST(
  request: Request
) {
  const admin =
    await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      {
        error:
          "You are not authorized to perform this action.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      await request.json();

    /* =====================================
       VALIDATE
    ===================================== */

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

      console.error(
        "PROJECT VALIDATION FAILED:",
        result.error.issues
      );

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

    /* =====================================
       CREATE UNIQUE SLUG
    ===================================== */

    const baseSlug =
      createSlug(
        data.title
      );

    let slug =
      baseSlug;

    let counter =
      2;

    while (
      await prisma.project.findUnique({
        where: {
          slug,
        },

        select: {
          id: true,
        },
      })
    ) {
      slug =
        `${baseSlug}-${counter}`;

      counter++;
    }

    /* =====================================
       CALCULATE ORDER
    ===================================== */

    let sortOrder =
      0;

    if (
      data.placement ===
      "top"
    ) {
      const firstProject =
        await prisma.project.findFirst({
          where: {
            category:
              data.category,
          },

          orderBy: {
            sortOrder:
              "asc",
          },

          select: {
            sortOrder:
              true,
          },
        });

      sortOrder =
        firstProject ===
        null
          ? 0
          : firstProject.sortOrder -
            1;
    } else {
      const lastProject =
        await prisma.project.findFirst({
          where: {
            category:
              data.category,
          },

          orderBy: {
            sortOrder:
              "desc",
          },

          select: {
            sortOrder:
              true,
          },
        });

      sortOrder =
        lastProject ===
        null
          ? 0
          : lastProject.sortOrder +
            1;
    }

    /* =====================================
       CREATE PROJECT
    ===================================== */

    const project =
      await prisma.project.create({
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

          previewVideo:
            data.previewVideo ||
            null,

          videoPoster:
            data.videoPoster ||
            null,

          oneSheets:
            data.oneSheets,

          outdoor:
            data.outdoor,

          international:
            data.international,

          gallery:
            data.gallery,

          sortOrder,

          published:
            data.published,
        },
      });

    /* =====================================
       REVALIDATE
    ===================================== */

    revalidatePath(
      "/"
    );

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

    const details =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        error:
          "The project could not be saved.",

        details:
          process.env.NODE_ENV ===
          "development"
            ? details
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}