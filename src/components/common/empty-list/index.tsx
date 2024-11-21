import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EMPTYLIST_DATA } from "@/lib/constants/emptylist";

type EmptyListPropType = {
  type: "notifications" | "orders" | "search" | "cart" | "message";
};

export default function EmptyList({ type }: EmptyListPropType) {
  const data = EMPTYLIST_DATA[type];
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <Image
        width={100}
        height={100}
        src={data.imageUrl?.src}
        alt="empty-list"
      />
      <h3 className="text-3xl">{data.title}</h3>
      <Link href={data.buttonLink}>
        <Button>{data.buttonTitle}</Button>
      </Link>
    </div>
  );
}
