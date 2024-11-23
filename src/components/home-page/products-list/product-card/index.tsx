"use client";
import Image from "next/image";
import Link from "next/link";

import ProductPrice from "@/components/home-page/products-list/product-price";
import { HeartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";

export default function ProductCard(
  props: ProductType & { className?: string; invalidate?: boolean }
) {
  const {
    title,
    imageUrls,
    combinations,
    className,
    slug,
    id,
    isFavorite,
    invalidate,
  } = props;

  const { addProductToFav, isFav } = useWishlist({
    isFavorite,
    invalidate,
    product_id: id,
    combinations,
  });

  return (
    <Link
      href={`${ROUTES.products}/${slug}`}
      className={cn(
        "w-full flex flex-col bg-light-100 pb-4 rounded-md overflow-hidden max-w-[156px]",
        className
      )}
    >
      <div className="relative mb-2 h-[220px] w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${imageUrls?.[0] ?? ""}`}
          alt={title}
          fill
          className="object-contain"
        />
        <Button
          onClick={addProductToFav}
          variant="transparent"
          className="absolute right-3 top-2 !h-auto"
        >
          <HeartIcon
            className={
              isFav ? "[&>*]:fill-destructive [&>*]:stroke-destructive" : ""
            }
          />
        </Button>
      </div>
      <div className="flex w-full grow flex-col gap-2 px-2">
        <h3 className="line-clamp-1 text-md">{title}</h3>
        <ProductPrice
          price={combinations?.[0].price as number}
          discount={combinations?.[0]?.discount as number}
        />
      </div>
    </Link>
  );
}
