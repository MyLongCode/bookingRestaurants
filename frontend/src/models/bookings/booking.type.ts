export type Booking = {
  id: string | number;
  count_people: number;
  wishes: string;
  user: string | number;
  status: "Завершено" | "Ожидается" | "Подтверждено" | "Отменено";
};
