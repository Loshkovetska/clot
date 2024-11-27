import Image from "next/image";
import { useMemo } from "react";

import { StarIcon } from "@/components/icons";
import { generateReviewDate } from "@/lib/utils/review";
import { ReviewType } from "@/types/review";

export default function ReviewItem({ review }: { review: ReviewType }) {
  const date = useMemo(() => generateReviewDate(review.date), [review]);

  const stars = Array(5).fill("star");
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-10 overflow-hidden rounded-full">
            <Image
              src={review?.user?.imageUrl ?? ""}
              alt="review"
              fill
            />
          </div>
          <span className="text-sm font-bold">
            {review?.user?.firstname} {review?.user?.lastname}
          </span>
        </div>
        <div className="flex items-center">
          {stars.map((star, ind) => (
            <StarIcon
              key={star + ind}
              className={review.rate >= ind + 1 ? "[&>*]:fill-primary" : ""}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-black-50">{review?.text}</p>
      <span className="text-sm">{date}</span>
      {/* todo: add media to review */}
    </div>
  );
}
