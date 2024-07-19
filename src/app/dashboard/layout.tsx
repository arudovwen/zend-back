import SideBar from "@/components/dashboard/layouts/SideBar";
import TopBar from "@/components/dashboard/layouts/TopBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";

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
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          {" "}
          <section className="flex">
            <aside className="hidden lg:inline-block">
              <SideBar />
            </aside>
            <main className="flex-1 flex flex-col bg-[#fafbfe] dark:bg-gray-600 h-screen overflow-y-auto overflow-x-hidden">
              <TopBar />
              <div className="px-5 pt-5 pb-5 flex-1  ">
                <div className=" rounded-lg">{children}</div>
              </div>
            </main>
          </section>
        </Suspense>
      </body>
    </html>
  );
}
