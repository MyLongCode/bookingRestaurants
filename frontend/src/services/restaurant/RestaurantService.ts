import { axiosAuth } from "@/lib/axios";
import { Restaurant } from "@/models/restaurant/restaurant.type";
import { Menu } from "@/models/restaurant/menu.type";
import { Photo } from "@/models/restaurant/photo.type";
import { RestaurantTags } from "@/models/restaurant/restaurantTags.type";
import { EditSchema } from "@/restaurant/edit/restaurantProfileEditForm/RestaurantProfileEditForm";

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

  public static async getTags(id: string | number): Promise<RestaurantTags> {
    return await axiosAuth
      .get<RestaurantTags>(`/restaurant/${id}/tag/`)
      .then((res) => res.data);
  }

  public static async patchProfile(
    id: string | number,
    data: EditSchema,
  ): Promise<Restaurant> {
    return await axiosAuth
      .patch<Restaurant>(`/restaurant/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }
}
