import type { DishItem } from "@/models/restaurant/dishItem.type";

export type Category = {
  id: number;
  name: string;
  photo: string;
  dish_item: DishItem[];
};
