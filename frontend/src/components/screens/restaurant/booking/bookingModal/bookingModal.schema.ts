import { z } from "zod";

export const bookingSchema = z.object({
  date: z.string(),
  time: z.string(),
  people: z.string(),
  name: z.string(),
  phone: z
    .string()
    .min(11, "Номер телефона должен содержать 11 символов")
    .max(11, "Номер телефона должен содержать 11 символов"),
  wishes: z.string().optional(),
  accept: z
    .boolean()
    .refine((value) => value, "Необходимо дать согласие на обработку данных"),
});

export type BookingSchema = z.infer<typeof bookingSchema>;
