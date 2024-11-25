import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { EMPTYLIST_DATA } from "@/lib/constants/emptylist";
import { cn } from "@/lib/utils";

type EmptyListPropType = {
  type: keyof typeof EMPTYLIST_DATA;
  className?: string;
  buttonAction?: () => void;
};

export default function EmptyList({
  type,
  className,
  buttonAction,
}: EmptyListPropType) {
  const data = EMPTYLIST_DATA[type];

  const button = useMemo(
    () => (
      <Button
        size="lg"
        className="px-6 py-4"
        onClick={buttonAction}
      >
        {data.buttonTitle}
      </Button>
    ),
    [data, buttonAction]
  );
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-6 pt-20 justify-center grow",
        className
      )}
    >
      <Image
        width={100}
        height={100}
        src={data.imageUrl?.src}
        alt="empty-list"
      />
      <h3 className="text-center text-xl">{data.title}</h3>
      {buttonAction ? button : <Link href={data.buttonLink}>{button}</Link>}
    </div>
  );
}
