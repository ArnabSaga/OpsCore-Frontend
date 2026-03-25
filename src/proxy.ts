import { NextRequest, NextResponse } from "next/server";
import { UserRole, getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from "./lib/authUtils";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)"],
};

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("redirect", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

function redirect(req: NextRequest, pathname: string) {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return NextResponse.redirect(url);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  try {
    const cookie = req.headers.get("cookie") ?? "";
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

    // Rule 3: User trying to access public route (Home page, etc.)
    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // Only fetch user info if a session cookie exists to avoid unnecessary backend calls
    const hasSessionCookie = cookie.includes("better-auth.session_token");

    let isLoggedIn = false;
    let user = null;

    if (hasSessionCookie) {
      try {
        const res = await fetch(`${BASE_API_URL}/api/v1/auth/me`, {
          method: "GET",
          headers: {
            cookie,
            "content-type": "application/json",
          },
          cache: "no-store",
        });

        isLoggedIn = res.ok;
        const json = isLoggedIn ? await res.json().catch(() => null) : null;
        user = json?.data || json;
      } catch (authError) {
        console.error("Auth check failed in proxy:", authError);
      }
    }

    // Extract user details
    const userRole = (user?.systemRole || user?.role) as UserRole | null;
    const emailVerified = user?.emailVerified;
    const needPasswordChange = user?.needPasswordChange;

    //* Rule - 1: If User logged in and trying to access auth route (login/register)
    if (isLoggedIn && isAuth) {
      return redirect(req, getDefaultDashboardRoute(userRole || "USER"));
    }

    //* Rule - 2: If User logged in and trying to access reset-password route
    if (pathname === "/reset-password") {
      // Allow if password change is needed or if they came from forgot-password (detected by search param usually)
      // For now, let's allow if needPasswordChange is true
      if (isLoggedIn && !needPasswordChange && !req.nextUrl.searchParams.has("email")) {
        return redirect(req, getDefaultDashboardRoute(userRole || "USER"));
      }
      return NextResponse.next();
    }

    //* Rule - 4: User is not logged in but trying to access protected route
    if (!isLoggedIn && routeOwner !== null) {
      return redirectToLogin(req);
    }

    //* Rule - 5: Enforcing user to stay in the reset-password route | verify email if their needPasswordChange is true
    if (isLoggedIn) {
      //* sub-rule - 1: need Email Verification
      if (emailVerified === false) {
        if (pathname !== "/verify-email") {
          const verifyUrl = new URL("/verify-email", req.url);
          verifyUrl.searchParams.set("email", user.email);
          return NextResponse.redirect(verifyUrl);
        }
        return NextResponse.next();
      }

      //* sub-rule - 2: User has verified email but trying to access verify-email route
      if (emailVerified === true && pathname === "/verify-email") {
        return redirect(req, getDefaultDashboardRoute(userRole || "USER"));
      }

      //* sub-rule - 3: User has needPasswordChange true
      if (needPasswordChange) {
        if (pathname !== "/reset-password") {
          const resetUrl = new URL("/reset-password", req.url);
          resetUrl.searchParams.set("email", user.email);
          return NextResponse.redirect(resetUrl);
        }
        return NextResponse.next();
      }

      //* sub-rule - 4: User has needPasswordChange false but on reset-password
      if (!needPasswordChange && pathname === "/reset-password") {
        return redirect(req, getDefaultDashboardRoute(userRole || "USER"));
      }
    }

    //* Rule - 6: User is logged in and trying to access common protected route
    if (isLoggedIn && routeOwner === "COMMON") {
      return NextResponse.next();
    }

    //* Rule - 7: User is logged in and trying to access role based protected route but doesn't have required role
    if (isLoggedIn && routeOwner !== "COMMON" && routeOwner !== null) {
      // Simple case: ADMIN can access anything ADMIN or COMMON.
      // We unify SUPER_ADMIN and ADMIN for simplified checks if needed
      const effectiveRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole;
      if (routeOwner !== effectiveRole) {
        return redirect(req, getDefaultDashboardRoute(userRole || "USER"));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    // On critical error, better to allow next or redirect to login?
    // Usually, public routes should still work.
    return NextResponse.next();
  }
}
