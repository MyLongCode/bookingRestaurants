import { NewEmployee } from "@/models/employees/newEmployee.model";
import fetch from "@/lib/fetch";
import { Employee } from "@/models/employees/employee.model";
import { axiosAuth } from "@/lib/axios";
import { revalidateRestaurantEmployees } from "@/lib/actions";
import { revalidateTag } from "next/cache";

export default class EmployeeService {
  public static async getAllByRestaurant(
    id: string | number,
  ): Promise<Employee[]> {
    return await fetch.get(`/restaurant/${id}/employee/`, `employees ${id}`);
  }

  public static async create(id: string | number, data: { user: NewEmployee }) {
    return await fetch
      .post(`/restaurant/${id}/employee/`, `employees ${id}`, data)
      .then(async (res) => {
        await revalidateRestaurantEmployees(id);
        return res.data;
      });
  }

  public static async delete(
    restaurantId: string | number,
    id: string | number,
  ) {
    return await axiosAuth
      .delete(`/restaurant/${restaurantId}/employee/${id}/`)
      .then(async (res) => {
        await revalidateRestaurantEmployees(restaurantId);
        return res.data;
      });
  }
}
