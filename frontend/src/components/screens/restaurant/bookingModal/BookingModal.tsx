"use client";

import Modal from "@/components/shared/modal/Modal";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar-custom.scss";

type ValuePiece = Date | null;

type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const BookingModal = () => {
  const [date, setDate] = useState<DateValue>(new Date());
  console.log(date);

  return (
    <Modal state={"booking"}>
      <Modal.Window>
        <Modal.Title>Бронирование</Modal.Title>
        <Calendar
          onChange={setDate}
          value={date}
          allowPartialRange={true}
          maxDate={new Date(2024, 11, 31)}
          minDate={new Date()}
          maxDetail={"month"}
        />
      </Modal.Window>
    </Modal>
  );
};

export default BookingModal;
