"use client";
import { generateClerkTheme } from "@/lib/utils/theme";
import QueryProvider from "@/providers/query-provider";
import { useTheme } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

export default function Providers(props: PropsWithChildren) {
  const { theme } = useTheme();
  return (
    <ClerkProvider appearance={generateClerkTheme(theme === "light")}>
      <QueryProvider>{props.children}</QueryProvider>
    </ClerkProvider>
  );
}
