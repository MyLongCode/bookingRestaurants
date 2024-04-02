import { ScheduleDay } from "@/models/restaurant/scheduleDay.type";

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  description: string;
  schedule: ScheduleDay[];
};
