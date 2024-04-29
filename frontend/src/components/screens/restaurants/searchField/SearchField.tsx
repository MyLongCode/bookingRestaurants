import Input from "@/components/shared/controls/input/Input";
import Image from "next/image";
import styles from "./searchField.module.scss";
import { clsx } from "clsx";

type SearchFieldProps = {
  className?: string;
};

const SearchField = ({ className }: SearchFieldProps) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <Input placeholder={"Найти заведение"} className={styles.input} />
      <Image
        className={styles.img}
        src={"/icons/Search.svg"}
        alt={"Найти"}
        width={30}
        height={30}
      />
    </div>
  );
};

export default SearchField;
