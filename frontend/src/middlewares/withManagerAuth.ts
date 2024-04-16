import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => token?.user.role === "manager",
  },
});

export const config = { matcher: ["/dashboard/*"] };
