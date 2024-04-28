import React from "react";
import EmployeeAddForm from "@/screens/employees/employeeAddForm/EmployeeAddForm";
import styles from "./employees.module.scss";
import EmployeesList from "@/screens/employees/employeesList/EmployeesList";
import DeleteModal from "@/components/shared/deleteModal/DeleteModal";

export type EmployeesPageSearchParams = {
  state?: string[] | string;
};

type EmployeesPageProps = {
  searchParams: EmployeesPageSearchParams;
};

const EmployeesPage = ({ searchParams }: EmployeesPageProps) => {
  const state = searchParams.state;

  return (
    <div className={styles.wrapper}>
      <section className={styles.employeesSection}>
        <EmployeesList />
      </section>
      <section className={styles.createEmployeeSection}>
        <h2>Добавление сотрудника</h2>
        <p>
          Напишите почту сотрудника и придумайте ему пароль для входа в
          BistroScout
        </p>
        <EmployeeAddForm />
      </section>

      {state?.includes("delete") && <DeleteModal />}
    </div>
  );
};

export default EmployeesPage;
