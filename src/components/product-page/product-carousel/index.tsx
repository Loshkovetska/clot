import Image from "next/image";

export default function ProductCarousel({ images }: { images?: string[] }) {
  return (
    <div className="flex items-center gap-3 overflow-hidden">
      {images?.map((image, ind) => (
        <div
          className="min-w-[161px] max-w-[161px] relative h-[248px]"
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
