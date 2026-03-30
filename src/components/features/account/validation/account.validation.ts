import { z } from "zod";

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") return undefined;
  return value;
};

export const updateAccountProfileSchema = z.object({
  name: z.preprocess(
    emptyStringToUndefined,
    z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .optional()
  ),
  removeImage: z.boolean().optional(),
});

export const updateAccountPasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required")
      .max(255, "Current password is too long"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(255, "New password is too long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your new password")
      .max(255, "Confirmation password is too long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Confirm password must match new password",
    path: ["confirmPassword"],
  });

export type UpdateAccountProfileFormValues = z.infer<typeof updateAccountProfileSchema>;
export type UpdateAccountPasswordFormValues = z.infer<typeof updateAccountPasswordSchema>;
