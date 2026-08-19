import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name cannot exceed 80 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150, "Email address is too long."),

  subject: z
    .string()
    .trim()
    .min(3, "Please enter a subject.")
    .max(120, "Subject cannot exceed 120 characters."),

  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(3000, "Message cannot exceed 3000 characters."),

  website: z
    .string()
    .max(0, "Invalid submission.")
    .optional()
    .or(z.literal("")),
});

export type ContactInput = z.infer<
  typeof contactSchema
>;