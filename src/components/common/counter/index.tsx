import { MinusIcon, PlusIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CounterPropType = {
  className?: string;
  count: number;
  variant: "icon" | "icon-sm";
  disabledMinus?: boolean;
  disabledPlus?: boolean;
  handleCountChange: (num: number) => void;
};
export default function Counter({
  className,
  variant,
  count,
  disabledMinus,
  disabledPlus,
  handleCountChange,
}: CounterPropType) {
  const valueClassName = variant === "icon-sm" ? "text-sm" : "text-md";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        disabled={disabledMinus}
        size={variant}
        onClick={() => handleCountChange(-1)}
      >
        <MinusIcon />
      </Button>
      <span className={cn("w-[20px] text-center", valueClassName)}>
        {count}
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
