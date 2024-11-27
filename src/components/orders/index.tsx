"use client";

import { useState } from "react";

import EmptyList from "@/components/common/empty-list";
import OrdersDetailsDialog from "@/components/orders/orders-details-dialog";
import OrdersFilters from "@/components/orders/orders-filters";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/lib/hooks/useOrders";
import { OrderItemStatusEnum, OrderItemStatusType } from "@/types/order";

export default function OrdersContent() {
  const [filter, setFilter] = useState<OrderItemStatusType>(
    Object.keys(OrderItemStatusEnum)[0] as "Processing"
  );
  const { currentPage, ordersList, isFetching, fetchNextPage } = useOrders(
    filter as "Processing"
  );

  if (
    !isFetching &&
    !ordersList?.length &&
    filter === OrderItemStatusEnum.Processing
  )
    return <EmptyList type="orders" />;

  return (
    <>
      <OrdersFilters
        selectedFilter={filter}
        onSelect={setFilter}
      />
      <div className="flex flex-col gap-3">
        {ordersList?.map((order) => (
          <OrdersDetailsDialog
            key={order.id}
            order={order}
          />
        ))}
        {!isFetching &&
          !ordersList?.length &&
          filter !== OrderItemStatusEnum.Processing && (
            <EmptyList
              type="orders-filter"
              buttonAction={() => setFilter(OrderItemStatusEnum.Processing)}
            />
          )}

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
