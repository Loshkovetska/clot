import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return <div className="mx-auto w-full max-w-[1248px]">{children}</div>;
}
