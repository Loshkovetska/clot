import AddReviewDialog from "@/components/product-page/product-reviews/add-review-dialog";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import ProductService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

  console.log(reviews);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h2 className="font-bold text-md">Reviews</h2>
        <span className="font-bold text-2xl">{rating} Ratings</span>
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
            className="max-w-[320px] mx-auto w-full"
          >
            Show All Reviews
          </Button>
        )}
      </div>
    </div>
  );
}
