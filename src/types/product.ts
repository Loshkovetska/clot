type ProductType = {
  id: string;
  title: string;
  slug: string;
  imageUrls: string[];
  price: number;
  discount: number;
  combinations: CombinationType[];
  description: string;
  shippingCost: number;
  taxCost: number;
  rate: number;
  totalReviews: number;
  gender: "male" | "female";
};

type CombinationType = {
  size: string;
  color?: {
    value: string;
    valueHex: string;
  };
  amount: number;
};

type ProductReviewType = {
  id: string;
  rate: number;
  user: {
    firstname: string;
    lastname: string;
    imageUrl?: string;
  };
  text: string;
  date: Date;
  product_id: string;
};
