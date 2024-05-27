import { ScheduleDay } from "@/models/restaurant/scheduleDay.type";

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  description: string;
  logo: string | null;
  phone: string;
  preview: string | null;
  site: string;
  schedule: ScheduleDay[];
  capacityOnTable: number;
  rating: number;
};
