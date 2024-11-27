import { CheckIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { TrackingType } from "@/types/order";

export default function OrderTracking({
  tracking,
}: {
  tracking: TrackingType[];
}) {
  return (
    <div className="flex flex-col gap-[50px]">
      {tracking.map((trackItem) => (
        <div
          className="flex items-center justify-between"
          key={trackItem.status}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-6 items-center justify-center rounded-full",
                trackItem.date
                  ? "bg-primary"
                  : "border border-light-100 bg-white"
              )}
            >
              {trackItem.date && <CheckIcon />}
            </div>
            <span className="text-md">{trackItem.status}</span>
          </div>
          {trackItem.date && (
            <span className="text-sm">{trackItem.date.toString()}</span>
          )}
        </div>
      ))}
    </div>
  );
}
