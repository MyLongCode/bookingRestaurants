"use client";

import Modal from "@/components/shared/modal/Modal";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "@/styles/calendar-custom.scss";
import styles from "./bookingModal.module.scss";
import TimeInput from "@/components/shared/controls/timeInput/TimeInput";
import Input from "@/components/shared/controls/input/Input";
import Checkbox from "@/components/shared/controls/checkbox/Checkbox";
import Button from "@/components/shared/controls/button/Button";
import IntegerSelectInput from "@/restaurant/booking/integerSelectInput/IntegerSelectInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookingSchema,
  bookingSchema,
} from "@/restaurant/booking/bookingModal/bookingModal.schema";
import InputError from "@/components/shared/inputError/InputError";
import useRestaurant from "@/hooks/restaurant/useRestaurant";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import BookingService from "@/services/booking/BookingService";

type ValuePiece = Date | null;

type DateValue = ValuePiece | [ValuePiece, ValuePiece];

const BookingModal = () => {
  const [date, setDate] = useState<DateValue>(new Date());
  const { id } = useParams<{ id: string }>();
  const { data: restaurant } = useRestaurant(id);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    const d = date as Date;

    if (date) {
      setValue("date", d.toLocaleDateString());
    }
  }, [date]);

  useEffect(() => {
    if (session?.user) {
      const user = session.user;
      // setValue("phone", user.phone)
      setValue("name", user.full_name);
    }
  }, [session?.user]);

  const handleBooking = async (data: BookingSchema) => {
    if (!id || !session?.user) return;

    await BookingService.create(id, {
      user: session?.user.id,
      wishes: data.wishes,
      count_people: Number(data.people),
    });

    reset();
    router.push(pathname, { scroll: false });
  };

  return (
    <Modal state={"booking"}>
      <Modal.Window opacityType={"transparent"}>
        <Modal.Title>
          <span className={styles.title}>Бронирование</span>
        </Modal.Title>
        <div className={styles.wrapper}>
          <Calendar
            onChange={setDate}
            value={date}
            allowPartialRange={true}
            maxDate={new Date(2024, 11, 31)}
            minDate={new Date()}
            minDetail={"month"}
          />
          <form className={styles.form} onSubmit={handleSubmit(handleBooking)}>
            <TimeInput
              label={"Время"}
              containerClassName={styles.time}
              {...register("time")}
            />
            <IntegerSelectInput
              maxValue={restaurant?.capacityOnTable || 0}
              {...register("people")}
            />
            <Input
              inputStyle={"alternative"}
              placeholder={"ФИО"}
              {...register("name")}
            />
            <Input
              inputStyle={"alternative"}
              placeholder={"Телефон"}
              {...register("phone")}
            />
            <InputError error={errors?.phone?.message} />
            <Input
              inputStyle={"alternative"}
              inputType={"textarea"}
              placeholder={"Пожелания(необязательно)"}
              {...register("wishes")}
            />
            <Checkbox className={styles.checkbox} {...register("accept")}>
              нажимая, на кнопку “забронировать”, вы даете согласие на обработку
              своих персональных данных
            </Checkbox>
            <Button
              btnType={"button"}
              btnStyle={"filled"}
              type={"submit"}
              font={"comfortaa"}
              className={styles.submitBtn}
              disabled={!isValid}
            >
              Забронировать
            </Button>
          </form>
        </div>
      </Modal.Window>
    </Modal>
  );
};

export default BookingModal;
