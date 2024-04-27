export type User = {
  id: number;
  full_name: string;
  email: string;
  avatar: string;
  role: "user" | "manager" | "employee";
  birth_date: string;
  phone_number: string;
};
