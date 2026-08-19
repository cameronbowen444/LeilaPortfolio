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

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const result = experienceSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0]?.toString();

        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }

      return NextResponse.json(
        {
          error: "Some fields need attention.",
          errors: fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const data = result.data;

    const experience = await prisma.experience.update({
      where: {
        id,
      },

      data: {
        company: data.company,
        role: data.role,
        location: data.location || null,
        period: data.period,
        description: data.description,
        highlights: data.highlights,
        current: data.current,
        sortOrder: data.sortOrder,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/experience");

    return NextResponse.json(experience);
  } catch (error) {
    console.error("UPDATE EXPERIENCE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update experience.",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  const admin = await getAdminUser();

  if (!admin) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const { id } = await context.params;

    await prisma.experience.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/admin/experience");

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE EXPERIENCE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete experience.",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}