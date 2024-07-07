import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function Layout({ children }: any) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
