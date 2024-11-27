import { OrderIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { OrderCartItemType } from "@/types/order";

export default function OrderItems({ items }: { items: OrderCartItemType[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-md font-bold">Order Items</span>
      <div className="flex w-full items-center justify-between rounded-lg bg-light-100 px-3 py-4">
        <div className="flex items-center gap-3">
          <OrderIcon />
          {items.length} item{items.length > 1 ? "s" : ""}
        </div>
        <Button
          variant="transparent"
          className="text-primary"
          size="sm"
        >
          View All
        </Button>
      </div>
    </div>
  );
}
