import React from "react";
import EmployeeAddForm from "@/screens/employees/employeeAddForm/EmployeeAddForm";
import styles from "./employees.module.scss";

const EmployeesPage = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.employeesSection}></section>
      <section className={styles.createEmployeeSection}>
        <h2>Добавление сотрудника</h2>
        <p>
          Выберите почту сотрудника и придумайте ему пароль для входа в
          BistroScout
        </p>
        <EmployeeAddForm />
      </section>
    </div>
  );
};

export default EmployeesPage;
