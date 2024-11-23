import { PropsWithChildren } from "react";

import Header from "@/components/common/header";

export default function ProfileWrapper({
  title,
  children,
}: { title: string } & PropsWithChildren) {
  return (
    <>
      <Header title={title} />
      <div className="w-full pt-4">{children}</div>
    </>
  );
}
