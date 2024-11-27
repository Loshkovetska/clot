"use client";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import BottomBar from "@/components/common/bottom-bar";
import CommonInfoBlock from "@/components/payment/common-info-block";
import SuccessfullPayment from "@/components/payment/successfull-payment";
import Summary from "@/components/summary";
import { ROUTES } from "@/lib/constants/routes";
import { useAddress } from "@/lib/hooks/useAddress";
import useCart from "@/lib/hooks/useCart";
import { usePaymentCard } from "@/lib/hooks/usePaymentCard";
import NotificationService from "@/services/notification.service";
import OrderService from "@/services/order.service";
import { AddOrderParams } from "@/types/order";

export default function PaymentContent() {
  const { cartSummary, cartItems, isLoading } = useCart({ enabled: true });
  const { selectedAddress } = useAddress({ enabled: true });
  const { selectedCard } = usePaymentCard({ enabled: true });

  const [isSuccefull, setSuccessful] = useState(false);

  const { mutate: confirmOrder, isPending } = useMutation({
    mutationFn: (params: AddOrderParams) => OrderService.createOrder(params),
    onSuccess: () => {
      setSuccessful(true);
      NotificationService.postNotification();
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const handleConfirm = useCallback(() => {
    confirmOrder({
      card_id: selectedCard?.id || "",
      address_id: selectedAddress?.id || "",
      items: cartItems.map((cartItem) => ({
        product_id: cartItem.product.id,
        amount: cartItem.amount,
        combination: cartItem.combination,
      })),
      total_price: cartSummary?.totalPrice || 0,
      total_tax: cartSummary?.taxCost || 0,
      total_unitprice: cartSummary?.subTotal || 0,
      total_shipping: cartSummary?.shippingCost || 0,
      total_discount: cartSummary?.discount || 0,
    });
  }, [selectedCard, selectedAddress, cartItems, cartSummary, confirmOrder]);

  if (isSuccefull) {
    return <SuccessfullPayment />;
  }

  if (!isLoading && !cartItems.length) {
    redirect(ROUTES.categories);
  }
  return (
    <>
      <div className="flex flex-col gap-4 pt-10">
        {selectedAddress && (
          <CommonInfoBlock
            item={selectedAddress}
            type="address"
            variant="payment"
          />
        )}
        {selectedCard && (
          <CommonInfoBlock
            item={selectedCard}
            type="card"
            variant="payment"
          />
        )}
      </div>
      {cartSummary && <Summary {...cartSummary} />}
      <BottomBar
        price={cartSummary?.totalPrice}
        actionTitle="Place Order"
        action={handleConfirm}
        loading={isPending}
      />
    </>
  );
}
