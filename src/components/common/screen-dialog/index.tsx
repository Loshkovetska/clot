import React, { PropsWithChildren, useCallback, useState } from "react";

import Header from "@/components/common/header";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ScreenDialogPropType = {
  trigger: React.ReactNode;
  title: string;
  buttonsBlock?: React.ReactNode[] | React.ReactNode;
  open?: boolean;
  onOpenChange?: (flag: boolean) => void;
} & PropsWithChildren;

export default function ScreenDialog({
  trigger,
  title,
  children,
  buttonsBlock,
  open,
  onOpenChange,
}: ScreenDialogPropType) {
  const [isOpen, setOpen] = useState(false);

  const handleDialogState = useCallback(
    (flag: boolean) => {
      onOpenChange?.(flag);
      setOpen(flag);
    },
    [onOpenChange]
  );

  return (
    <Dialog
      open={onOpenChange ? open : isOpen}
      onOpenChange={handleDialogState}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <Header
            title={title}
            titleClassName="text-md font-bold"
            className="relative"
            backButtonAction={() => handleDialogState(false)}
          />
        </DialogHeader>
        <div className="px-6">{children}</div>
        {buttonsBlock && <DialogFooter>{buttonsBlock}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
