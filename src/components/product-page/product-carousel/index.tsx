import Image from "next/image";

export default function ProductCarousel({ images }: { images?: string[] }) {
  return (
    <div className="max-w-screen hide-scrollbar flex snap-x items-center gap-3 overflow-x-scroll max-lg:-mx-6 max-lg:px-6 lg:max-w-[555px] lg:gap-5">
      {images?.map((image, ind) => (
        <div
          className="relative h-[468px] min-w-[320px] max-w-[320px] snap-center max-lg:h-[248px] max-lg:min-w-[161px] max-lg:max-w-[161px]"
          key={`${image}-${ind}`}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE}/${image}`}
            alt={`${image}-${ind}`}
            fill
          />
        </div>
      ))}
    </div>
  );
}
