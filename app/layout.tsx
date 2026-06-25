import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swahiba - Your Swahili AI Assistant",
  description: "Chat naturally in Swahili, English, or Kiswaenglish with Swahiba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="kitenge-bg min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}