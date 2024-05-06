"use client";
import Image from "next/image";
import styles from "./restaurants.module.scss";
import SearchField from "@/screens/restaurants/searchField/SearchField";
import Button from "@/components/shared/controls/button/Button";
import RestaurantsList from "@/screens/restaurants/restaurantsList/RestaurantsList";
import FiltersWindow from "@/screens/restaurants/filtersWindow/FiltersWindow";
import useRestaurants from "@/hooks/restaurants/useRestaurants";
import Loader from "@/components/shared/loader/Loader";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const RestaurantsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    data: restaurants,
    isSuccess,
    refetch,
  } = useRestaurants(
    searchParams.get("tag") || undefined,
    searchParams.get("name") || undefined,
  );
  const restaurantsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (value: string) => {
    const tag = searchParams.get("tag");
    router.push(`${pathname}?name=${value}`, { scroll: false });
    restaurantsRef?.current?.scrollIntoView({ behavior: "smooth" });
    refetch();
  };

  useEffect(() => {
    refetch();
    setIsFilterOpen(false);
  }, [searchParams]);

  if (!isSuccess || !restaurants) return <Loader />;

  return (
    <div>
      <section>
        <div className={styles.topContainer}>
          <h2 className={styles.title}>Рестораны</h2>
          <SearchField className={styles.search} onSearch={handleSearch} />
          <Button
            btnType={"button"}
            type={"button"}
            btnStyle={"filled"}
            iconSrc={"/icons/Filter.svg"}
            fontSize={"small"}
            font={"comfortaa"}
            padding={"no"}
            className={styles.filtersBtn}
            onClick={() => {
              setIsFilterOpen((prev) => !prev);
            }}
          >
            Фильтры
          </Button>
        </div>
      </section>
      <section className={styles.imgs}>
        <Image src={"/img/Burger.png"} alt={""} width={500} height={500} />
        <Image src={"/img/Cocktail.png"} alt={""} width={500} height={500} />
        <Image src={"/img/Cheesecake.png"} alt={""} width={500} height={500} />
        <AnimatePresence>
          {isFilterOpen && <FiltersWindow scrollRef={restaurantsRef} />}
        </AnimatePresence>
      </section>
      {searchParams.size === 0 ? (
        <section className={styles.popular} ref={restaurantsRef}>
          <h3>Популярные заведения</h3>
          <RestaurantsList restaurants={restaurants.results} />
        </section>
      ) : (
        <section className={styles.filteredSection} ref={restaurantsRef}>
          <h3>
            {restaurants.results.length === 0
              ? "Ничего не нашлось по вашему запросу"
              : "Что нашлось по вашему запросу:"}
          </h3>
          <RestaurantsList variant={"full"} restaurants={restaurants.results} />
        </section>
      )}
    </div>
  );
};

export default RestaurantsPage;
