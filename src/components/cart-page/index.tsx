"use client";

import CartList from "@/components/cart-page/cart-list";
import CouponBlock from "@/components/cart-page/cart-list/coupon-block";
import BottomBar from "@/components/common/bottom-bar";
import EmptyList from "@/components/common/empty-list";
import Summary from "@/components/summary";
import { ROUTES } from "@/lib/constants/routes";
import useCart from "@/lib/hooks/useCart";

export default function CartContent() {
  const { cartSummary, cartItems, isLoading } = useCart();

  if (!isLoading && !cartItems.length) {
    return (
      <EmptyList
        type="cart"
        className="grow justify-center"
      />
    );
  }

  return (
    <>
      <CartList items={cartItems} />
      <Summary {...cartSummary} />
      <CouponBlock />
      <BottomBar
        actionLink={ROUTES.checkout}
        actionTitle="Checkout"
      />
    </>
  );
}
