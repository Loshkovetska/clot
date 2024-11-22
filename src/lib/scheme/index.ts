import { z } from "zod";

const addReviewScheme = z.object({
  rate: z.number().min(1),
  text: z.string().optional(),
});

const profileInfoScheme = z.object({
  firstname: z.string().min(3, "Invalid firstname"),
  lastname: z.string().min(3, "Invalid lastname"),
  email: z.string().email("Invalid email"),
  phonenumber: z.string().optional(),
});

const addressScheme = z.object({
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  post_code: z.string().optional(),
});

const cardScheme = z.object({
  card_number: z.string().min(12).max(19),
  cardholder_name: z.string().min(2),
  ccv: z.string().min(3).max(4),
  expired_date: z.string(),
});

export { addReviewScheme, addressScheme, cardScheme, profileInfoScheme };
