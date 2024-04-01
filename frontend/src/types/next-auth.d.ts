import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  import { User } from "@/models/user.type";

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  import { User } from "@/models/user.type";

  interface JWT {
    user: User;
    access: string;
    refresh: string;
  }
}
