import Image from "next/image";
import { useMemo } from "react";

import CommonCarousel from "@/components/common/common-carousel";

export default function ProductCarousel({ images }: { images?: string[] }) {
  const media = useMemo(
    () =>
      images?.map((image, ind) => (
        <div
          className="relative h-[369px] w-full max-md:h-[60vw] md:max-lg:h-[48vw]"
          key={`${image}-${ind}`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${image}`}
            alt={`${image}-${ind}`}
            fill
          />
        </div>
      )) || [],
    [images]
  );
  return (
    <CommonCarousel
      carouselClassName="lg:min-w-[520px] lg:max-w-[520px] [&>*:nth-child(1)]:w-full [&>*:nth-child(1)]:px-0 [&>*:nth-child(1)]:mx-0  max-md:[&>*:nth-child(1)]:w-[calc(100%+48px)] w-full max-md:[&>*:nth-child(1)]:-mx-6 max-md:[&>*:nth-child(1)]:px-6"
      data={media}
      slideClassName="basis-1/2 pl-3 lg:pl-5"
    />
  );
}
