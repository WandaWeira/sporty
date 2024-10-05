import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./redux";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import { SessionProvider } from "next-auth/react";
import { Providers } from "@/app/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sporty",
  description: "Sports social media platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen`}
      >
        <StoreProvider>
          <Providers>
            <Header />
            <div className="container mx-auto px-4 py-8 flex">
              <Sidebar />
              <main className="flex-grow mx-8">{children}</main>
              <RightSidebar />
            </div>
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
