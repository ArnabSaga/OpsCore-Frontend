import { z } from "zod";

export const updateWorkspaceBrandingSchema = z.object({
  logoUrl: z.string().url().optional().nullable(),
  faviconUrl: z.string().url().optional().nullable(),
  primaryColor: z
    .string()
    .regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)
    .optional()
    .nullable(),
  accentColor: z
    .string()
    .regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)
    .optional()
    .nullable(),
  customDomain: z.string().max(255).optional().nullable(),
  emailBrandName: z.string().max(120).optional().nullable(),
});

export type UpdateWorkspaceBrandingValues = z.infer<typeof updateWorkspaceBrandingSchema>;
