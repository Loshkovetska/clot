import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type MobileDialogPropType = {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  buttonsBlock?: React.ReactNode;
  children?: React.ReactNode[] | React.ReactNode;
  open?: boolean;
  onOpenChange?: (fl: boolean) => void;
};

export default function MobileDialog({
  trigger,
  title,
  description,
  buttonsBlock,
  children,
  open,
  onOpenChange,
}: MobileDialogPropType) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {title && <SheetTitle className="text-2xl">{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-2 w-full flex flex-col gap-4 px-4 pb-4">
          {children}
        </div>
        <SheetFooter>
          {buttonsBlock || (
            <SheetClose asChild>
              <Button
                size="lg"
                variant="light"
              >
                Cancel
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
