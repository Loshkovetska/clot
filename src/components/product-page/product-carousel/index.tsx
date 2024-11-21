import Image from "next/image";

export default function ProductCarousel({ images }: { images?: string[] }) {
  return (
    <div className="flex items-center gap-3 lg:gap-5 overflow-x-scroll snap-x lg:max-w-[555px] max-w-screen max-lg:-mx-6 max-lg:px-6 hide-scrollbar">
      {images?.map((image, ind) => (
        <div
          className="max-lg:min-w-[161px] max-lg:max-w-[161px] relative max-lg:h-[248px] min-w-[320px] max-w-[320px] h-[468px] snap-center"
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
