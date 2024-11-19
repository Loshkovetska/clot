import Image from "next/image";

type HeaderUserPropType = {
  imageUrl?: string;
};

export default function HeaderUser({ imageUrl }: HeaderUserPropType) {
  return (
    <div className="flex items-center justify-center relative rounded-full bg-dark-100 size-10 overflow-hidden">
      <Image
        src={imageUrl ?? ""}
        alt="user-image"
        fill
      />
    </div>
  );
}
