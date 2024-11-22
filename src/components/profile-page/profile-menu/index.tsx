import Link from "next/link";

import { ChevronLeftIcon } from "@/components/icons";
import { PROFILE_MENU } from "@/lib/constants/routes";

export default function ProfileMenu() {
  return (
    <div className="flex w-full flex-col gap-2">
      {PROFILE_MENU.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          className="flex w-full items-center justify-between gap-4 rounded-lg bg-light-100 px-3 py-4 text-md"
        >
          {item.title}
          <ChevronLeftIcon className="rotate-180" />
        </Link>
      ))}
    </div>
  );
}
