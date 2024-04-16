import { withAuth } from "next-auth/middleware";
import { RoutesAccess } from "@/lib/constants/routesAccess";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const user = req.nextauth.token?.user;
    if (
      !RoutesAccess[user?.role || "unauthorized"].includes(req.nextUrl.pathname)
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token?.user,
    },
  },
);

export const config = {
  matcher: ["/((?!$|restaurants/*|api|static|.*\\..*|_next).*)"],
};
