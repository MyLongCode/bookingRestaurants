export type UserRegister = {
  full_name: string;
  email: string;
  role: "user" | "owner" | "employee";
  password: string;
};
