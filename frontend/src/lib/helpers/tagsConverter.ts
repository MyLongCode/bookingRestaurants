import {RestaurantTag} from "@/models/restaurant/restaurantTag.type";
import {Option} from "react-multi-select-component";

export const makeOptionsFromTags = (tags?: RestaurantTag[]) => {
  return (
    tags?.map((tag) => ({
      label: tag.name,
      value: tag.id,
    })) || []
  );
};

export const makeTagsFromOptions = (options?: Option[]) => {
  return (
    options?.map((option) => ({
      id: option.value,
      name: option.label,
    })) || []
  );
};