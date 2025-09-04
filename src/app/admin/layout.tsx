import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mon-portfolio.com"),
  title: {
    default: "Portfolio | Développeur Web Fullstack",
    template: "%s | Portfolio",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        layout admin
        {children}
      </body>
    </html>
  );
}
