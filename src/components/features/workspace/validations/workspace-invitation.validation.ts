import { z } from "zod";

export const createWorkspaceInvitationSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  role: z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
});

export type CreateWorkspaceInvitationValues = z.infer<typeof createWorkspaceInvitationSchema>;
