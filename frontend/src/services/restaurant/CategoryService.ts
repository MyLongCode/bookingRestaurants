import { axiosAuth } from "@/lib/axios";
import { DishItem } from "@/models/restaurant/dishItem.type";
import { Category } from "@/models/restaurant/category.type";
import { revalidateMenus, revalidateRestaurant } from "@/lib/actions";

export default class CategoryService {
  public static async getById(id: string | number): Promise<Category> {
    return axiosAuth.get<Category>(`category/${id}/`).then((res) => res.data);
  }

  public static async getDishes(id: string | number): Promise<DishItem[]> {
    return axiosAuth
      .get<DishItem[]>(`category/${id}/dishes/`)
      .then((res) => res.data);
  }

  public static async delete(id: string | number): Promise<Category> {
    return axiosAuth.delete<Category>(`category/${id}/`).then(async (res) => {
      await revalidateMenus();
      return res.data;
    });
  }

  public static async patch(
    id: string | number,
    data: Partial<Category>,
  ): Promise<Category> {
    return axiosAuth
      .patch<Category>(`category/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (res) => {
        await revalidateMenus();
        return res.data;
      });
  }

  public static async create(
    data: Partial<Category>,
    menuId: string | number,
  ): Promise<Category> {
    return axiosAuth
      .post<Category>(
        `category/`,
        {
          ...data,
          menu: menuId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then(async (res) => {
        await revalidateMenus();
        return res.data;
      });
  }
}
