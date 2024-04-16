import { User } from "@/models/user.type";
import axios, { axiosAuth } from "@/lib/axios";
import { Restaurant } from "@/models/restaurant/restaurant.type";

export default class UserService {
  public static async getById(id: string | number): Promise<User> {
    return await axiosAuth.post<User>(`/user/${id}/`).then((res) => res.data);
  }

  public static async refresh(token: string): Promise<{ access: string }> {
    return await axios
      .post("/api/token/refresh/", { refresh: token })
      .then((res) => res.data);
  }

  public static async patch(
    id: string | number,
    data: Partial<User>,
  ): Promise<User> {
    return await axiosAuth
      .patch<User>(`/user/${id}/`, data)
      .then((res) => res.data);
  }

  public static async getRestaurant(id: string | number): Promise<Restaurant> {
    return await axiosAuth
      .get<Restaurant[]>(`/user/${id}/restaurant/`)
      .then((res) => res.data[0]);
  }
}
