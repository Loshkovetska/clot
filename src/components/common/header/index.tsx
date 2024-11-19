"use client";
import FuncButton from "@/components/common/buttons/func-button";
import HeaderUser from "@/components/common/header/header-user";
import { ROUTES } from "@/lib/constants/routes";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type HeaderPropType = {
  title?: string;
  showUser?: boolean;
  funcButton?: {
    href: string;
    type: "cart" | "fav";
  };
};

export default function Header({
  title,
  showUser,
  funcButton,
}: HeaderPropType) {
  const user = useUser();

  if (!user.isSignedIn && showUser) return redirect(ROUTES.signIn);

  return (
    <header className="w-full flex items-center justify-between py-4 px-5 fixed insets-0 bg-white">
      {showUser && <HeaderUser imageUrl={user?.user?.imageUrl} />}
      <span className="text-2xl">{title}</span>
      {funcButton && (
        <FuncButton
          href={funcButton?.href}
          type={funcButton?.type}
        />
      )}
    </header>
  );
}
