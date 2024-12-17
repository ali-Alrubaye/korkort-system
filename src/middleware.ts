// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { withAuth } from "next-auth/middleware";
import { Role } from "@prisma/client";
import { canAccessRoute, isValidRole } from "@/lib/roles";

const CACHE_ROUTES = new Set(["/dashboard", "/profile", "/settings"]);

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    if (CACHE_ROUTES.has(pathname)) {
      const response = NextResponse.next();
      response.headers.set(
        "Cache-Control",
        "s-maxage=1, stale-while-revalidate"
      );
      return response;
    }

    const token = request.cookies.get("auth-token")?.value;
    const session = request.cookies.get("next-auth.session-token")?.value;

    const isAuthRoute =
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/verify");

    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    if (token || session) {
      try {
        const decoded = token ? await verifyToken(token) : null;
        // Säkerställ att rollen är giltig
        const roleStr = decoded?.role || "FREE_USER";
        const userRole: Role = isValidRole(roleStr)
          ? (roleStr as Role)
          : Role.FREE_USER;

        // Kontrollera rollbaserad åtkomst
        if (!canAccessRoute(pathname, userRole)) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        const response = NextResponse.next();
        if (decoded) {
          response.headers.set("X-User-Id", decoded.id);
          response.headers.set("X-User-Role", userRole);
        }
        return response;
      } catch (error) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("auth-token");
        return response;
      }
    }

    // Skyddade routes kräver auth
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/profile") ||
      pathname.startsWith("/settings")
    ) {
      const url = new URL("/login", request.url);
      url.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[Middleware Error]", error);
    return NextResponse.next();
  }
}

// Matcher configuration remains the same
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/((?!api/auth).*)",
    "/((?!api/public|_next/static|_next/image|favicon.ico).*)",
  ],
};
