import { useCallback, useState } from "react";

import { ChevronLeftIcon, DiscountIcon, Spinner } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/lib/hooks/useCart";

export default function CouponBlock() {
  const [value, setValue] = useState("");

  const { applyCoupon, isDiscountPending } = useCart({
    enabled: false,
    onApplySuccess: () => setValue(""),
  });

  const handleSubmit = useCallback(() => {
    applyCoupon({
      coupon: value,
    });
  }, [value, applyCoupon]);
  return (
    <Input
      className="h-14"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      iconLeft={<DiscountIcon className="min-w-6 max-w-6" />}
      placeholder="Enter Coupon Code"
      iconRight={
        <Button
          disabled={!value.length || isDiscountPending}
          size="icon"
          className="min-w-10 max-w-10 rotate-180 items-center justify-center [&>svg>path]:stroke-white"
          onClick={handleSubmit}
        >
          {isDiscountPending ? (
            <Spinner className="!m-0 size-4 [&>*]:text-white" />
          ) : (
            <ChevronLeftIcon />
          )}
        </Button>
      }
    />
  );
}
