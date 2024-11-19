import Image from "next/image";

type CatItemPropType = {
  title: string;
  imageUrl?: string;
};

export default function CatItem({ title, imageUrl }: CatItemPropType) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="size-14 rounded-full overflow-hidden relative">
        <Image
          src={imageUrl ?? ""}
          alt="cat-item"
          fill
        />
      </div>
      <h3 className="text-lg">{title}</h3>
    </div>
  );
}
