import { Toaster } from "@/components/ui/toast";
import Providers from "@/providers";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { PropsWithChildren } from "react";
import "./globals.css";

const circularSans = localFont({
  src: [
    {
      path: "./fonts/CircularStd-Black.ttf",
      weight: "900",
    },
    {
      path: "./fonts/CircularStd-Bold.ttf",
      weight: "700",
    },
    {
      path: "./fonts/CircularStd-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/CircularStd-Book.ttf",
      weight: "400",
    },
  ],
});

export const metadata: Metadata = {
  title: "Clot",
  description: "Buy what you want",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className="flex flex-col min-h-full"
    >
      <body
        className={`${circularSans.className} antialiased flex flex-col grow`}
      >
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
