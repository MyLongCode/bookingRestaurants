import { ScheduleDay } from "@/models/restaurant/scheduleDay.type";

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  description: string;
  logo: string;
  phone: string;
  preview: string;
  site: string;
  schedule: ScheduleDay[];
};
