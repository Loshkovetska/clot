import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EMPTYLIST_DATA } from "@/lib/constants/emptylist";
import { cn } from "@/lib/utils";

type EmptyListPropType = {
  type: keyof typeof EMPTYLIST_DATA;
  className?: string;
};

export default function EmptyList({ type, className }: EmptyListPropType) {
  const data = EMPTYLIST_DATA[type];
  return (
    <div className={cn("flex w-full flex-col items-center gap-6", className)}>
      <Image
        width={100}
        height={100}
        src={data.imageUrl?.src}
        alt="empty-list"
      />
      <h3 className="text-center text-3xl">{data.title}</h3>
      <Link href={data.buttonLink}>
        <Button>{data.buttonTitle}</Button>
      </Link>
    </div>
  );
}
