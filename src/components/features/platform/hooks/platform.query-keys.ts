export const platformQueryKeys = {
  all: ["platform"] as const,

  workspaces: (query: { search?: string; page?: number }) =>
    ["platform-workspaces", query] as const,

  users: (query: { search?: string; page?: number }) =>
    ["platform-users", query] as const,
} as const;
