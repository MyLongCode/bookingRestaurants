"use client";

import React from "react";
import Modal from "@/components/shared/modal/Modal";
import RestaurantDishes from "@/screens/restaurant/restaurantDishes/RestaurantDishes";
import { RestaurantPageSearchParams } from "@/app/(manager)/restaurant/page";
import useDishes from "@/hooks/restaurant/useDishes";
import useCategory from "@/hooks/restaurant/useCategory";

type RestaurantCategoryModalProps = {
  searchParams: RestaurantPageSearchParams;
};

const RestaurantCategoryModal = ({
  searchParams,
}: RestaurantCategoryModalProps) => {
  const { data: dishes, isSuccess: isDishesSuccess } = useDishes(searchParams.categoryId);
  const { data: category, isSuccess: isCategorySuccess } = useCategory(searchParams.categoryId);

  if (!isDishesSuccess && !isCategorySuccess) return null;

  return (
    <Modal state={"category"}>
      <Modal.Window>
        <Modal.Title>{category?.name}</Modal.Title>
        <RestaurantDishes dishes={dishes || []} />
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantCategoryModal;
