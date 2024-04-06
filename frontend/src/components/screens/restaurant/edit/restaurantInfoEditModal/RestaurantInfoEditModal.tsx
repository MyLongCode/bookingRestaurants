"use client";

import Modal from "@/components/shared/modal/Modal";
import RestaurantInfoEditForm from "@/restaurant/edit/restaurantInfoForm/RestaurantInfoEditForm";
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
    <Modal state={"restaurantInfoEdit"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>Профиль заведения</Modal.Title>
        <RestaurantInfoEditForm />
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantProfileEditModal;
