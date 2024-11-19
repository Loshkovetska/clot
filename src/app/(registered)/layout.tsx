import Header from "@/components/common/header";
import NavBar from "@/components/common/navbar";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header
        showUser
        funcButton={{ type: "cart", href: "/cart" }}
        title="Clot"
      />
      <div className="w-full max-w-[1248px] mx-auto">{children}</div>
      <NavBar />
    </>
  );
}
