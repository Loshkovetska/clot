"use client";
import BackButton from "@/components/common/buttons/back-button";
import FuncButton from "@/components/common/buttons/func-button";
import HeaderUser from "@/components/common/header/header-user";
import { cn } from "@/lib/utils";

type HeaderPropType = {
  title?: string;
  showUser?: boolean;
  funcButton?: {
    href: string;
    type: "cart" | "fav";
  };
  className?: string;
  backButtonClassName?: string;
};

export default function Header({
  title,
  showUser = false,
  funcButton,
  className,
  backButtonClassName,
}: HeaderPropType) {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-between py-4 px-5 fixed left-0 right-0 top-0 bg-white",
        {
          "justify-center": !showUser && !funcButton,
          "h-16 max-w-[1248px]": !showUser || (!showUser && funcButton),
        },
        className
      )}
    >
      {showUser && <HeaderUser />}
      {!showUser && (
        <BackButton
          className={cn("absolute left-5 mb-0", backButtonClassName)}
        />
      )}
      <span
        className={cn("text-2xl", {
          "text-md": !showUser,
        })}
      >
        {title}
      </span>
      {funcButton && (
        <FuncButton
          href={funcButton?.href}
          type={funcButton?.type}
        />
      )}
    </header>
  );
}
