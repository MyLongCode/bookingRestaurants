export type Booking = {
  id: string | number;
  count_people: number;
  wishes: string;
  user: string | number;
  status: "Завершено" | "Ожидается" | "Подтверждено" | "Отменено";
  restaurant_name: string;
  booking_date: string;
  booking_time: string;
  restaurant_address: string;
  date: string;
};
