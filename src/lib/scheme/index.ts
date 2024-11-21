import { z } from "zod";

const addReviewScheme = z.object({
  rate: z.number().min(1),
  text: z.string().optional(),
});

export { addReviewScheme };
