import CommonListHeader from "@/components/home-page/common-list-header";
import { CommonListPropType } from "@/components/home-page/type";
import { cn } from "@/lib/utils";

type CommonListWrapperPropType = {
  listClassName?: string;
  data: React.ReactNode[];
} & CommonListPropType;

export default function CommonListWrapper({
  title,
  href,
  listClassName,
  data,
}: CommonListWrapperPropType) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <CommonListHeader
        title={title}
        href={href}
      />
      <div className={cn("flex items-center gap-3 w-full", listClassName)}>
        {data}
      </div>
    </div>
  );
}
