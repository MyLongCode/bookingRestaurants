import { axiosAuth } from "@/lib/axios";
import { Restaurant } from "@/models/restaurant/restaurant.type";
import { Menu } from "@/models/restaurant/menu.type";
import {Photo} from "@/models/restaurant/photo.type";

export default class RestaurantService {
  public static async getById(id: string | number): Promise<Restaurant> {
    return await axiosAuth
      .get<Restaurant>(`/restaurant/${id}/`)
      .then((res) => res.data);
  }

  public static async getMenus(id: string | number): Promise<Menu[]> {
    return await axiosAuth
      .get<Menu[]>(`/restaurant/${id}/menu/`)
      .then((res) => res.data);
  }

  public static async getPhotos(id: string | number): Promise<Photo[]> {
    return await axiosAuth
      .get<Photo[]>(`/restaurant/${id}/photo/`)
      .then((res) => res.data);
  }
}
