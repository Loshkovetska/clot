"use client";

import { useState } from "react";

import EmptyList from "@/components/common/empty-list";
import OrdersDetailsDialog from "@/components/orders/orders-details-dialog";
import OrdersFilters from "@/components/orders/orders-filters";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useOrders } from "@/lib/hooks/useOrders";
import { OrderItemStatusEnum, OrderItemStatusType } from "@/types/order";

export default function OrdersContent() {
  const queryCheck = useMediaQuery("(min-width: 1024px)");

  const [filter, setFilter] = useState<OrderItemStatusType>(
    Object.keys(OrderItemStatusEnum)[0] as "Processing"
  );
  const { currentPage, ordersList, isFetching, fetchNextPage } = useOrders(
    filter as "Processing"
  );

  const isDesktop = typeof window !== "undefined" ? queryCheck : true;

  if (!isFetching && !ordersList?.length) return <EmptyList type="orders" />;

  return (
    <>
      <OrdersFilters
        selectedFilter={filter}
        onSelect={setFilter}
        isDesktop={isDesktop}
      />
      <div className="flex flex-col gap-3">
        {ordersList?.map((order) => (
          <OrdersDetailsDialog
            key={order.id}
            order={order}
          />
        ))}
        {currentPage?.hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            size="lg"
            className="mx-auto mt-4 w-full max-w-[240px] rounded-[100px]"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}
