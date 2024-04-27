import axios, { axiosAuth } from "@/lib/axios";
import { Restaurant } from "@/models/restaurant/restaurant.type";
import { User } from "next-auth";
import { UserRegister } from "@/models/user/user-register.type";

export default class UserService {
  public static async getById(id: string | number): Promise<User> {
    return await axiosAuth.get<User>(`/user/${id}/`).then((res) => res.data);
  }

  public static async create(data: UserRegister): Promise<User> {
    return await axios.post("/user/", data).then((res) => res.data);
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

  public static async getRestaurantId(id: string | number): Promise<number[]> {
    return await axiosAuth
      .get<{ restaurant: number[] }>(`/user/${id}/user-restaurant/`)
      .then((res) => res.data.restaurant);
  }
}
