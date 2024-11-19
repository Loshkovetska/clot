import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";

type CatItemPropType = {
  title: string;
  imageUrl?: string;
  slug: string;
};

export default function CatItem({ title, imageUrl, slug }: CatItemPropType) {
  return (
    <Link
      className="flex flex-col items-center gap-1.5"
      href={`${ROUTES.categories}/${slug}`}
    >
      <div className="size-14 rounded-full overflow-hidden relative">
        <Image
          src={imageUrl ?? ""}
          alt="cat-item"
          fill
        />
      </div>
      <h3 className="text-lg">{title}</h3>
    </Link>
  );
}
