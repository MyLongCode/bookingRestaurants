import { z } from "zod";

const tagSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
});

export const restaurantInfoEditSchema = z.object({
  cuisine: z
    .array(tagSchema)
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
