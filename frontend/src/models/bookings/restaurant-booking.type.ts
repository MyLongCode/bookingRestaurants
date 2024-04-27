export type RestaurantBooking = {
  id: number,
  date: string,
  count_people: number,
  status: "Завершено" | "Ожидается" | "Подтверждено" | "Отклонено";
  wishes: string,
  restaurant: number,
  booking_date: string,
  booking_time: string,
  user_phone: string,
  user_email: string,
  user_fullname: string
}