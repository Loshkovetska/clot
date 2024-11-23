"use client";

import { useQuery } from "@tanstack/react-query";

import ProductCard from "@/components/home-page/products-list/product-card";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import FavService from "@/services/fav.service";

export default function FavContent() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.WISHLIST],
    queryFn: () => FavService.getWishlist(),
  });
  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
      {data?.map((item) => (
        <ProductCard
          key={item.id}
          {...item}
          isFavorite
          className="max-w-none"
          invalidate
        />
      ))}
    </div>
  );
}
