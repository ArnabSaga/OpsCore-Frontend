import { z } from "zod";

export const createInvitationSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  role: z.enum(["ADMIN", "MEMBER"]).default("MEMBER"),
});

export type CreateInvitationValues = z.infer<typeof createInvitationSchema>;
