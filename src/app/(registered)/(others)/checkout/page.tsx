import Header from "@/components/common/header";
import PaymentContent from "@/components/payment/payment-content";
import Summary from "@/components/summary";

export default async function Page() {
  return (
    <>
      <Header title="Checkout" />
      <PaymentContent />
      <Summary
        subTotal={0}
        totalPrice={0}
        taxCost={0}
        shippingCost={0}
      />
    </>
  );
}
