import { z } from "zod";

export const experienceSchema = z.object({
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters.")
    .max(100, "Company name cannot be longer than 100 characters."),

  role: z
    .string()
    .trim()
    .min(2, "Role must be at least 2 characters.")
    .max(100, "Role cannot be longer than 100 characters."),

  location: z
    .string()
    .trim()
    .max(100, "Location cannot be longer than 100 characters.")
    .optional()
    .or(z.literal("")),

  period: z
    .string()
    .trim()
    .min(4, "Please enter a valid period.")
    .max(50, "Period cannot be longer than 50 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters.")
    .max(1000, "Description cannot exceed 1000 characters."),

  highlights: z
    .array(
      z
        .string()
        .trim()
        .min(2, "Highlight must be at least 2 characters.")
        .max(80, "Highlight cannot exceed 80 characters.")
    )
    .min(1, "Add at least one highlight.")
    .max(6, "You can add up to 6 highlights."),

  current: z.boolean(),

  sortOrder: z
    .number()
    .int()
    .min(0)
    .max(9),
});

export type ExperienceInput = z.infer<
  typeof experienceSchema
>;