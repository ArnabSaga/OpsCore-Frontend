export const workspaceQueryKeys = {
  all: ["workspaces"] as const,

  lists: () => [...workspaceQueryKeys.all, "list"] as const,
  list: () => [...workspaceQueryKeys.lists(), "my"] as const,

  details: () => [...workspaceQueryKeys.all, "detail"] as const,
  detail: (workspaceId: string) => [...workspaceQueryKeys.details(), workspaceId] as const,

  capabilities: (workspaceId: string) =>
    [...workspaceQueryKeys.all, "capabilities", workspaceId] as const,

  settingsSummary: (workspaceId: string) =>
    [...workspaceQueryKeys.all, "settings-summary", workspaceId] as const,

  generalSettings: (workspaceId: string) =>
    [...workspaceQueryKeys.all, "general-settings", workspaceId] as const,

  brandingSettings: (workspaceId: string) =>
    [...workspaceQueryKeys.all, "branding-settings", workspaceId] as const,

  permissions: (workspaceId: string) =>
    [...workspaceQueryKeys.all, "permissions", workspaceId] as const,

  members: (workspaceId: string) => [...workspaceQueryKeys.all, "members", workspaceId] as const,

  invitations: (workspaceId: string) =>
    [...workspaceQueryKeys.all, "invitations", workspaceId] as const,

  invitationDetails: (token: string) =>
    [...workspaceQueryKeys.all, "invitation-details", token] as const,

  myInvitations: () => [...workspaceQueryKeys.all, "my-invitations"] as const,

} as const;
