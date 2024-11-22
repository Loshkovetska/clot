"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { NAVBAR_ITEMS } from "@/components/common/navbar/constants";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 z-[1000] flex w-full items-center justify-between bg-white-100 px-6 py-5">
      {NAVBAR_ITEMS.map((item) => (
        <Link
          href={item.path}
          className="flex items-center justify-center p-2"
          key={item.id}
        >
          {React.cloneElement(item.icon, {
            className: cn(
              "hover:[&>*]:text-primary",
              pathname === item.path
                ? "[&>*]:text-primary"
                : "[&>*]:text-black-50"
            ),
          })}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
