import Input from "@/components/shared/controls/input/Input";
import styles from "./searchField.module.scss";
import { clsx } from "clsx";
import Button from "@/components/shared/controls/button/Button";
import { createRef } from "react";

type SearchFieldProps = {
  onSearch: (value: string) => void;
  className?: string;
};

const SearchField = ({ className, onSearch }: SearchFieldProps) => {
  const ref = createRef<HTMLInputElement & HTMLTextAreaElement>();
  return (
    <div className={clsx(styles.wrapper, className)}>
      <Input
        placeholder={"Найти заведение"}
        className={styles.input}
        ref={ref}
      />
      <Button
        btnType={"button"}
        btnStyle={"icon"}
        className={styles.btn}
        iconSrc={"/icons/Search.svg"}
        onClick={() => {
          if (ref.current) {
            onSearch(ref.current.value);
          }
        }}
        padding={"no"}
      />
    </div>
  );
};

export default SearchField;
