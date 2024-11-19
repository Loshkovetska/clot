"use client";
import HeaderUser from "@/components/common/header/header-user";
import ShoppingCartIcon from "@/components/icons/shop-cart";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Header() {
  const user = useUser();

  if (!user.isSignedIn) return redirect(ROUTES.signIn);

  return (
    <header className="w-full flex items-center justify-between py-4 px-5 fixed insets-0">
      <HeaderUser imageUrl={user?.user?.imageUrl} />
      <span className="text-2xl">Clot</span>
      <Button size="icon">
        <ShoppingCartIcon />
      </Button>
    </header>
  );
}
