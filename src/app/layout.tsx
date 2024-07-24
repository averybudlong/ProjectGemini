// app/layout.tsx
import type { Metadata } from "next";
import {
  Inter,
  Open_Sans,
  Roboto_Slab,
  Inconsolata,
  Cutive,
} from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });
const cutive = Cutive({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Common Data Set Information",
  description: "Search and view college Common Data Set information",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        style={{ backgroundColor: "hsl(var(--main-background))" }}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
