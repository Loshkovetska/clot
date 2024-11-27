import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import { OrderItemStatusEnum, OrderItemStatusType } from "@/types/order";

type OrdersFiltersPropType = {
  selectedFilter: OrderItemStatusType;
  onSelect: (key: OrderItemStatusType) => void;
};

export default function OrdersFilters({
  selectedFilter,
  onSelect,
}: OrdersFiltersPropType) {
  const filters = useMemo(() => Object.keys(OrderItemStatusEnum), []);
  return (
    <ScrollArea className="mt-4 max-lg:-mx-6 max-lg:max-w-[calc(100%+48px)]">
      <div className="flex items-center gap-3 max-lg:px-6">
        {filters.map((filter) => (
          <Button
            key={filter}
            size="default_sm"
            variant={selectedFilter === filter ? "default" : "outline"}
            className="rounded-[100px]"
            onClick={() => onSelect(filter as OrderItemStatusType)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
