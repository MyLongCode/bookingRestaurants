"use client";

import Modal from "@/components/shared/modal/Modal";
import RestaurantProfileEditForm from "@/restaurant/edit/restaurantProfileEditForm/RestaurantProfileEditForm";

const RestaurantProfileEditModal = () => {
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
