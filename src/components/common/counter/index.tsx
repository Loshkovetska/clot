import { MinusIcon, PlusIcon, Spinner } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CounterPropType = {
  className?: string;
  count: number;
  variant: "icon" | "icon-sm";
  disabledMinus?: boolean;
  disabledPlus?: boolean;
  loading?: boolean;
  handleCountChange: (num: number) => void;
};
export default function Counter({
  className,
  variant,
  count,
  disabledMinus,
  disabledPlus,
  loading,
  handleCountChange,
}: CounterPropType) {
  const valueClassName =
    variant === "icon-sm" ? "text-sm w-[16px]" : "text-md w-[20px]";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        disabled={disabledMinus}
        size={variant}
        onClick={() => handleCountChange(-1)}
      >
        <MinusIcon />
      </Button>
      <span className={cn("text-center", valueClassName)}>
        {loading ? <Spinner className="size-4 [&>*]:text-primary" /> : count}
      </span>
      <Button
        disabled={disabledPlus}
        size={variant}
        onClick={() => handleCountChange(1)}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}
