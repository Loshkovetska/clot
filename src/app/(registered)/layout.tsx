import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto w-full max-w-[1248px]">
      {children}
      <Toaster />
    </div>
  );
}
