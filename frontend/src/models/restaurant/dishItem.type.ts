export type DishItem = {
  id: number;
  name: string;
  price: number | string;
  weight: number | string;
  compound: string;
  photo?: string;
  category: number | string;
};
