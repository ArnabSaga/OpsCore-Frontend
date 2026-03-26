import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters")
    .max(120, "Workspace name cannot exceed 120 characters"),
});

export type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceSchema>;
