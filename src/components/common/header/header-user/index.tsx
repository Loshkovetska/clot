import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function HeaderUser() {
  const { isLoaded, user } = useUser();
  return (
    <div className="flex items-center justify-center relative rounded-full bg-black-50 size-10 overflow-hidden">
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
