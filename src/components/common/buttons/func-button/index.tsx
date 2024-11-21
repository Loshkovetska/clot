import { HeartIcon, ShoppingCartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FuncButtonPropType = {
  href: string;
  type: "cart" | "fav";
  variant?: "default" | "destructive" | "outline" | "light" | "transparent";
};

export default function FuncButton({
  href,
  type,
  variant,
}: FuncButtonPropType) {
  return (
    <Link href={href}>
      <Button
        size="icon"
        variant={variant}
      >
        {type === "cart" && <ShoppingCartIcon />}
        {type === "fav" && <HeartIcon />}
      </Button>
    </Link>
  );
}
