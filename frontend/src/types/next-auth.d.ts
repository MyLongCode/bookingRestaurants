import NextAuth from "next-auth";
import { User } from "@/models/user.type";

declare module "next-auth" {
  interface Session {
    user: {
      user_data: User;
      refresh: string;
      access: string;
    };
  }
}
