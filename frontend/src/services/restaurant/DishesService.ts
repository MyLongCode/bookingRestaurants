import { DishItem } from "@/models/restaurant/dishItem.type";
import { axiosAuth } from "@/lib/axios";

export default class DishesService {
  public static async patch(
    id: string | number,
    data: Partial<DishItem>,
  ): Promise<DishItem> {
    return axiosAuth
      .patch(`dish-item/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  }

  public static async create(data: Partial<DishItem>): Promise<DishItem> {
    return axiosAuth
      .post(`dish-item/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  }

  public static async delete(id: string | number): Promise<DishItem> {
    return axiosAuth.delete<DishItem>(`dish-item/${id}/`).then((res) => {
      return res.data;
    });
  }
}
