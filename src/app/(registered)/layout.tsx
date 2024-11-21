import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-[1248px] mx-auto">
      {children}
      <Toaster />
    </div>
  );
}
