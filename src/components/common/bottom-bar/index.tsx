import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="px-3 py-6 bg-white flex items-center justify-center fixed bottom-0 left-0 w-full">
      {!action && (
        <Link
          className="w-full"
          href={actionLink ?? ""}
        >
          <Button className="w-full rounded-[24px] h-14">{actionTitle}</Button>
        </Link>
      )}
      {action && (
        <div className="w-full rounded-[24px] bg-primary flex items-center h-14 justify-between px-6">
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
