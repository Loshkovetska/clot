import { Button } from "@/components/ui/button";
import SuccessfullImage from "@/images/payment/image3.png";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";

export default function SuccessfullPayment() {
  return (
    <div className="fixed z-[100000] inset-0 bg-primary flex flex-col items-center justify-end">
      <Image
        src={SuccessfullImage.src}
        width={317}
        height={252}
        alt="success-payment"
        className="mb-16"
      />
      <div className="w-full pt-10 px-6 pb-14 bg-white gap-6 rounded-t-2xl flex flex-col items-center">
        <span className="text-[32px] font-bold text-center">
          Order Placed Successfully
        </span>
        <p className="text-black-50 text-md text-center">
          You will recieve an email confirmation
        </p>
        <Link
          href={ROUTES.orders}
          className="w-full"
        >
          <Button className="rounded-[24px] mt-8 w-full h-14">
            See Order details
          </Button>
        </Link>
      </div>
    </div>
  );
}
