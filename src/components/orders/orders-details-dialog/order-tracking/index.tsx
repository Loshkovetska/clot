import dayjs from "dayjs";

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
          className={cn(
            "flex items-center justify-between",
            trackItem.date ? "" : "opacity-30"
          )}
          key={trackItem.status}
        >
          <div className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-full bg-primary">
              <CheckIcon />
            </div>
            <span className="text-md">{trackItem.status}</span>
          </div>
          {trackItem.date && (
            <span className="text-sm">
              {dayjs(trackItem.date).format("DD MMMM")}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
