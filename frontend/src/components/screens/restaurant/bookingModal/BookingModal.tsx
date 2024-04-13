"use client";

import Modal from "@/components/shared/modal/Modal";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar-custom.scss";
import styles from "./bookingModal.module.scss";
import TimeInput from "@/components/shared/controls/timeInput/TimeInput";
import Input from "@/components/shared/controls/input/Input";
import Checkbox from "@/components/shared/controls/checkbox/Checkbox";
import Button from "@/components/shared/controls/button/Button";

type ValuePiece = Date | null;

type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const BookingModal = () => {
  const [date, setDate] = useState<DateValue>(new Date());
  console.log(date);

  return (
    <Modal state={"booking"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title><span className={styles.title}>Бронирование</span></Modal.Title>
        <div className={styles.wrapper}>
          <Calendar
            onChange={setDate}
            value={date}
            allowPartialRange={true}
            maxDate={new Date(2024, 11, 31)}
            minDate={new Date()}
            minDetail={"month"}
          />
          <form className={styles.form}>
            <TimeInput label={"Время"} containerClassName={styles.time} />
            <Input inputStyle={"alternative"} placeholder={"Кол-во гостей"} />
            <Input inputStyle={"alternative"} placeholder={"ФИО"} />
            <Input inputStyle={"alternative"} placeholder={"Телефон"} />
            <Input
              inputStyle={"alternative"}
              inputType={"textarea"}
              placeholder={"Пожелания(необязательно)"}
            />
            <Checkbox className={styles.checkbox}>
              нажимая, на кнопку “забронировать”, вы даете согласие на обработку
              своих персональных данных
            </Checkbox>
            <Button btnType={"button"} btnStyle={"filled"} type={"submit"} font={"comfortaa"} className={styles.submitBtn}>
              Забронировать
            </Button>
          </form>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default BookingModal;
