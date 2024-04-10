import { z } from "zod";
import { fileType } from "@/lib/zod/fileType";

export const restaurantProfileEditSchema = z.object({
  name: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  description: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  logo: fileType,
  preview: fileType,
});

export type RestaurantProfileEditSchema = z.infer<
  typeof restaurantProfileEditSchema
>;
