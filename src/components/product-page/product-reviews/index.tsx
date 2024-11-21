import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import AddReviewDialog from "@/components/product-page/product-reviews/add-review-dialog";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import ProductService from "@/services/product.service";

type ProductReviewsPropType = {
  rating: number;
  totalReviews: number;
  id: string;
};

export default function ProductReviews({
  rating,
  totalReviews,
  id,
}: ProductReviewsPropType) {
  const [showAll, setShowAll] = useState(false);
  const { data: reviews = [] } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_REVIEWS, id],
    queryFn: () => ProductService.getProductReviewsById(id),
    enabled: !!totalReviews,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-md font-bold">Reviews</h2>
        <span className="text-2xl font-bold">{rating} Ratings</span>
        <span className="text-sm text-black-50">{totalReviews} Reviews</span>
        <AddReviewDialog product_id={id} />
      </div>
      <div className="flex flex-col gap-3">
        {/* {reviews?.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))} */}
        {!showAll && (
          <Button
            onClick={() => setShowAll(true)}
            className="mx-auto w-full max-w-[320px]"
          >
            Show All Reviews
          </Button>
        )}
      </div>
    </div>
  );
}
