import Header from "@/components/common/header";
import PaymentContent from "@/components/payment/payment-content";

export default async function Page() {
  return (
    <>
      <Header title="Checkout" />
      <PaymentContent />
    </>
  );
}
