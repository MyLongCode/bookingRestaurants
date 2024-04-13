import { User } from "@/models/user.type";
import { axiosAuth } from "@/lib/axios";

export default class UserService {
  public static async getById(id: string | number): Promise<User> {
    return await axiosAuth.post<User>(`/users/${id}/`).then((res) => res.data);
  }

  public static async patch(
    id: string | number,
    data: Partial<User>,
  ): Promise<User> {
    return await axiosAuth
      .patch<User>(`/users/${id}/`, data)
      .then((res) => res.data);
  }
}
