import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConsentModal from "./components/ConsentModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swahiba",
  description: "Akili Unde Ya Kiswahili",
  icons: {
    icon: "/assets/rubber-duck.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ConsentModal />
      </body>
    </html>
  );
}