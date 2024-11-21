import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function HeaderUser() {
  const { isLoaded, user } = useUser();
  return (
    <div className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-black-50">
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
