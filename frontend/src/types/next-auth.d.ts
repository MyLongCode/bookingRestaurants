import NextAuth from "next-auth";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AuthResponse } from "@/models/responces/authResponce.type";
import { User as MyUser } from "@/models/user.type";

declare module "next-auth" {
  interface Session {
    user: User;
    access: string;
    refresh: string;
    error: string;
    currentRestaurant?: number;
  }

  interface User extends MyUser {
    access: string;
    refresh: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    access: string;
    refresh: string;
  }
}
