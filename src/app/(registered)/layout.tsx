import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return <div className="w-full max-w-[1248px] mx-auto">{children}</div>;
}
