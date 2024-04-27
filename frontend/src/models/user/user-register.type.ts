export type UserRegister = {
  full_name: string;
  email: string;
  role: "user" | "manager" | "employee";
  password: string;
};
