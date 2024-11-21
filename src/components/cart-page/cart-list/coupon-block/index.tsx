import { ChevronLeftIcon, DiscountIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CouponBlock() {
  return (
    <Input
      className="h-14"
      iconLeft={<DiscountIcon />}
      placeholder="Enter Coupon Code"
      iconRight={
        <Button
          size="icon"
          className="min-w-10 max-w-10 rotate-180 [&>svg>path]:stroke-white"
        >
          <ChevronLeftIcon />
        </Button>
      }
    />
  );
}
