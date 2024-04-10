import NextAuth, { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/lib/axios";
import { AuthResponse } from "@/models/responces/authResponce.type";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.email)
          throw new Error("Credentials error");

        const data = await axios
          .post<AuthResponse>("/api/token/", {
            email: credentials?.email,
            password: credentials?.password,
          })
          .then((res) => {
            return res.data;
          })
          .catch((e) => {
            console.error(e);
          });

        if (!data) return null;

        const user = data.user_data;

        return {
          ...user,
          id: user.id.toString(),
          name: "",
          image: "",
          access: data.access,
          refresh: data.refresh,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        token.refresh = user.refresh;
        token.access = user.access;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.refresh = token.refresh;
      session.access = token.access;
      return session;
    },
  },
  pages: {
    signIn: "/?state=login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
