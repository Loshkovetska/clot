import CartContent from "@/components/cart-page";
import Header from "@/components/common/header";

export default async function Page() {
  return (
    <>
      <Header title="Cart" />
      <CartContent />
    </>
  );
}
