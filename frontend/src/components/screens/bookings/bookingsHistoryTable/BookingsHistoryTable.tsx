"use client";
import BookingsHistoryRow from "@/screens/bookings/bookingsHistoryRow/BookingsHistoryRow";
import Table from "@/components/shared/table/Table";
import styles from "./bookingHistory.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useBookings from "@/hooks/dashboard/bookings/useBookings";
import { queryClient } from "@/app/providers";

const BookingsHistoryTable = () => {
  const [pages, setPages] = useState<number[]>([]);
  const { data: session } = useSession();
  const page = useSearchParams().get("page");
  const pathname = usePathname();
  const { data: bookings } = useBookings(
    Number(page || 1),
    session?.user.currentRestaurant,
  );

  useEffect(() => {
    if (!bookings) return;

    if (bookings) {
      queryClient.invalidateQueries({
        queryKey: [`restaurant bookings ${session?.user?.currentRestaurant}`],
      });
      console.log(bookings.next);
    }

    for (let i = 0; i < bookings.count / 9; i++) {
      setPages((prev) => [...prev, i + 1]);
    }

    return () => {
      setPages([]);
    };
  }, [bookings, page, session?.user?.currentRestaurant]);

  if (!session?.user?.currentRestaurant) return null;

  if (bookings?.results?.length === 0) {
    return <p className={styles.empty}>Нет записей</p>;
  }

  return (
    <>
      <Table
        columns={["Гость", "Кол-во гостей", "Дата", "Номер стола", "Бронь"]}
      >
        {bookings?.results
          ?.filter((booking) => booking.status !== "Ожидается")
          .map((booking) => {
            return (
              <BookingsHistoryRow
                key={booking.id}
                guestName={booking.user_fullname}
                guestPhone={booking.user_phone}
                guestsCount={booking.count_people}
                date={booking.booking_date}
                dateTime={booking.booking_time}
                table={1}
                status={booking.status}
              />
            );
          })}
      </Table>
      <nav className={styles.nav}>
        <ul className={styles.pages}>
          <li className={styles.prevPage}>
            <Button
              btnType={"link"}
              btnStyle={"icon"}
              className={styles.prevPageBtn}
              href={
                bookings?.previous
                  ? `${pathname}?page=${Number(page) - 1}`
                  : ""
              }
              iconSrc={"/icons/Arrow.svg"}
              disabled={!bookings?.previous}
            />
          </li>
          {pages.map((p) => {
            return (
              <li className={styles.page} key={p}>
                <Button
                  btnType={"link"}
                  btnStyle={"flat"}
                  href={`${pathname}?page=${p}`}
                  className={
                    Number(page!) === p || (!page && p === 1)
                      ? styles.active
                      : ""
                  }
                >
                  {p}
                </Button>
              </li>
            );
          })}
          <li className={styles.nextPage}>
            <Button
              btnType={"link"}
              btnStyle={"icon"}
              className={styles.nextPageBtn}
              href={
                bookings?.next
                  ? `${pathname}?page=${page ? Number(page) + 1 : 1}`
                  : ""
              }
              iconSrc={"/icons/Arrow.svg"}
              disabled={!bookings?.next}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BookingsHistoryTable;
