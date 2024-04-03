"use client";

import React from "react";
import Modal from "@/components/shared/modal/Modal";
import RestaurantDishes from "@/screens/restaurant/restaurantDishes/RestaurantDishes";
import { RestaurantPageSearchParams } from "@/app/(manager)/restaurant/page";

type RestaurantCategoryModalProps = {
  searchParams: RestaurantPageSearchParams;
};

const RestaurantCategoryModal = ({
  searchParams,
}: RestaurantCategoryModalProps) => {
  return (
    <Modal state={"category"}>
      <Modal.Window>
        <Modal.Title>Категория</Modal.Title>
        <RestaurantDishes dishes={[]} />
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantCategoryModal;