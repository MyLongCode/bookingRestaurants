import React from "react";
import Image from "next/image";
import styles from "./carouselPhoto.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { Photo } from "@/models/restaurant/photo.type";

type CarouselPhotoProps = Photo & {
  editable?: boolean;
};

const CarouselPhoto = ({ editable, id, title, image }: CarouselPhotoProps) => {
  return (
    <div className={styles.wrapper}>
      {editable && (
        <div className={styles.activeContainer}>
          <Button
            btnType={"link"}
            btnStyle={"icon"}
            iconSrc={"/icons/Edit.svg"}
            href={`?state=photoEdit&id=${id}`}
          />
          <Button
            btnType={"link"}
            btnStyle={"icon"}
            iconSrc={"/icons/Exit.svg"}
            href={`?state=delete&type=photo&photoId=${id}`}
          />
        </div>
      )}
      <Image
        className={styles.image}
        src={image}
        alt={title}
        fill
        sizes={"300px, (min-width: 1440px) 400px, (min-width: 1024px) 900px "}
      />
      <div className={styles.titleContainer}>
        <h4 className={styles.title}>{title}</h4>
      </div>
    </div>
  );
};

export default CarouselPhoto;
