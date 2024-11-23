"use client";

import { useQuery } from "@tanstack/react-query";

import ProductsResult from "@/components/products-result";
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
      <ProductsResult
        isLoading={isLoading}
        data={data || []}
        type="wishlist"
      />
    </ProfileWrapper>
  );
}
