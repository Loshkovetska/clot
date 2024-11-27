"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

type CollapseBlockPropType = {
  trigger: React.ReactNode;
  children: React.ReactNode[] | React.ReactNode;
};
const CollapseBlock = ({ children, trigger }: CollapseBlockPropType) => {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger className="w-full">{trigger}</CollapsibleTrigger>
      <CollapsibleContent className="-mt-4 w-full rounded-b-lg bg-light-100 p-3 pt-[28px]">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

export { CollapseBlock, Collapsible, CollapsibleContent, CollapsibleTrigger };
