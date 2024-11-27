import Header from "@/components/common/header";
import NavBar from "@/components/common/navbar";
import OrdersContent from "@/components/orders";

export default async function Page() {
  return (
    <>
      <Header
        title="Orders"
        hideBackButton
      />
      <OrdersContent />
      <NavBar />
    </>
  );
}
