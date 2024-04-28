import styles from "./employeeCard.module.scss";
import Button from "@/components/shared/controls/button/Button";

type EmployeeCardProps = {
  id: string | number;
  name: string;
  email: string;
  role: string;
};

const EmployeeCard = ({ name, role, email, id }: EmployeeCardProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topContainer}>
        <p className={styles.name}>{name}</p>
        <p className={styles.role}>{role}</p>
        <Button
          btnType={"link"}
          btnStyle={"icon"}
          href={`?state=delete&type=employee&deleteId=${id}`}
          iconSrc={"/icons/Delete.svg"}
        />
      </div>
      <p className={styles.email}>{email}</p>
    </div>
  );
};

export default EmployeeCard;
