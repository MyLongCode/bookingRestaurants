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
            username: "admin",
            password: credentials?.password,
          })
          .then((res) => {
            console.log(res);
            return res.data;
          })
          .catch((e) => {
            console.error(e);
          });

        if (!data) return null;

        return {
          email: data.user_data.email,
          id: data.user_data.id.toString(),
          name: data.user_data.full_name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
