"use client";
import BackButton from "@/components/common/buttons/back-button";
import FuncButton from "@/components/common/buttons/func-button";
import HeaderUser from "@/components/common/header/header-user";
import { cn } from "@/lib/utils";

type HeaderPropType = {
  title?: string;
  titleClassName?: string;
  showUser?: boolean;
  funcButton?: {
    href: string;
    type: "cart" | "fav";
    variant?: "default" | "destructive" | "outline" | "light" | "transparent";
  };
  className?: string;
  backButtonClassName?: string;
  backButtonAction?: () => void;
};

export default function Header({
  title,
  titleClassName,
  showUser = false,
  funcButton,
  className,
  backButtonClassName,
  backButtonAction,
}: HeaderPropType) {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-between py-4 px-5 fixed left-0 right-0 top-0 bg-white z-[1000]",
        {
          "justify-center": !showUser && !funcButton,
          "h-[72px]": !showUser || (!showUser && funcButton),
        },
        className
      )}
    >
      {showUser && <HeaderUser />}
      {!showUser && (
        <BackButton
          className={cn("absolute left-5 mb-0", backButtonClassName)}
          action={backButtonAction}
        />
      )}
      <span
        className={cn(
          "text-2xl",
          {
            "text-md": !showUser,
          },
          titleClassName
        )}
      >
        {title}
      </span>
      {funcButton && (
        <FuncButton
          href={funcButton?.href}
          type={funcButton?.type}
          variant={funcButton?.variant}
        />
      )}
    </header>
  );
}
