import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "~/components/ui/header";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "Public Notes",
  description: "Upload your Notes with Other Users!",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Header />
        <Toaster position="bottom-right" richColors/>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
