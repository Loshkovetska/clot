"use client";

import CartList from "@/components/cart-page/cart-list";
import CouponBlock from "@/components/cart-page/cart-list/coupon-block";
import BottomBar from "@/components/common/bottom-bar";
import EmptyList from "@/components/common/empty-list";
import Summary from "@/components/summary";
import { ROUTES } from "@/lib/constants/routes";
import useCart from "@/lib/hooks/useCart";

export default function CartContent() {
  const { cartSummary, cartItems, isLoading, appliedDiscount } = useCart({});

  if (!isLoading && !cartItems.length) {
    return <EmptyList type="cart" />;
  }

  return (
    <>
      <CartList items={cartItems} />
      {cartSummary && (
        <>
          <Summary {...cartSummary} />
          {!appliedDiscount && <CouponBlock />}
        </>
      )}

      <BottomBar
        actionLink={ROUTES.checkout}
        actionTitle="Checkout"
      />
    </>
  );
}
