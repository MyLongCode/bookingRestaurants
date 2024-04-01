import { User } from "@/models/user.type";

export type AuthResponse = {
  user_data: User;
  refresh: string;
  access: string;
};
