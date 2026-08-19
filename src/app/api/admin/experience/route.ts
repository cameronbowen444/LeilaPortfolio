import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";

import {
  experienceSchema,
} from "@/lib/validations/experience";

export async function POST(
  request: Request
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
    const body = await request.json();

    const result =
      experienceSchema.safeParse(
        body
      );

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
            "Some fields need attention before this experience can be saved.",

          errors: fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const data = result.data;

    const experience =
      await prisma.experience.create({
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

          sortOrder:
            data.sortOrder,
        },
      });

    revalidatePath("/");
    revalidatePath(
      "/admin"
    );
    revalidatePath(
      "/admin/experience"
    );

    return NextResponse.json(
      experience,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE EXPERIENCE ERROR:",
      error
    );

    const details =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        error:
          "The experience could not be saved.",

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