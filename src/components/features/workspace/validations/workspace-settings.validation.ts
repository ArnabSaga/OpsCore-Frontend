import { z } from "zod";

export const updateWorkspaceGeneralSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(120, "Workspace name cannot exceed 120 characters"),
});

export type UpdateWorkspaceGeneralValues = z.infer<typeof updateWorkspaceGeneralSchema>;
