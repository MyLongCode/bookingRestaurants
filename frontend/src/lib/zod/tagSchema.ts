import {z} from "zod";

export const tagSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string(),
});