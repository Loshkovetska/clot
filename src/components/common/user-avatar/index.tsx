import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils/string";

export default function UserAvatar({ className }: { className?: string }) {
  const { isLoaded, user } = useUser();
  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-black-50",
        className
      )}
    >
      {isLoaded &&
        (!!user?.imageUrl ? (
          <Image
            src={user?.imageUrl}
            alt="user-image"
            fill
          />
        ) : (
          <span className="text-sm text-white">
            {initials(user?.firstName, user?.lastName)}
          </span>
        ))}
    </div>
  );
}
