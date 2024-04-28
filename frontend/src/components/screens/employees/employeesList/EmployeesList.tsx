import EmployeeService from "@/services/employees/EmployeeService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import EmployeeCard from "@/screens/employees/employeeCard/EmployeeCard";
import styles from "./employeesList.module.scss";

const EmployeesList = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.currentRestaurant) {
    redirect("/");
  }

  const employees = await EmployeeService.getAllByRestaurant(
    session.user.currentRestaurant,
  );

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Сотрудники</h3>
      <ul className={styles.list}>
        {employees.map((employee) => {
          return (
            <li key={employee.id}>
              <EmployeeCard
                id={employee.id}
                name={employee.user.full_name}
                email={employee.user.email}
                role={"Сотрудник"}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmployeesList;
