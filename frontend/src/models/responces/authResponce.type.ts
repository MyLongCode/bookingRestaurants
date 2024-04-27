import { User } from "@/models/user/user.type";

export type AuthResponse = {
  user_data: User;
  refresh: string;
  access: string;
};
