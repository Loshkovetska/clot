import CommonCarousel from "@/components/common/common-carousel";
import CommonListHeader from "@/components/home-page/common-list-header";
import { CommonListPropType } from "@/components/home-page/type";
import { cn } from "@/lib/utils";

type CommonListWrapperPropType = {
  listClassName?: string;
  data: React.ReactNode[];
  slideClassName: string;
} & CommonListPropType;

export default function CommonListWrapper({
  title,
  href,
  data,
  listClassName,
  slideClassName,
}: CommonListWrapperPropType) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <CommonListHeader
        title={title}
        href={href}
      />
      <CommonCarousel
        className={cn("flex items-center w-full", listClassName)}
        slideClassName={slideClassName}
        data={data}
      />
    </div>
  );
}
