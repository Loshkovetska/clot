import { ChevronLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

type CommonInfoBlockPropType = {
  type: "address" | "card";
  address?: any;
  card?: any;
};

export default function CommonInfoBlock({
  type,
  card,
  address,
}: CommonInfoBlockPropType) {
  return (
    <Button variant="transparent">
      <div className="flex w-full gap-4 rounded-lg bg-light-100 p-3">
        <div className="flex grow flex-col items-start gap-1">
          <span className="text-sm text-black-50">
            {type === "address" ? "Shipping Address" : "Payment Card"}
          </span>
          <span className="line-clamp-1 text-sm ">
            {type === "address" ? address : card}
          </span>
        </div>
        <div className="flex rotate-180 items-center justify-center">
          <ChevronLeftIcon />
        </div>
      </div>
    </Button>
  );
}
