import fetch from "@/lib/fetch";
import { RestaurantTags } from "@/models/restaurant/restaurantTags.type";
import { Restaurant } from "@/models/restaurant/restaurant.type";
import { axiosAuth } from "@/lib/axios";
import { revalidateRestaurant } from "@/lib/actions";

export default class TagService {
  public static async getAll(): Promise<RestaurantTags> {
    return await fetch.get(`/tag/`, "tags");
  }
}
