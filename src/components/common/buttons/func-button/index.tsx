import Link from "next/link";
import { useMemo } from "react";

import { HeartIcon, ShoppingCartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

type FuncButtonPropType = {
  href: string;
  type: "cart" | "fav";
  variant?: "default" | "destructive" | "outline" | "light" | "transparent";
  iconClassName?: string;
  action?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function FuncButton({
  href,
  type,
  variant,
  iconClassName,
  action,
}: FuncButtonPropType) {
  const button = useMemo(
    () => (
      <Button
        size="icon"
        variant={variant}
        onClick={action}
      >
        {type === "cart" && <ShoppingCartIcon className={iconClassName} />}
        {type === "fav" && <HeartIcon className={iconClassName} />}
      </Button>
    ),
    [variant, type, iconClassName, action]
  );

  if (action) return button;
  return <Link href={href}>{button}</Link>;
}
