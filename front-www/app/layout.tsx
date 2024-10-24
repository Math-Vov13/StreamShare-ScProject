import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";


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
        <UserProvider>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </UserProvider>
      </body>
    </html>
  );
}
