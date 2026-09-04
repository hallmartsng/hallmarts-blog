import type { Metadata } from "next";
import "./globals.css";
import { fontSans } from "@/config/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hallmart blog",
  description:
    "Discover Hallmarts, the campus marketplace built for students to learn, earn and grow businesses. Learn how Hallmarts works and what you'll find on our blog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <main className="min-h-screen ">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
