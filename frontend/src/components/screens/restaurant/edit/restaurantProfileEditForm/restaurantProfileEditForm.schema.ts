import { z } from "zod";
import { checkFileType, MAX_FILE_SIZE } from "@/lib/zod/checkFileType";

const fileType: z.ZodType<any> = z
  .any()
  .optional()
  .refine(
    (file: FileList) => file.length == 0 || file[0].size < MAX_FILE_SIZE,
    "Max size is 5MB",
  )
  .refine(
    (file: FileList) => file.length == 0 || checkFileType(file[0]),
    "Allowed file types are PNG, JPG and WEBP",
  )
  .transform((file: FileList) => (file.length === 0 ? undefined : file[0]));

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
