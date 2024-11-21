import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import SuccessfullImage from "@/images/payment/image3.png";
import { ROUTES } from "@/lib/constants/routes";

export default function SuccessfullPayment() {
  return (
    <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-end bg-primary">
      <Image
        src={SuccessfullImage.src}
        width={317}
        height={252}
        alt="success-payment"
        className="mb-16"
      />
      <div className="flex w-full flex-col items-center gap-6 rounded-t-2xl bg-white px-6 pb-14 pt-10">
        <span className="text-center text-[32px] font-bold">
          Order Placed Successfully
        </span>
        <p className="text-md text-center text-black-50">
          You will recieve an email confirmation
        </p>
        <Link
          href={ROUTES.orders}
          className="w-full"
        >
          <Button className="mt-8 h-14 w-full rounded-[24px]">
            See Order details
          </Button>
        </Link>
      </div>
    </div>
  );
}
