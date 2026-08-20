import {
  z,
} from "zod";

export const projectSchema =
  z.object({
    /* =====================================
       BASIC INFORMATION
    ===================================== */

    title: z
      .string()
      .trim()
      .min(
        2,
        "Enter a project title."
      )
      .max(
        160,
        "Project title is too long."
      ),

    category:
      z.enum([
        "PRODUCTION",
        "USU_MARKETING",
        "PERSONAL",
        "MOTION_GRAPHICS",
      ]),

    year: z
      .string()
      .trim()
      .max(
        20,
        "Year is too long."
      )
      .optional()
      .default(""),

    description:
      z
        .string()
        .trim()
        .min(
          20,
          "Add at least 20 characters describing the project."
        )
        .max(
          1500,
          "Description cannot exceed 1500 characters."
        ),

    /* =====================================
       ARTWORK / MEDIA
    ===================================== */

    coverImage:
      z
        .string()
        .trim()
        .optional()
        .default(""),

    previewVideo:
      z
        .string()
        .trim()
        .optional()
        .default(""),

    videoPoster:
      z
        .string()
        .trim()
        .optional()
        .default(""),

    gallery:
      z
        .array(
          z.string()
            .trim()
            .min(1)
        )
        .max(
          40,
          "Too many gallery images."
        )
        .default([]),

    /* =====================================
       DELIVERABLES
    ===================================== */

    oneSheets:
      z
        .array(
          z.string()
            .trim()
            .min(1)
            .max(
              120,
              "One Sheet label is too long."
            )
        )
        .max(
          20,
          "Too many One Sheet entries."
        )
        .default([]),

    outdoor:
      z
        .array(
          z.string()
            .trim()
            .min(1)
            .max(
              120,
              "Outdoor label is too long."
            )
        )
        .max(
          20,
          "Too many Outdoor entries."
        )
        .default([]),

    international:
      z
        .array(
          z.string()
            .trim()
            .min(1)
            .max(
              120,
              "International label is too long."
            )
        )
        .max(
          20,
          "Too many International entries."
        )
        .default([]),

    /* =====================================
       DISPLAY SETTINGS
    ===================================== */

    placement:
      z.enum([
        "top",
        "bottom",
      ]),

    published:
      z.boolean(),
  });

export type ProjectInput =
  z.infer<
    typeof projectSchema
  >;