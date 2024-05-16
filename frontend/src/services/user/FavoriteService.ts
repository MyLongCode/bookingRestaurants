import { axiosAuth } from "@/lib/axios";
import { Restaurant } from "@/models/restaurant/restaurant.type";
import fetch from "@/lib/fetch";
import { revalidateFavorite } from "@/lib/actions";

export default class FavoriteService {
  public static async getAll(id: string | number): Promise<Restaurant[]> {
    return await fetch.get(`/user/${id}/favorite/`, "favorite");
  }

  public static async add(userId: string | number, id: string | number) {
    return await axiosAuth
      .post(`/user/${userId}/favorite/`, { restaurant: id })
      .then((res) => {
        revalidateFavorite();
        return res.data;
      });
  }

  public static async remove(userId: string | number, id: string | number) {
    return await axiosAuth
      .delete(`/user/${userId}/favorite/${id}/`)
      .then((res) => {
        return res.data;
      });
  }
}
