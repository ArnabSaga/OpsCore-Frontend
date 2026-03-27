import { z } from "zod";

export const updateWorkspaceMemberSchema = z
  .object({
    role: z.enum(["OWNER", "ADMIN", "MEMBER"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  })
  .refine((data) => data.role !== undefined || data.status !== undefined, {
    message: "At least one field must be provided",
  });

export type UpdateWorkspaceMemberValues = z.infer<typeof updateWorkspaceMemberSchema>;

export const transferWorkspaceOwnershipSchema = z.object({
  confirm: z.literal(true),
});
