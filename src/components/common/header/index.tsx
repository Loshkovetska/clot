"use client";
import { PropsWithChildren } from "react";

import BackButton from "@/components/common/buttons/back-button";
import FuncButton from "@/components/common/buttons/func-button";
import UserAvatar from "@/components/common/user-avatar";
import { cn } from "@/lib/utils";

type HeaderPropType = {
  title?: string;
  titleClassName?: string;
  showUser?: boolean;
  funcButtons?: {
    href: string;
    type: "cart" | "fav";
    variant?: "default" | "destructive" | "outline" | "light" | "transparent";
    iconClassName?: string;
    action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  }[];
  className?: string;
  backButtonClassName?: string;
  hideBackButton?: boolean;
  backButtonAction?: () => void;
} & PropsWithChildren;

export default function Header({
  title,
  titleClassName,
  showUser = false,
  funcButtons,
  className,
  backButtonClassName,
  children,
  hideBackButton,
  backButtonAction,
}: HeaderPropType) {
  return (
    <header
      className={cn(
        "w-full flex items-center justify-between py-4 px-5 fixed left-0 right-0 top-0 bg-white z-[1000]",
        {
          "justify-center": !showUser && !funcButtons,
          "h-[72px]": !showUser || (!showUser && funcButtons),
        },
        className
      )}
    >
      {showUser && <UserAvatar />}
      {!showUser && !hideBackButton && (
        <BackButton
          className={cn("absolute left-5 mb-0", backButtonClassName)}
          action={backButtonAction}
        />
      )}
      <span
        className={cn(
          "text-2xl",
          {
            "text-md font-bold": !showUser,
          },
          titleClassName
        )}
      >
        {title}
      </span>
      {children}
      {funcButtons && (
        <div className="flex items-center gap-2">
          {funcButtons.map((funcButton) => (
            <FuncButton
              key={funcButton.type}
              href={funcButton?.href}
              type={funcButton?.type}
              variant={funcButton?.variant}
              iconClassName={funcButton.iconClassName}
              action={funcButton.action}
            />
          ))}
        </div>
      )}
    </header>
  );
}
