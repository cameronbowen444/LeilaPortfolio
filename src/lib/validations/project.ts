import { z } from "zod";

export const projectCategories = [
  "PRODUCTION",
  "USU_MARKETING",
  "PERSONAL",
  "MOTION_GRAPHICS",
] as const;

export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Project title must be at least 2 characters.")
    .max(150, "Project title cannot exceed 150 characters."),

  category: z.enum(projectCategories),

  year: z
    .string()
    .trim()
    .max(30, "Year cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters.")
    .max(1500, "Description cannot exceed 1500 characters."),

  coverImage: z
    .string()
    .trim()
    .max(1000, "Cover image URL is too long.")
    .optional()
    .or(z.literal("")),

  oneSheets: z
    .array(z.string().trim().max(120))
    .max(10, "You can add up to 10 One Sheet items."),

  outdoor: z
    .array(z.string().trim().max(120))
    .max(10, "You can add up to 10 Outdoor items."),

  international: z
    .array(z.string().trim().max(120))
    .max(10, "You can add up to 10 International items."),

  gallery: z
    .array(z.string().trim().max(1000))
    .max(30, "You can add up to 30 gallery images."),

  sortOrder: z
    .number()
    .int()
    .min(0)
    .max(99),

  published: z.boolean(),
});

export type ProjectInput = z.infer<
  typeof projectSchema
>;