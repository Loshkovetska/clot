"use client";

import CartList from "@/components/cart-page/cart-list";
import CouponBlock from "@/components/cart-page/cart-list/coupon-block";
import BottomBar from "@/components/common/bottom-bar";
import Summary from "@/components/summary";
import { ROUTES } from "@/lib/constants/routes";

export default function CartContent() {
  return (
    <>
      <CartList />
      <Summary
        subTotal={0}
        totalPrice={0}
        taxCost={0}
        shippingCost={0}
      />
      <CouponBlock />
      <BottomBar
        actionLink={ROUTES.checkout}
        actionTitle="Checkout"
      />
    </>
  );
}
