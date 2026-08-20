import { z } from "zod";

export const experienceSchema = z.object({
  company: z
    .string()
    .trim()
    .min(
      2,
      "Enter the company or organization name."
    )
    .max(
      120,
      "Company name is too long."
    ),

  role: z
    .string()
    .trim()
    .min(
      2,
      "Enter the job title or role."
    )
    .max(
      120,
      "Role is too long."
    ),

  location: z
    .string()
    .trim()
    .max(
      120,
      "Location is too long."
    )
    .optional()
    .default(""),

  period: z
    .string()
    .trim()
    .min(
      4,
      "Enter a valid time period."
    )
    .max(
      80,
      "Period is too long."
    ),

  description: z
    .string()
    .trim()
    .min(
      20,
      "Description must be at least 20 characters."
    )
    .max(
      1000,
      "Description cannot exceed 1000 characters."
    ),

  highlights: z
    .array(
      z
        .string()
        .trim()
        .min(
          2,
          "Highlights must be at least 2 characters."
        )
        .max(
          80,
          "Highlights cannot exceed 80 characters."
        )
    )
    .min(
      1,
      "Add at least one highlight."
    )
    .max(
      6,
      "You can add up to 6 highlights."
    ),

  current: z.boolean(),

  placement: z.enum([
    "top",
    "bottom",
  ]),
});

export type ExperienceInput =
  z.infer<
    typeof experienceSchema
  >;