"use client";
import BottomBar from "@/components/common/bottom-bar";
import CommonInfoBlock from "@/components/payment/common-info-block";

export default function PaymentContent() {
  return (
    <>
      <div className="flex flex-col gap-4 pt-10">
        <CommonInfoBlock type="address" />
        <CommonInfoBlock type="card" />
      </div>
      {/* <SuccessfullPayment /> */}
      <BottomBar
        price={10}
        actionTitle="Place Order"
        action={() => {}}
      />
    </>
  );
}
