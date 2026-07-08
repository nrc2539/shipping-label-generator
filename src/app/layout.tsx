import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";
import { cn } from "@/libs/utils";

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shipping Label Generator",
  description: "Generate shipping labels with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn('h-full antialiased', sarabun.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
