import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex grow flex-col gap-6 px-6 pb-[140px] pt-16">
      {children}
    </div>
  );
}
