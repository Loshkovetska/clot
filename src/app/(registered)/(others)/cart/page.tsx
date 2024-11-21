import CartList from "@/components/cart-page/cart-list";
import CouponBlock from "@/components/cart-page/cart-list/coupon-block";
import BottomBar from "@/components/common/bottom-bar";
import Header from "@/components/common/header";
import Summary from "@/components/summary";
import { ROUTES } from "@/lib/constants/routes";

export default async function Page() {
  return (
    <>
      <Header title="Cart" />
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
