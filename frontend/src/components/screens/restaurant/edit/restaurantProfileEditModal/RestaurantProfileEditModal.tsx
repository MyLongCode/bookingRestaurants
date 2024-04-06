"use client";

import Modal from "@/components/shared/modal/Modal";
import RestaurantProfileEditForm from "@/restaurant/edit/restaurantProfileEditForm/RestaurantProfileEditForm";
import { useEffect } from "react";
import { revalidatePhotos } from "@/lib/actions";

const RestaurantProfileEditModal = () => {
  useEffect(() => {
    revalidatePhotos();

    return () => {
      revalidatePhotos();
    };
  }, []);

  return (
    <Modal state={"restaurantProfileEdit"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>Профиль заведения</Modal.Title>
        <RestaurantProfileEditForm />
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantProfileEditModal;
