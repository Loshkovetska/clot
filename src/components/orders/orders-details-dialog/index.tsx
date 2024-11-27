import { useMemo } from "react";

import ScreenDialog from "@/components/common/screen-dialog";
import OrderItem from "@/components/orders/order-item";
import OrderAddress from "@/components/orders/orders-details-dialog/order-address";
import OrderItems from "@/components/orders/orders-details-dialog/order-items";
import OrderTracking from "@/components/orders/orders-details-dialog/order-tracking";
import Summary from "@/components/summary";
import { OrderItemType, TrackingType } from "@/types/order";

export default function OrdersDetailsDialog({
  order,
}: {
  order: OrderItemType;
}) {
  const tracking: TrackingType[] = useMemo(
    () => JSON.parse(order.tracking || "[]"),
    [order]
  );
  return (
    <ScreenDialog
      title={`Order #${order.order_number}`}
      trigger={<OrderItem order={order} />}
    >
      <div className="flex flex-col gap-10">
        <OrderTracking tracking={tracking} />
        <OrderItems items={order.items} />
        <OrderAddress address={order.address} />
        <Summary
          discount={order.total_discount}
          taxCost={order.total_tax}
          shippingCost={order.total_shipping}
          subTotal={order.total_unitprice}
          totalPrice={order.total_price}
        />
      </div>
    </ScreenDialog>
  );
}
