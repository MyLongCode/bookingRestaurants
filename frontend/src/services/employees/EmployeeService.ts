import { NewEmployee } from "@/models/employees/newEmployee.model";
import fetch from "@/lib/fetch";

export default class EmployeeService {
  public static async create(id: string | number, data: { user: NewEmployee }) {
    return await fetch.post(`/restaurant/${id}/employee/`, `employees`, data);
  }
}
