export const platformQueryKeys = {
  all: ["platform"] as const,

  workspaces: (query: { search?: string; page?: number }) =>
    ["platform-workspaces", query] as const,

  users: (query: { search?: string; page?: number }) =>
    ["platform-users", query] as const,

  subscriptions: (query: { search?: string; page?: number }) =>
    ["platform-subscriptions", query] as const,

  logs: (query: { search?: string; page?: number }) =>
    ["platform-logs", query] as const,
} as const;

