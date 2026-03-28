import { z } from "zod";

const projectStatusEnum = z.enum(["ACTIVE", "COMPLETED", "ON_HOLD", "ARCHIVED"]);

const optionalTrimmedString = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

export const createProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Project name must be at least 2 characters")
      .max(150, "Project name cannot exceed 150 characters"),

    description: optionalTrimmedString(5000).refine(
      (value) => value === undefined || value === "" || value.trim().length <= 5000,
      {
        message: "Description cannot exceed 5000 characters",
      }
    ),

    clientName: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine((value) => !value || value.trim().length >= 2, {
        message: "Client name must be at least 2 characters",
      })
      .refine((value) => !value || value.trim().length <= 150, {
        message: "Client name cannot exceed 150 characters",
      }),

    status: projectStatusEnum.optional(),

    startDate: z.string().optional().or(z.literal("")),
    endDate: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      if (end < start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endDate"],
          message: "End date cannot be earlier than start date",
        });
      }
    }
  });

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
