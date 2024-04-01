import type { Category } from "@/models/restaurant/category.type";

export type Menu = {
  id: number;
  name: string;
  category: Category[];
};
