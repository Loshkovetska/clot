import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto flex w-full max-w-[1248px] grow flex-col">
      {children}
    </div>
  );
}
