"use client";
import CatItem from "@/components/home-page/cats-list/cat-item";
import CommonListWrapper from "@/components/home-page/common-list-wrapper";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { ROUTES } from "@/lib/constants/routes";
import CategoryService from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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
      />
    );

  return null;
}
