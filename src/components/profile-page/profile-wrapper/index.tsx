import { PropsWithChildren } from "react";

import Header from "@/components/common/header";

export default function ProfileWrapper({
  title,
  children,
}: { title: string } & PropsWithChildren) {
  return (
    <>
      <Header title={title} />
      <div className="flex w-full grow flex-col gap-4 pt-4">{children}</div>
    </>
  );
}
