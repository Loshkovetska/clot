"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import ProductPrice from "@/components/home-page/products-list/product-price";
import { HeartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import FavService from "@/services/fav.service";
import { WishlistParams } from "@/types/fav";
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

  const [isFav, setFav] = useState(isFavorite);

  const queryClient = useQueryClient();

  const { mutate: doWishlistAction } = useMutation({
    mutationFn: (params: WishlistParams) => FavService.doWishlistAction(params),
    onSuccess: (_, vars) => {
      toast.success(
        `Product was successfully ${vars.type === "remove" ? "removed from " : "added to "} Wishlist`
      );
      setFav(vars.type === "add");
      if (invalidate && vars.type === "remove") {
        queryClient.setQueryData(
          [QUERY_KEYS.WISHLIST],
          (oldData: ProductType[]) => oldData.filter((prod) => prod.id !== id)
        );
      }
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const addProductToFav = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      doWishlistAction({
        product_id: id,
        combination: JSON.stringify(combinations?.[0]),
        type: isFav ? "remove" : "add",
      });
    },
    [id, isFav, combinations, doWishlistAction]
  );
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
