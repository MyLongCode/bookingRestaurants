"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import SliderCheckbox from "@/components/shared/controls/sliderCheckbox/SliderCheckbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TimeInput from "@/components/shared/controls/timeInput/TimeInput";
import styles from "./workingHoursEdit.module.scss";
import Button from "@/components/shared/controls/button/Button";
import { ScheduleDay } from "@/models/restaurant/scheduleDay.type";
import { useParams } from "next/navigation";
import useRestaurant from "@/hooks/restaurant/useRestaurant";
import RestaurantService from "@/services/restaurant/RestaurantService";

const workingHoursDaySchema = z.object({
  isActive: z.boolean(),
  timeStart: z.string(),
  timeEnd: z.string(),
});

const workingHoursEditSchema = z.object({
  monday: workingHoursDaySchema,
  tuesday: workingHoursDaySchema,
  wednesday: workingHoursDaySchema,
  thursday: workingHoursDaySchema,
  friday: workingHoursDaySchema,
  saturday: workingHoursDaySchema,
  sunday: workingHoursDaySchema,
});

type WorkingHoursEditSchema = z.infer<typeof workingHoursEditSchema>;
type WorkingHoursDaySchema = z.infer<typeof workingHoursDaySchema>;

const WorkingHoursEdit = () => {
  const {
    register,
    formState: { isValid, isDirty, isSubmitting },
    getValues,
    setValue,
    handleSubmit,
  } = useForm<WorkingHoursEditSchema>({
    resolver: zodResolver(workingHoursEditSchema),
    mode: "onTouched",
  });

  const { id } = useParams<{ id: string }>();
  const { data: restaurant } = useRestaurant(id);

  const copyForAll = () => {
    const values: WorkingHoursDaySchema = getValues("monday");
    for (const x in getValues()) {
      setValue(x as keyof WorkingHoursEditSchema, values);
    }
  };

  const activateDaily = () => {
    for (const x in getValues()) {
      setValue(`${x as keyof WorkingHoursEditSchema}.isActive`, true);
    }
  };

  const activateFromSundayToFriday = () => {
    for (const x in getValues()) {
      if (x === "saturday" || x === "sunday") {
        setValue(`${x}.isActive`, false);
      } else {
        setValue(`${x as keyof WorkingHoursEditSchema}.isActive`, true);
      }
    }
  };

  const createDayBlock = (
    dayName: string,
    schemaDayName: keyof WorkingHoursEditSchema,
  ) => (
    <div className={styles.day}>
      <SliderCheckbox
        label={dayName}
        {...register(`${schemaDayName}.isActive`)}
      />
      <div className={styles.timeStamp}>
        <TimeInput {...register(`${schemaDayName}.timeStart`)} />
        <span>-</span>
        <TimeInput {...register(`${schemaDayName}.timeEnd`)} />
      </div>
    </div>
  );

  useEffect(() => {
    if (restaurant) {
      const schedule = restaurant.schedule;
      for (const day of schedule) {
        switch (day.dayName) {
          case "пн":
            setValue("monday", day as WorkingHoursDaySchema);
            break;
          case "вт":
            setValue("tuesday", day as WorkingHoursDaySchema);
            break;
          case "ср":
            setValue("wednesday", day as WorkingHoursDaySchema);
            break;
          case "чт":
            setValue("thursday", day as WorkingHoursDaySchema);
            break;
          case "пт":
            setValue("friday", day as WorkingHoursDaySchema);
            break;
          case "сб":
            setValue("saturday", day as WorkingHoursDaySchema);
            break;
          case "вс":
            setValue("sunday", day as WorkingHoursDaySchema);
            break;
          default:
            break;
        }
      }
    }
  }, [restaurant]);

  const handleSave = async (data: WorkingHoursEditSchema) => {
    const schedule: ScheduleDay[] = [
      {
        ...data.monday,
        dayName: "пн",
      },
      {
        ...data.tuesday,
        dayName: "вт",
      },
      {
        ...data.wednesday,
        dayName: "ср",
      },
      {
        ...data.thursday,
        dayName: "чт",
      },
      {
        ...data.friday,
        dayName: "пт",
      },
      {
        ...data.saturday,
        dayName: "сб",
      },
      {
        ...data.sunday,
        dayName: "вс",
      },
    ];
    await RestaurantService.patchSchedule(id, {
      schedule: schedule,
    });
  };

  return (
    <form className={styles.wrapper}>
      <div className={styles.topContainer}>
        <p className={styles.title}>Время работы</p>
        <div className={styles.topBtns}>
          <Button
            btnType={"button"}
            btnStyle={"flat"}
            className={styles.applyBtn}
            type={"button"}
            onClick={activateDaily}
          >
            Ежедневно
          </Button>
          <Button
            btnType={"button"}
            btnStyle={"flat"}
            className={styles.applyBtn}
            type={"button"}
            onClick={activateFromSundayToFriday}
          >
            Пн-Пт
          </Button>
        </div>
      </div>
      {createDayBlock("пн", "monday")}
      <Button
        btnType={"button"}
        btnStyle={"flat"}
        className={styles.applyBtn}
        type={"button"}
        onClick={copyForAll}
      >
        Применить для всех
      </Button>
      {createDayBlock("вт", "tuesday")}
      {createDayBlock("ср", "wednesday")}
      {createDayBlock("чт", "thursday")}
      {createDayBlock("пт", "friday")}
      {createDayBlock("сб", "saturday")}
      {createDayBlock("вс", "sunday")}
      <div className={styles.bottomBtns}>
        <Button
          btnType={"button"}
          btnStyle={"filled"}
          font={"comfortaa"}
          fontSize={"small"}
          className={styles.saveBtn}
          onClick={handleSubmit(handleSave)}
          disabled={!isValid || !isDirty || isSubmitting}
        >
          Сохранить
        </Button>
        <Button
          btnType={"button"}
          btnStyle={"flat"}
          type={"reset"}
          font={"comfortaa"}
          fontSize={"small"}
          className={styles.saveBtn}
        >
          Сбросить
        </Button>
      </div>
    </form>
  );
};

export default WorkingHoursEdit;
