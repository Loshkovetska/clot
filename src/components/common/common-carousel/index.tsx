import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselProps,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type CommonCarouselPropType = {
  data: any[];
  slideClassName: string;
  className?: string;
} & CarouselProps;

export default function CommonCarousel({
  data,
  slideClassName,
  className,
  ...props
}: CommonCarouselPropType) {
  return (
    <Carousel
      opts={{
        slidesToScroll: 2,
      }}
      className="[&>*:nth-child(1)]:w-[calc(100%+48px) w-full [&>*:nth-child(1)]:-mx-6 [&>*:nth-child(1)]:px-6"
      {...props}
    >
      <CarouselContent className={className}>
        {data.map((slide, ind) => (
          <CarouselItem
            className={cn("basis-1/3", slideClassName)}
            key={ind}
          >
            {slide}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}