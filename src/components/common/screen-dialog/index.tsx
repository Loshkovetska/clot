import React, { PropsWithChildren, useState } from "react";

import Header from "@/components/common/header";
import { cn } from "@/lib/utils";

type ScreenDialogPropType = {
  trigger: React.ReactNode;
  title: string;
  buttonsBlock: React.ReactNode[] | React.ReactNode;
} & PropsWithChildren;

export default function ScreenDialog({
  trigger,
  title,
  children,
  buttonsBlock,
}: ScreenDialogPropType) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[10000000] flex h-auto flex-col bg-white transition-all",
          { "invisible opacity-0": !isOpen }
        )}
      >
        <Header
          title={title}
          titleClassName="text-md font-bold"
          className="relative"
          backButtonAction={() => setOpen(false)}
        />
        <div className="px-6">{children}</div>
        <div className="fixed bottom-0 left-0 w-full border-t border-light-100 bg-white px-4 py-3">
          {buttonsBlock}
        </div>
      </div>
      {React.cloneElement(trigger as React.ReactElement, {
        onClick: setOpen,
      })}
    </>
  );
}
