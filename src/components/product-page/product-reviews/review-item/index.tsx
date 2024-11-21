import StarIcon from "@/components/icons/star";
import { ReviewType } from "@/types/review";
import Image from "next/image";

export default function ReviewItem({ review }: { review: ReviewType }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-full">
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
          {Array(5)
            .fill("star")
            .map((star, ind) => (
              <StarIcon key={star + ind} />
            ))}
        </div>
      </div>
      <p className="text-sm text-black-50">{review?.text}</p>
      <span className="text-sm"> {review?.date.toDateString()}</span>
      {/* todo: add media to review */}
    </div>
  );
}
