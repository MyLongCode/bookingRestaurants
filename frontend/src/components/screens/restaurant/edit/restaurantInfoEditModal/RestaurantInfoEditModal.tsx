"use client";

import Modal from "@/components/shared/modal/Modal";
import RestaurantInfoEditForm from "@/restaurant/edit/restaurantInfoEditForm/RestaurantInfoEditForm";
import { useEffect } from "react";
import { revalidateRestaurantTags } from "@/lib/actions";

const RestaurantProfileEditModal = () => {
  useEffect(() => {
    revalidateRestaurantTags();

    return () => {
      revalidateRestaurantTags;
    };
  }, []);

  return (
    <Modal state={"infoEdit"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>Профиль заведения</Modal.Title>
        <RestaurantInfoEditForm />
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantProfileEditModal;
