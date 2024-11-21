import Link from "next/link";

import { Button } from "@/components/ui/button";

type BottomBarPropType = {
  price?: number;
  actionTitle?: string;
  actionLink?: string;
  action?: () => void;
};

export default function BottomBar({
  price,
  actionTitle,
  actionLink,
  action,
}: BottomBarPropType) {
  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-center bg-white px-3 py-6">
      {!action && (
        <Link
          className="w-full"
          href={actionLink ?? ""}
        >
          <Button className="h-14 w-full rounded-[24px]">{actionTitle}</Button>
        </Link>
      )}
      {action && (
        <div className="flex h-14 w-full items-center justify-between rounded-[24px] bg-primary px-6">
          <span className="text-md text-white">${price?.toFixed(2)}</span>
          <Button
            onClick={action}
            variant="transparent"
            className="text-white"
          >
            {actionTitle}
          </Button>
        </div>
      )}
    </div>
  );
}
