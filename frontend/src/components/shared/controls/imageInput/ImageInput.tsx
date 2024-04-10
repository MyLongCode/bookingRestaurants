import React, { forwardRef, useId } from "react";
import Image from "next/image";
import styles from "./imageInput.module.scss";

type ImageInputProps = React.ComponentProps<"input"> & {};

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  (props, ref) => {
    const id = useId();

    return (
      <div className={styles.imageInputWrapper}>
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
          <span className={styles.imageInputBtnText}>Добавьте фото</span>
        </label>
      </div>
    );
  },
);

ImageInput.displayName = "ImageInput";

export default ImageInput;
