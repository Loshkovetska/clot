import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import AddReviewDialog from "@/components/product-page/product-reviews/add-review-dialog";
import ReviewItem from "@/components/product-page/product-reviews/review-item";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import ProductService from "@/services/product.service";

type ProductReviewsPropType = {
  rating: number;
  totalReviews: number;
  id: string;
  canBeRated?: boolean;
};

export default function ProductReviews({
  rating,
  totalReviews,
  id,
  canBeRated,
}: ProductReviewsPropType) {
  const [showAll, setShowAll] = useState(3);

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_REVIEWS, id],
    queryFn: () => ProductService.getProductReviewsById(id),
  });

  const sumRate = useMemo(
    () => (reviews ? reviews.reduce((prev, curr) => prev + curr.rate, 0) : 0),
    [reviews]
  );

  const productRate = useMemo(
    () => sumRate / (reviews.length || totalReviews),
    [sumRate, reviews, totalReviews]
  );

  const reviewsList = useMemo(
    () => reviews?.slice(0, showAll) || [],
    [showAll, reviews]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-md font-bold">Reviews</h2>
        <span className="text-2xl font-bold">
          {(productRate || rating).toFixed(1)} Ratings
        </span>
        <span className="text-sm text-black-50">
          {reviews.length || totalReviews} Reviews
        </span>
        <AddReviewDialog
          product_id={id}
          canBeRated={canBeRated}
          totalReviews={totalReviews}
          productRate={sumRate}
          onRefetch={refetch}
        />
      </div>
      {!isLoading &&
        (reviews?.length ? (
          <div className="mt-5 flex flex-col gap-3">
            {reviewsList?.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
              />
            ))}
            {!(showAll >= reviews.length) && (
              <Button
                onClick={() => setShowAll((prev) => prev * 2)}
                className="mx-auto w-full max-w-[320px]"
              >
                Show All Reviews
              </Button>
            )}
          </div>
        ) : null)}
    </div>
  );
}
