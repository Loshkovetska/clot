"use client";
import CommonListWrapper from "@/components/home-page/common-list-wrapper";
import ProductCard from "@/components/home-page/products-list/product-card";
import { CommonListPropType } from "@/components/home-page/type";
import ProductService from "@/services/product.service";
import { ProductsSearchParams } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function ProductsList({
  title,
  href,
  params,
  queryKey,
}: CommonListPropType & { queryKey: string; params: ProductsSearchParams }) {
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: () => ProductService.getProductsByFilters(params),
  });
  const list = useMemo(
    () =>
      data?.map((item) => (
        <ProductCard
          key={item.id}
          {...(item as any)}
          className="min-w-[156px]"
        />
      )),
    [data]
  );
  if (!data?.length) return;

  return (
    <CommonListWrapper
      title={title}
      href={href}
      data={list ?? []}
      listClassName="snap-start overflow-hidden scroll-smooth snap-mandatory select-none"
    />
  );
}
