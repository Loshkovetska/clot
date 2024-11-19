import { cn } from "@/lib/utils";
import * as Clerk from "@clerk/elements/common";

const ICON_CLASSNAME = "absolute left-4 size-6";
const ITEM_CLASSNAME =
  "w-full flex items-center px-4 py-3 dark:bg-dark-100 dark:text-white bg-light-100 rounded-[24px] relative justify-center font-medium";

export default function SocialConnect() {
  return (
    <div className="flex flex-col gap-3 w-full mt-[70px]">
      <Clerk.Connection
        name="apple"
        className={cn(ITEM_CLASSNAME, "dark:text-white")}
      >
        <Clerk.Icon
          className={cn(
            ICON_CLASSNAME,
            "dark:saturate-1 dark:invert dark:sepia-0"
          )}
        />{" "}
        Continue With Apple
      </Clerk.Connection>
      <Clerk.Connection
        name="google"
        className={ITEM_CLASSNAME}
      >
        <Clerk.Icon className={ICON_CLASSNAME} /> Continue With Google
      </Clerk.Connection>
      <Clerk.Connection
        name="facebook"
        className={ITEM_CLASSNAME}
      >
        <Clerk.Icon className={ICON_CLASSNAME} /> Continue With Facebook
      </Clerk.Connection>
    </div>
  );
}
