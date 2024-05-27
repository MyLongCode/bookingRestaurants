import NextAuth, { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/lib/axios";
import { AuthResponse } from "@/models/responces/authResponce.type";
import UserService from "@/services/user/UserService";
import { jwtDecode } from "jwt-decode";
import { JWT } from "next-auth/jwt";

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
        let currentRestaurant: number | undefined = undefined;

        if (user.role === "employee") {
          const ids = await UserService.getRestaurantId(user.id);

          currentRestaurant = ids[0];
        } else if (user.role === "owner") {
          const restaurant = await UserService.getRestaurant(user.id);

          currentRestaurant = restaurant ? restaurant.id : undefined;
        }

        return {
          ...user,
          id: user.id.toString(),
          access: data.access,
          refresh: data.refresh,
          currentRestaurant,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (trigger === "update") {
          token.user = session.user;

          return token;
        }

        token.user = user;
        token.refresh = user.refresh;
        token.access = user.access;
        return token;
      }

      const exp = jwtDecode(token.access).exp;

      if (exp && Date.now() < exp) {
        return token;
      }

      const newToken = await refreshAccessToken(token);

      return {
        access: newToken.access,
        refresh: newToken.refresh,
        user: newToken.user,
      };
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

const refreshAccessToken = async (token: JWT) => {
  const newToken = await UserService.refresh(token.refresh);

  return {
    ...token,
    access: newToken.access,
  };
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
