import { RestaurantTag } from "@/models/restaurant/restaurantTag.type";

export type RestaurantTags = {
  ["Время приема пищи"]: RestaurantTag[];
  ["Тип кухни"]: RestaurantTag[];
  ["Парковка"]: RestaurantTag[];
};
