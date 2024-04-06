import { z } from "zod";

export const restaurantInfoEditSchema = z.object({
  cuisine: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  mealTime: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  restrictions: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  parking: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  address: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  phone: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  site: z
    .string()
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
});

export type RestaurantProfileInfoSchema = z.infer<
  typeof restaurantInfoEditSchema
>;
