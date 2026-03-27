export const workspaceQueryKeys = {
  all: ["workspace"] as const,
  detail: (workspaceId: string) => ["workspace", workspaceId] as const,
  capabilities: (workspaceId: string) => ["workspace-capabilities", workspaceId] as const,
  settingsSummary: (workspaceId: string) => ["workspace-settings-summary", workspaceId] as const,
  generalSettings: (workspaceId: string) => ["workspace-general-settings", workspaceId] as const,
  brandingSettings: (workspaceId: string) => ["workspace-branding-settings", workspaceId] as const,
  permissions: (workspaceId: string) => ["workspace-permissions", workspaceId] as const,
  activityLogs: (workspaceId: string, page = 1, limit = 20) =>
    ["workspace-activity-logs", workspaceId, page, limit] as const,
  members: (workspaceId: string) => ["workspace-members", workspaceId] as const,
  invitations: (workspaceId: string) => ["workspace-invitations", workspaceId] as const,
  subscription: (workspaceId: string) => ["workspace-subscription", workspaceId] as const,
  billingHistory: (workspaceId: string) => ["workspace-billing-history", workspaceId] as const,
  billingUsage: (workspaceId: string) => ["workspace-billing-usage", workspaceId] as const,
};
