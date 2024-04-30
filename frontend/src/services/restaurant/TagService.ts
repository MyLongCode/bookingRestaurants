import fetch from "@/lib/fetch";
import { RestaurantTags } from "@/models/restaurant/restaurantTags.type";

export default class TagService {
  public static async getAll(): Promise<RestaurantTags> {
    return await fetch.get(`/tag/`, "tags");
  }
}
