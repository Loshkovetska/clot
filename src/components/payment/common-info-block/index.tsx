import ChevronLeftIcon from "@/components/icons/chevron";
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
      <div className="w-full p-3 rounded-lg bg-light-100 flex gap-4">
        <div className="flex flex-col gap-1 grow items-start">
          <span className="text-sm text-black-50">
            {type === "address" ? "Shipping Address" : "Payment Card"}
          </span>
          <span className="text-sm text-black-100 line-clamp-1">
            {type === "address" ? address : card}
          </span>
        </div>
        <div className="flex items-center justify-center rotate-180">
          <ChevronLeftIcon />
        </div>
      </div>
    </Button>
  );
}
