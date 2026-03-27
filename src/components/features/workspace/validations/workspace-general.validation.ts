import { z } from "zod";

export const updateWorkspaceGeneralSettingsSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().max(500).optional().nullable(),
  timezone: z.string().max(100).optional().nullable(),
  currency: z.string().length(3).optional().nullable(),
  supportEmail: z.string().email().optional().nullable(),
  billingEmail: z.string().email().optional().nullable(),
});

export type UpdateWorkspaceGeneralSettingsValues = z.infer<
  typeof updateWorkspaceGeneralSettingsSchema
>;
