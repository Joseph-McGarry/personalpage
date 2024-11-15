import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joseph McGarry" as string,
  description: "Software Engineer" as string
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        {/* Standard Favicon for Desktop Browsers */}
        <link rel="icon" href="/images/icon.ico" sizes="any" />
  
        {/* PNG Favicon for Modern Browsers */}
        <link rel="icon" href="/images/icon.png" type="image/png" sizes="32x32" />
  
        {/* Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" href="/images/icon.png" sizes="180x180" />
  
        {/* Android and Larger PNG Icons */}
        <link rel="icon" href="/images/icon.png" sizes="192x192" />
        <link rel="icon" href="/images/icon.png" sizes="512x512" />
  
        {/* Optional: Safari Pinned Tab (using the same icon if SVG isn't available) */}
        <link rel="mask-icon" href="/images/icon.svg" color="#000000" />
  
        {/* Additional Apple Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );  
}