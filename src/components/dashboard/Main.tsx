"use client";
import SideBar from "@/components/dashboard/layouts/SideBar";
import TopBar from "@/components/dashboard/layouts/TopBar";
import { useState, useMemo } from "react";
import { PageContext } from "@/constants/context";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [colormode, setColormode] = useState<"light" | "dark">("light");

  const value = useMemo(() => {
    return {
      setColormode,
      colormode,
    };
  }, [setColormode, colormode]);

  return (
    <PageContext.Provider value={value}>
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
    </PageContext.Provider>
  );
}
