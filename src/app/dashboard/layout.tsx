import SideBar from "@/components/dashboard/layouts/SideBar";
import TopBar from "@/components/dashboard/layouts/TopBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={inter.className}>
        <section className="flex">
          <aside className="hidden lg:inline-block">
            <SideBar />
          </aside>
          <main className="flex-1 flex flex-col bg-[#fafbfe] dark:bg-gray-600 h-screen overflow-y-auto">
            <TopBar />
            <div className="px-5 pt-5 pb-5 flex-1  ">
              <div className="bg-white dark:bg-gray-700 rounded-lg border border-[#EDEFEB] dark:border-gray-600">
                {children}
              </div>
            </div>
          </main>
        </section>
      </body>
    </html>
  );
}
