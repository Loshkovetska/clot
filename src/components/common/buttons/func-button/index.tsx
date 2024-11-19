import HeartIcon from "@/components/icons/heart";
import ShoppingCartIcon from "@/components/icons/shop-cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FuncButtonPropType = {
  href: string;
  type: "cart" | "fav";
};

export default function FuncButton({ href, type }: FuncButtonPropType) {
  return (
    <Link href={href}>
      <Button size="icon">
        {type === "cart" && <ShoppingCartIcon />}
        {type === "fav" && <HeartIcon />}
      </Button>
    </Link>
  );
}
