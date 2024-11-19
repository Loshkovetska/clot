"use client";
import ProductPrice from "@/components/home-page/products-list/product-price";
import HeartIcon from "@/components/icons/heart";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

export default function ProductCard(
  props: ProductType & { className?: string }
) {
  const { title, imageUrls, price, discount, className, slug, id } = props;

  const addProductToFav = useCallback(() => {}, [id]);
  return (
    <Link
      href={`${ROUTES.product}/${slug}`}
      className={cn(
        "w-full flex flex-col bg-light-100 pb-4 rounded-md overflow-hidden max-w-[156px]",
        className
      )}
    >
      <div className="w-full h-[220px] mb-2 relative">
        <Image
          src={imageUrls?.[0] ?? ""}
          alt="product"
          fill
        />
        <Button
          onClick={addProductToFav}
          variant="transparent"
          className="absolute top-2 right-3"
        >
          <HeartIcon />
        </Button>
      </div>
      <div className="w-full flex flex-col gap-2 grow px-2">
        <h3 className="text-md line-clamp-1">{title}</h3>
        <ProductPrice
          price={price}
          discount={discount}
        />
      </div>
    </Link>
  );
}
