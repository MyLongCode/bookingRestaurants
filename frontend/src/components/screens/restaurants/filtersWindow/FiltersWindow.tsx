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
import { RefObject, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RestaurantTag } from "@/models/restaurant/restaurantTag.type";

type FiltersWindowProps = {
  scrollRef: RefObject<HTMLDivElement>;
};

const FiltersWindow = ({ scrollRef }: FiltersWindowProps) => {
  const { data: tags, isSuccess } = useTags();
  const [filters, setFilters] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFind = async () => {
    if (filters.length > 0) {
      router.push(`?tag=${filters.join(";")}`, { scroll: false });
    } else {
      router.push(pathname, { scroll: false });
    }

    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTagsChange = (values: RestaurantTag[], group: string) => {
    if (!tags) return;

    const t = values.map((v) => v.name);

    setFilters((prev) => [
      ...prev.filter(
        (p) =>
          !tags[group]
            .map((tag) => tag.name)
            .filter((tag) => !t.includes(tag))
            .includes(p) && !t.includes(p),
      ),
      ...t,
    ]);
  };

  useEffect(() => {
    setFilters(searchParams.get("tag")?.split(";") || []);
  }, [searchParams]);

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
              defaultValue={options.filter((item) =>
                searchParams.get("tag")?.split(";")?.includes(item.label),
              )}
              handleChange={(value) => {
                handleTagsChange(makeTagsFromOptions(value), group);
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
