"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import CommonListWrapper from "@/components/home-page/common-list-wrapper";
import ProductCard from "@/components/home-page/products-list/product-card";
import { CommonListPropType } from "@/components/home-page/type";
import ProductService from "@/services/product.service";
import { ProductsSearchParams } from "@/types/product";

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
          className="max-w-none"
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
      slideClassName="basis-1/2 md:basis-1/4 lg:basis-1/6 pl-3"
      listClassName="select-none -ml-3"
    />
  );
}
