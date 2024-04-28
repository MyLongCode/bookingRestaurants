export type Employee = {
  id: number;
  user: {
    email: string;
    full_name: string;
  };
  restaurant: number;
  is_active: boolean;
};
