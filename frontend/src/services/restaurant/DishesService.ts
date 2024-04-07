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
}
