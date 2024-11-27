import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { OrderItemStatusEnum, OrderItemStatusType } from "@/types/order";

type OrdersFiltersPropType = {
  isDesktop?: boolean;
  selectedFilter: OrderItemStatusType;
  onSelect: (key: OrderItemStatusType) => void;
};

export default function OrdersFilters({
  isDesktop,
  selectedFilter,
  onSelect,
}: OrdersFiltersPropType) {
  const filters = useMemo(() => Object.keys(OrderItemStatusEnum), []);
  return (
    <div className="flex items-center gap-3">
      {filters.map((filter) => (
        <Button
          key={filter}
          size={isDesktop ? undefined : "sm"}
          variant={selectedFilter === filter ? "default" : "outline"}
          className="rounded-[100px]"
          onClick={() => onSelect(filter as OrderItemStatusType)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
