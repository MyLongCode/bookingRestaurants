import { axiosAuth } from "@/lib/axios";

export default class MenuService {
  public static create(name: string, restaurant: string | number) {
    return axiosAuth.post("/menu/", {
      name,
      restaurant,
    });
  }

  public static patch(id: string | number, name?: string) {
    return axiosAuth.patch(`/menu/${id}/`, {
      name
    });
  }
}
