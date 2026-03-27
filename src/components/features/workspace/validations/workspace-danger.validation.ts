import { z } from "zod";

export const deleteWorkspaceSchema = z.object({
  confirmName: z.string().trim().min(1, "Workspace name confirmation is required"),
});

export type DeleteWorkspaceValues = z.infer<typeof deleteWorkspaceSchema>;
