import { z } from "zod";
import { tagSchema } from "@/lib/zod/tagSchema";

export const restaurantInfoEditSchema = z.object({
  cuisine: z
    .array(tagSchema)
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  mealTime: z
    .array(tagSchema)
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  restrictions: z
    .array(tagSchema)
    .optional()
    .transform((value) => (value?.length === 0 ? undefined : value)),
  parking: z
    .array(tagSchema)
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
