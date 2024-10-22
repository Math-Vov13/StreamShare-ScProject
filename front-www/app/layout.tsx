import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
// import { UserProvider } from "@/context/UserContext";

const font = Figtree({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SteamShare",
  description: "Streaming Vidéo de Films et Séries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
