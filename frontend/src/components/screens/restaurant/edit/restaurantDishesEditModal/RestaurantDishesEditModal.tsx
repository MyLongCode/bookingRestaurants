"use client";

import Modal from "@/components/shared/modal/Modal";
import { useSearchParams } from "next/navigation";
import useDishes from "@/hooks/restaurant/useDishes";
import RestaurantDishes from "@/restaurant/restaurantDishes/RestaurantDishes";

const RestaurantDishesEditModal = () => {
  const params = useSearchParams();
  const id = params.get("id");
  const { data: dishes, isSuccess } = useDishes(id!);

  if (!isSuccess) return null;

  return (
    <Modal state={"dishesEdit"}>
      <Modal.Window>
        <Modal.Title>Редактирование блюд</Modal.Title>
        <div>
          <RestaurantDishes dishes={dishes!} editable />
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default RestaurantDishesEditModal;
