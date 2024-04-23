import { withAuth } from "next-auth/middleware";
import { RoutesAccess } from "@/lib/constants/routesAccess";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const user = req.nextauth.token?.user!;

    if (!user || !RoutesAccess[user?.role].includes(req.nextUrl.pathname)) {
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
