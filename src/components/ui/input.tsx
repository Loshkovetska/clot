import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "group flex w-full items-center gap-3 overflow-hidden bg-light-100",
  {
    variants: {
      variant: {
        default: "rounded-lg",
        rounded: "rounded-[24px]",
        destructive: "rounded-lg border border-destructive shadow-sm",
      },
      sizeB: {
        default: "h-10 px-4 py-2",
        lg: "h-14 px-4 py-3",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      sizeB: "default",
      disabled: false,
    },
  }
);

type InputPropType = {
  inputClassName?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
} & React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputPropType>(
  (
    {
      className,
      type,
      inputClassName,
      iconLeft,
      iconRight,
      variant,
      sizeB,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          inputVariants({ variant, sizeB, disabled: props.disabled, className })
        )}
      >
        {iconLeft}
        <input
          type={type}
          className={cn(
            "flex h-full w-full bg-transparent outline-none focus:outline-none",
            inputClassName
          )}
          ref={ref}
          {...props}
        />
        {iconRight}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
