export const authQueryKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authQueryKeys.all, "current-user"] as const,
  me: () => [...authQueryKeys.all, "me"] as const,
} as const;
