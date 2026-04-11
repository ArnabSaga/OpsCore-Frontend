export const invitationQueryKeys = {
  all: ["invitations"] as const,

  my: () => [...invitationQueryKeys.all, "my"] as const,
  details: (token: string) => [...invitationQueryKeys.all, "details", token] as const,
  history: (workspaceId: string) => [...invitationQueryKeys.all, "history", workspaceId] as const,
} as const;
