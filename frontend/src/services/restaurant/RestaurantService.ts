import { axiosAuth } from "@/lib/axios";
import { Restaurant } from "@/models/restaurant/restaurant.type";
import { Menu } from "@/models/restaurant/menu.type";
import { Photo } from "@/models/restaurant/photo.type";
import { RestaurantTags } from "@/models/restaurant/restaurantTags.type";
import { revalidateRestaurant, revalidateRestaurantTags } from "@/lib/actions";
import fetch from "@/lib/fetch";
import RestaurantTagsDto from "@/models/restaurant/restaurantTagsDto";
import { Page } from "@/models/page.type";

export default class RestaurantService {
  public static async getAll(
    tags?: string,
    name?: string,
  ): Promise<Page<Restaurant>> {
    return await axiosAuth
      .get(`/restaurant/`, {
        params: {
          tag: tags,
          name: name,
        },
      })
      .then((res) => res.data);
  }

  public static async getById(id: string | number): Promise<Restaurant> {
    return await fetch.get(`/restaurant/${id}/`, "restaurant");
  }

  public static async getMenus(id: string | number): Promise<Menu[]> {
    return await fetch.get(`/restaurant/${id}/menu/`, "restaurant menu");
  }

  public static async getPhotos(id: string | number): Promise<Photo[]> {
    return await fetch.get(`/restaurant/${id}/photo/`, "restaurant photos");
  }

  public static async getTags(id: string | number): Promise<RestaurantTags> {
    return await fetch.get(`/restaurant/${id}/tag/`, "restaurant tags");
  }

  public static async patchProfile(
    id: string | number,
    data: Partial<Restaurant>,
  ): Promise<Restaurant> {
    return await axiosAuth
      .patch<Restaurant>(`/restaurant/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        await revalidateRestaurant();
        return res.data;
      });
  }

  public static async patchSchedule(
    id: string | number,
    data: Pick<Restaurant, "schedule">,
  ): Promise<Restaurant> {
    return await axiosAuth
      .patch<Restaurant>(`/restaurant/${id}/`, data)
      .then(async (res) => {
        await revalidateRestaurant();
        return res.data;
      });
  }

  public static async patchTags(
    id: string | number,
    data: Partial<RestaurantTagsDto>,
  ): Promise<RestaurantTagsDto> {
    return await axiosAuth
      .post<RestaurantTagsDto>(`/restaurant/${id}/tag-put/`, data)
      .then(async (res) => {
        await revalidateRestaurantTags();
        return res.data;
      });
  }
}
