import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type UserRole = "admin" | "user" | "guest";

export interface SessionPayload {
  user: {
    id: string;
    email: string;
    name: string;
    role?: string;
  };
  session: {
    id: string;
    token: string;
    expiresAt: string;
  };
}

/**
 * Next.js 16 Proxy Validation: Multi-Role Permission Layer (Admin / User / Guest)
 * Exported as `proxy` function to satisfy Next.js 16 conventions.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/dashboard/admin") || pathname.startsWith("/api/admin");

  // 1. Extract Session Cookie
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // 2. Handle GUEST (Unauthenticated) Access
  if (!sessionToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Guest access blocked by proxy middleware.",
          role: "guest",
        },
        { status: 401 }
      );
    }

    const signInUrl = new URL("/auth", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    signInUrl.searchParams.set("reason", "unauthenticated_guest");
    return NextResponse.redirect(signInUrl);
  }

  // 3. Validate Session with Better Auth
  let sessionData: SessionPayload | null = null;
  try {
    const sessionRes = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    });

    if (sessionRes.ok) {
      sessionData = await sessionRes.json();
    }
  } catch (error) {
    console.error("[proxy.ts] Error checking session:", error);
  }

  // If token is invalid or expired
  if (!sessionData || !sessionData.user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or expired session token.",
          role: "guest",
        },
        { status: 401 }
      );
    }
    const signInUrl = new URL("/auth", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    signInUrl.searchParams.set("reason", "session_expired");
    return NextResponse.redirect(signInUrl);
  }

  const userRole: UserRole = (sessionData.user.role as UserRole) || "user";

  // 4. Enforce ADMIN Role Boundary
  if (isAdminRoute && userRole !== "admin") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden: Admin role required. Access blocked by proxy middleware.",
          role: userRole,
          requiredRole: "admin",
        },
        { status: 403 }
      );
    }

    const unauthorizedUrl = new URL("/unauthorized", request.url);
    unauthorizedUrl.searchParams.set("required", "admin");
    unauthorizedUrl.searchParams.set("current", userRole);
    unauthorizedUrl.searchParams.set("attemptedPath", pathname);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // 5. Forward with enriched headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", sessionData.user.id);
  requestHeaders.set("x-user-role", userRole);
  requestHeaders.set("x-user-email", sessionData.user.email);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Next.js 16 supports default export or named `proxy`
export default proxy;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/admin/:path*",
  ],
};
