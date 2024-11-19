"use client";
import { generateClerkTheme } from "@/lib/utils/theme";
import { useTheme } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export default function Providers(props: PropsWithChildren) {
  const { theme } = useTheme();
  return (
    <ClerkProvider appearance={generateClerkTheme(theme === "light")}>
      {props.children}
    </ClerkProvider>
  );
}
