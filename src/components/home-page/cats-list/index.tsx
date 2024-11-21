"use client";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import CatItem from "@/components/home-page/cats-list/cat-item";
import CommonListWrapper from "@/components/home-page/common-list-wrapper";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { ROUTES } from "@/lib/constants/routes";
import CategoryService from "@/services/category.service";

export default function CatsList({ amount }: { amount?: number }) {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => CategoryService.getCategories(amount),
  });

  const list = useMemo(
    () =>
      data?.map((item) => (
        <CatItem
          key={item.id}
          {...item}
        />
      )),
    [data]
  );

  if (data?.length)
    return (
      <CommonListWrapper
        title="Categories"
        href={ROUTES.categories}
        data={list ?? []}
        slideClassName="basis-1/7 pl-3"
        listClassName="-ml-3"
      />
    );

  return null;
}
