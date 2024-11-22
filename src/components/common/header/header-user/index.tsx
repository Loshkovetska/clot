import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import { cn } from "@/lib/utils";

export default function HeaderUser({ className }: { className?: string }) {
  const { isLoaded, user } = useUser();
  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-black-50",
        className
      )}
    >
      {isLoaded && (
        <Image
          src={user?.imageUrl ?? ""}
          alt="user-image"
          fill
        />
      )}
    </div>
  );
}
