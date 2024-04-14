import React, { forwardRef } from "react";
import Select from "@/components/shared/controls/select/Select";
import styles from "./integerSelectInput.module.scss";

type IntegerSelectInputProps = React.ComponentProps<"select"> & {
  maxValue: number;
};

const IntegerSelectInput = forwardRef<
  HTMLSelectElement,
  IntegerSelectInputProps
>(({ maxValue, ...props }, ref) => {
  const values: number[] = [];

  while (values.length < maxValue) {
    values.push(values.length + 1);
  }

  return (
    <Select ref={ref} {...props}>
      <option value={"0"}>{"Кол-во гостей"}</option>
      {values.map((value) => {
        return (
          <option key={value} value={value.toString()}>
            {value}
          </option>
        );
      })}
    </Select>
  );
});

IntegerSelectInput.displayName = "IntegerSelectInput";

export default IntegerSelectInput;
