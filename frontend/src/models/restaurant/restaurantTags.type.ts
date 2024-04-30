import { RestaurantTag } from "@/models/restaurant/restaurantTag.type";

export type RestaurantTags = {
  ["Время приема пищи"]: RestaurantTag[];
  ["Тип кухни"]: RestaurantTag[];
  ["Парковка"]: RestaurantTag[];
  ["Пищевые ограничения"]: RestaurantTag[];
  ["Особенности"]: RestaurantTag[];
  ["Событие"]: RestaurantTag[];
  ["Средний счет"]: RestaurantTag[];
  [a: string]: RestaurantTag[];
};
