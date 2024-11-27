type ProductType = {
  id: string;
  title: string;
  slug: string;
  imageUrls: string[];
  combinations: CombinationType[];
  description: string;
  shippingCost: number;
  taxCost: number;
  rate: number;
  totalReviews: number;
  gender: "male" | "female";
  category_id: string;
  variants: ProductVariantType[];
  isFavorite: boolean;
  canBeRated?: boolean;
};

type ProductVariantType = {
  attr_name: string;
  attr_id: string;
  attr_list: Array<string | { name: string; valueHex: string }>;
};

type CombinationType = {
  [key in string]: string | number;
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

type ProductsSearchParams = {
  new?: boolean;
  top_selling?: boolean;
  amount?: number;
};

export type {
  CombinationType,
  ProductReviewType,
  ProductType,
  ProductVariantType,
  ProductsSearchParams,
};
