"use client";

import { useQuery } from "@tanstack/react-query";

import EmptyList from "@/components/common/empty-list";
import ProductCard from "@/components/home-page/products-list/product-card";
import ProfileWrapper from "@/components/profile-page/profile-wrapper";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import FavService from "@/services/fav.service";

export default function FavContent() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.WISHLIST],
    queryFn: () => FavService.getWishlist(),
  });
  return (
    <ProfileWrapper
      title={`Wishlist ${data?.length ? `(${data?.length})` : ""}`}
    >
      {!isLoading && !data?.length ? (
        <EmptyList
          type="wishlist"
          className="grow justify-center"
        />
      ) : (
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
      )}
    </ProfileWrapper>
  );
}
