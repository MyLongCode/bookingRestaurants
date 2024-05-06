import React, { forwardRef, useId } from "react";
import Image from "next/image";
import styles from "./imageInput.module.scss";
import {clsx} from "clsx";

type ImageInputProps = React.ComponentProps<"input"> & { isSelected?: boolean };

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ isSelected, className, ...props }, ref) => {
    const id = useId();

    return (
      <div className={clsx(styles.imageInputWrapper, className)}>
        <input
          type="file"
          id={`input__file${id}`}
          accept={"image/*"}
          className={styles.imageInput}
          ref={ref}
          {...props}
        />
        <label htmlFor={`input__file${id}`} className={styles.imageInputBtn}>
          <Image
            className={styles.imageInputIcon}
            src="/icons/AddImageGreen.svg"
            alt="Выбрать файл"
            width={25}
            height={25}
          />
          <span className={styles.imageInputBtnText}>
            {isSelected ? "Изменить фото" : "Добавить фото"}
          </span>
        </label>
      </div>
    );
  },
);

ImageInput.displayName = "ImageInput";

export default ImageInput;
