// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";

// Definera cachade routes
const CACHE_ROUTES = new Set(["/dashboard", "/profile", "/settings"]);

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Hantera caching för statiska routes
    if (CACHE_ROUTES.has(pathname)) {
      const response = NextResponse.next();
      response.headers.set(
        "Cache-Control",
        "s-maxage=1, stale-while-revalidate"
      );
      return response;
    }

    const token = request.cookies.get("auth-token")?.value;
    const isAuthRoute =
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/verify");

    // Om det är en API-route, låt den hantera sin egen auth
    if (pathname.startsWith("/api/")) {
      return NextResponse.next();
    }

    // Optimerad auth-check
    if (token) {
      try {
        const decoded = await verifyToken(token);

        // Logga in-användare ska inte kunna besöka auth routes
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Lägg till user info i headers för backend
        const response = NextResponse.next();
        response.headers.set("X-User-Id", decoded.id);
        response.headers.set("X-User-Role", decoded.role);
        return response;
      } catch (error) {
        // Ogiltig token - rensa cookie och omdirigera
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

export const config = {
  matcher: [
    /*
     * Match alla routes utom:
     * - api routes som börjar med /api/public
     * - Statiska filer (_next)
     * - Favicon och andra root-filer
     */
    "/((?!api/public|_next/static|_next/image|favicon.ico).*)",
  ],
};
