import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/category";

export default function CatItem({
  title,
  imageUrl,
  slug,
  variant,
}: CategoryType & { variant?: "full" }) {
  return (
    <Link
      className={cn("flex flex-col items-center gap-1.5", {
        "flex-row gap-4 p-3 bg-light-100 rounded-lg": variant === "full",
      })}
      href={`${ROUTES.categories}/${slug}`}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-full",
          variant === "full" ? "size-10" : "size-14"
        )}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${imageUrl ?? ""}`}
          alt="cat-item"
          fill
        />
      </div>
      <h3 className={variant === "full" ? "text-md" : "text-sm"}>{title}</h3>
    </Link>
  );
}
