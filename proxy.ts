// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  // If there's no token, redirect to login
  if (!token) {
    if (
      // path.startsWith('/dashboard') ||
      path.startsWith("/provider") ||
      path.startsWith("/workspace")
    ) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }

  // Extract role from token (if encoded) or store in cookie
  const userRole = req.cookies.get("role")?.value;
  if (path.startsWith("/provider") && userRole !== "service_provider") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/workspace") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (path.startsWith("/messages") && userRole !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    // '/dashboard/:path*',
    "/provider/:path*",
    "/workspace/:path*",
    "/messages/:path*",
    "/favourites/:path*",
  ],
};
