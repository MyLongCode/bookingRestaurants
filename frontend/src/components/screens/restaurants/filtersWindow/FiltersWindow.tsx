"use client";
import styles from "./filtersWindow.module.scss";
import useTags from "@/hooks/restaurant/useTags";
import Loader from "@/components/shared/loader/Loader";
import {
  makeOptionsFromTags,
  makeTagsFromOptions,
} from "@/lib/helpers/tagsConverter";
import MultipleSelect from "@/components/shared/controls/multipleSelect/MultipleSelect";
import { clsx } from "clsx";
import Button from "@/components/shared/controls/button/Button";
import { useState } from "react";
import { RestaurantTags } from "@/models/restaurant/restaurantTags.type";
import { motion } from "framer-motion";

type FiltersWindowProps = {};

const FiltersWindow = ({ ...props }: FiltersWindowProps) => {
  const { data: tags, isSuccess } = useTags();
  const [selectedTags, setSelectedTags] = useState<RestaurantTags>(
    {} as RestaurantTags,
  );

  const handleFind = () => {
    console.log(selectedTags);
  };

  if (!tags || !isSuccess) return <Loader />;

  return (
    <motion.div
      className={styles.wrapper}
      initial={{
        opacity: 0,
        transform: "translateY(-50%) scaleY(0)",
      }}
      animate={{
        opacity: 1,
        transform: "translateY(0) scaleY(1)",
        transition: {
          duration: 0.65,
          ease: "backOut",
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
    >
      {Object.keys(tags).map((group) => {
        const options = makeOptionsFromTags(tags[group]);
        return (
          <div key={group} className={styles.selectContainer}>
            <h4 className={styles.groupTitle}>{group}</h4>
            <MultipleSelect
              className={clsx(styles.select, "multi-select")}
              disableSearch={true}
              isOpen={true}
              label={group}
              options={options}
              handleChange={(value) => {
                setSelectedTags((prev) => {
                  prev[group] = makeTagsFromOptions(value);
                  return prev;
                });
              }}
            />
          </div>
        );
      })}
      <Button
        btnType={"button"}
        btnStyle={"filled"}
        font={"comfortaa"}
        fontSize={"small"}
        className={styles.findBtn}
        onClick={handleFind}
      >
        Найти
      </Button>
    </motion.div>
  );
};

export default FiltersWindow;
