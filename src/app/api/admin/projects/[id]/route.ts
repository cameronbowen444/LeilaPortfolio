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
   UPDATE PROJECT
===================================== */

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
          "You are not authorized to perform this action.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } =
      await context.params;

    /* =====================================
       FIND EXISTING PROJECT
    ===================================== */

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
       UPDATE SLUG IF TITLE CHANGED
    ===================================== */

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

      let counter =
        2;

      while (true) {
        const match =
          await prisma.project.findFirst({
            where: {
              slug,

              id: {
                not: id,
              },
            },

            select: {
              id: true,
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

    /* =====================================
       CALCULATE NEW ORDER
    ===================================== */

    let sortOrder =
      existing.sortOrder;

    if (
      data.placement ===
      "top"
    ) {
      const firstProject =
        await prisma.project.findFirst({
          where: {
            category:
              data.category,

            id: {
              not: id,
            },
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
    }

    if (
      data.placement ===
      "bottom"
    ) {
      const lastProject =
        await prisma.project.findFirst({
          where: {
            category:
              data.category,

            id: {
              not: id,
            },
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
       UPDATE PROJECT
    ===================================== */

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
      project
    );
  } catch (error) {
    console.error(
      "UPDATE PROJECT ERROR:",
      error
    );

    const details =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        error:
          "Failed to update project.",

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

/* =====================================
   DELETE PROJECT
===================================== */

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
          "You are not authorized to perform this action.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } =
      await context.params;

    /* =====================================
       CHECK PROJECT EXISTS
    ===================================== */

    const existing =
      await prisma.project.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
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

    /* =====================================
       DELETE
    ===================================== */

    await prisma.project.delete({
      where: {
        id,
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

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE PROJECT ERROR:",
      error
    );

    const details =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        error:
          "Failed to delete project.",

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