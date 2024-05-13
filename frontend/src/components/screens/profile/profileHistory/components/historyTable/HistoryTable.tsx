"use client";

import HistoryTableRow from "@/screens/profile/profileHistory/components/historyTableRow/HistoryTableRow";
import Table from "@/components/shared/table/Table";
import useUserBookings from "@/hooks/user/useUserBookings";
import styles from "./historyTable.module.scss";
import Loader from "@/components/shared/loader/Loader";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { queryClient } from "@/app/providers";
import { clsx } from "clsx";
import Button from "@/components/shared/controls/button/Button";

type HistoryTableProps = {};

const HistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: bookings, isSuccess } = useUserBookings(currentPage);
  const searchParams = useSearchParams();
  const pages = useMemo(() => {
    const count = bookings ? Math.floor(bookings.count / 10) : 0;
    const result: number[] = [1];
    for (let i = 1; i <= count; i++) {
      result.push(i + 1);
    }

    return result;
  }, [bookings]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["user bookings"],
    });
  }, [searchParams]);

  if (!isSuccess || !bookings) {
    return <Loader />;
  }

  if (bookings.results.length === 0)
    return <p className={styles.empty}>Нет записей</p>;

  return (
    <div>
      <Table columns={["Заведение", "Дата", "Статус"]}>
        {bookings.results.map((booking, index) => {
          return (
            <HistoryTableRow
              key={booking.id}
              id={booking.id}
              restaurantName={booking.restaurant_name}
              restaurantAddress={booking.restaurant_address}
              date={booking.booking_date}
              dateTime={booking.booking_time}
              status={booking.status}
              className={styles[`booking-${index}`]}
            />
          );
        })}
      </Table>
      <ul className={styles.pages}>
        {pages.map((page) => {
          return (
            <Button
              btnType={"link"}
              btnStyle={"flat"}
              href={`?page=${page}`}
              onClick={() => {
                setCurrentPage(page);
              }}
              key={page}
              className={clsx(
                styles.pageBtn,
                page === currentPage || (page === 1 && !currentPage)
                  ? styles.active
                  : null,
              )}
            >
              {page}
            </Button>
          );
        })}
      </ul>
    </div>
  );
};

export default HistoryTable;
