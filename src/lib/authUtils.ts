export type UserRole = "SUPER_ADMIN" | "OWNER" | "ADMIN" | "USER";

export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/change-password",
  "/resend-verification",
];

export const PROTECTED_ROUTES = [
  "/dashboard",
  "/workspaces",
  "/projects",
  "/tasks",
  "/account",
  "/analytics",
  "/invoices",
  "/activity-logs",
  "/automation",
  "/notifications",
];

export const isAuthRoute = (pathname: string) => {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
};

export const isProtectedRoute = (pathname: string) => {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
};

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
  if (pathname.startsWith("/admin")) return "ADMIN";
  if (pathname.startsWith("/super-admin")) return "SUPER_ADMIN";

  if (isProtectedRoute(pathname)) return "COMMON";

  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case "SUPER_ADMIN":
    case "OWNER":
    case "ADMIN":
      return "/dashboard";
    default:
      return "/dashboard";
  }
};
