import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jules Kim - Developer",
  description: "Jules Kim, independent developer building expressive digital experiences.",
  themeColor: "#101112",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
