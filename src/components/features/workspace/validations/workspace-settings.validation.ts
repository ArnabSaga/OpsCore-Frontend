import { z } from "zod";

export const updateWorkspaceGeneralSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(120, "Workspace name cannot exceed 120 characters"),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .nullable(),
  timezone: z.string().max(100).optional().nullable(),
  currency: z.string().trim().length(3, "Currency must be 3 characters").optional().nullable(),
  supportEmail: z.string().email("Enter a valid support email").optional().nullable(),
  billingEmail: z.string().email("Enter a valid billing email").optional().nullable(),
});

export type UpdateWorkspaceGeneralValues = z.infer<typeof updateWorkspaceGeneralSchema>;

export const updateWorkspaceBrandingSchema = z.object({
  logoUrl: z.string().url("Enter a valid logo URL").optional().nullable(),
  faviconUrl: z.string().url("Enter a valid favicon URL").optional().nullable(),
  primaryColor: z
    .string()
    .regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Enter a valid hex color")
    .optional()
    .nullable(),
  accentColor: z
    .string()
    .regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Enter a valid hex color")
    .optional()
    .nullable(),
  customDomain: z.string().max(255).optional().nullable(),
  emailBrandName: z.string().max(120).optional().nullable(),
});

export type UpdateWorkspaceBrandingValues = z.infer<typeof updateWorkspaceBrandingSchema>;
