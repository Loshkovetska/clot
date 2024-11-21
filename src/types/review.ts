import { addReviewScheme } from "@/lib/scheme";
import { z } from "zod";

type ReviewType = {
  id: string;
  user: {
    imageUrl?: string;
    firstname: string;
    lastname: string;
  };
  rate: number;
  text: string;
  date: Date;
};

type AddReviewParams = {
  product_id: string;
  text: string;
  rate: number;
  date: Date;
};

type AddReviewFormType = z.infer<typeof addReviewScheme>;

export type { AddReviewFormType, AddReviewParams, ReviewType };
