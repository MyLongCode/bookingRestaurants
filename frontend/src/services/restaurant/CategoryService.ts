import { axiosAuth } from "@/lib/axios";
import { DishItem } from "@/models/restaurant/dishItem.type";
import { Category } from "@/models/restaurant/category.type";

export default class CategoryService {
  public static getById(id: string | number): Promise<Category> {
    return axiosAuth.get<Category>(`category/${id}/`).then((res) => res.data);
  }

  public static getDishes(id: string | number): Promise<DishItem[]> {
    return axiosAuth
      .get<DishItem[]>(`category/${id}/dishes/`)
      .then((res) => res.data);
  }
}
