import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";

import Main from "@/components/dashboard/Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Zendwallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        try {
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        } catch (_) {}
      `,
          }}
        />
      </head>
      <body style={{ fontFamily: "ClashGrotesk-Variable" }}>
        <Suspense fallback={<Loading />}>
          <Main>{children}</Main>
        </Suspense>
      </body>
    </html>
  );
}
