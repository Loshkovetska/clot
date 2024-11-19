"use client";
import { NAVBAR_ITEMS } from "@/components/common/navbar/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="w-full fixed z-[1000] bg-white-100 bottom-0 left-0 py-5 px-6 flex items-center justify-between">
      {NAVBAR_ITEMS.map((item) => (
        <Link
          href={item.path}
          className={cn(
            "flex items-center justify-center p-2 hover:text-primary",
            pathname === item.path ? "text-primary" : "text-black-50"
          )}
          key={item.id}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
