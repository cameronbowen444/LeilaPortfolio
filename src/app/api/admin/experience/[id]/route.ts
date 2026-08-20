import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { experienceSchema } from "@/lib/validations/experience";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* =====================================
   UPDATE EXPERIENCE
===================================== */

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const admin = await getAdminUser();

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
    const { id } = await context.params;

    const existingExperience =
      await prisma.experience.findUnique({
        where: {
          id,
        },
      });

    if (!existingExperience) {
      return NextResponse.json(
        {
          error:
            "Experience not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body = await request.json();

    /* =====================================
       VALIDATE
    ===================================== */

    const result =
      experienceSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<
        string,
        string
      > = {};

      for (const issue of result.error.issues) {
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
        "EXPERIENCE VALIDATION FAILED:",
        result.error.issues
      );

      return NextResponse.json(
        {
          error:
            "Some fields need attention before this experience can be updated.",

          errors: fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const data = result.data;

    /* =====================================
       CALCULATE NEW DISPLAY ORDER

       IMPORTANT:
       Exclude the current experience when
       finding top/bottom.
    ===================================== */

    let sortOrder =
      existingExperience.sortOrder;

    if (data.placement === "top") {
      const firstExperience =
        await prisma.experience.findFirst({
          where: {
            id: {
              not: id,
            },
          },

          orderBy: {
            sortOrder: "asc",
          },

          select: {
            sortOrder: true,
          },
        });

      sortOrder =
        firstExperience === null
          ? 0
          : firstExperience.sortOrder - 1;
    }

    if (data.placement === "bottom") {
      const lastExperience =
        await prisma.experience.findFirst({
          where: {
            id: {
              not: id,
            },
          },

          orderBy: {
            sortOrder: "desc",
          },

          select: {
            sortOrder: true,
          },
        });

      sortOrder =
        lastExperience === null
          ? 0
          : lastExperience.sortOrder + 1;
    }

    /* =====================================
       UPDATE
    ===================================== */

    const experience =
      await prisma.experience.update({
        where: {
          id,
        },

        data: {
          company: data.company,
          role: data.role,

          location:
            data.location || null,

          period: data.period,

          description:
            data.description,

          highlights:
            data.highlights,

          current:
            data.current,

          sortOrder,
        },
      });

    /* =====================================
       REVALIDATE
    ===================================== */

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(
      "/admin/experience"
    );

    return NextResponse.json(
      experience
    );
  } catch (error) {
    console.error(
      "UPDATE EXPERIENCE ERROR:",
      error
    );

    const details =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        error:
          "Failed to update experience.",

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
   DELETE EXPERIENCE
===================================== */

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  const admin = await getAdminUser();

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

    const existingExperience =
      await prisma.experience.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
        },
      });

    if (!existingExperience) {
      return NextResponse.json(
        {
          error:
            "Experience not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.experience.delete({
      where: {
        id,
      },
    });

    /* =====================================
       REVALIDATE
    ===================================== */

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(
      "/admin/experience"
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE EXPERIENCE ERROR:",
      error
    );

    const details =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        error:
          "Failed to delete experience.",

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