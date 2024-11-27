import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { QUERY_KEYS } from "@/lib/constants/querykeys";
import OrderService from "@/services/order.service";
import { OrderItemStatusType } from "@/types/order";

export const useOrders = (filter: OrderItemStatusType) => {
  const {
    data,
    isLoading,
    isFetching,
    isFetchingNextPage,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.ORDERS, filter],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      OrderService.getOrders({
        page: pageParam,
        filter,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 < lastPage.totalPages
        ? lastPage.page + 1
        : lastPage.totalPages,
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  const currentPage = useMemo(
    () => data?.pages?.[data?.pages.length - 1],
    [data]
  );

  const ordersList = useMemo(
    () => data?.pages.flatMap((dt) => dt.orders),
    [data]
  );

  return {
    ordersList,
    currentPage,
    isFetchingNextPage,
    isFetching: isFetching || isLoading,
    fetchNextPage,
  };
};
