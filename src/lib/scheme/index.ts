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
  street: z.string().min(5, "Invalid street"),
  city: z.string().min(2, "Invalid city"),
  state: z.string().min(2, "Invalid state"),
  post_code: z.string().optional(),
});

const cardScheme = z.object({
  card_number: z.string().min(18, "Invalid card number"),
  cardholder_name: z.string().min(2, "Invalid Card holder name"),
  ccv: z.string().min(3, "Invalid CCV"),
  expired_date: z.string().min(5, "Invalid Expired date"),
});

export { addReviewScheme, addressScheme, cardScheme, profileInfoScheme };
