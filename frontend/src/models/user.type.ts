export type User = {
  id: number;
  full_name: string;
  email: string;
  avatar: string;
  role: "user" | "manager";
  birth_date: string;
  phone_number: string;
};
