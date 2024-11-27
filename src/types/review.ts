import { z } from "zod";

import { addReviewScheme } from "@/lib/scheme";

type ReviewType = {
  id: string;
  user: {
    imageUrl?: string;
    firstname: string;
    lastname: string;
  };
  rate: number;
  text: string;
  date: string;
};

type AddReviewParams = {
  product_id: string;
  text: string;
  rate: number;
  date: Date;
  totalReviews: number;
  productRate: number;
};

type AddReviewFormType = z.infer<typeof addReviewScheme>;

export type { AddReviewFormType, AddReviewParams, ReviewType };
