import React, { forwardRef } from "react";

type InputProps = React.ComponentProps<"input"> & {};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, ...props }: InputProps, ref) => {
    return (
      <input ref={ref} {...props}>
        {children}
      </input>
    );
  },
);

Input.displayName = "Input";

export default Input;
