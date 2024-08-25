"use client";
import Image from "next/image";
import Login from "@/components/login";
import { updateTheme } from "@/plugins/Theme";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    updateTheme();
  }, []);

  return (
    <main className="flex h-screen w-screen bg-gray-100 dark:bg-gray-800 flex-col items-center justify-between p-24  bg-no-repeat bg-bottom">
      <div className="mt-10">
        <div className="mb-6 flex items-center">
          {" "}
          <Image
            alt="logo"
            src="/zendicon.png"
            width={80}
            height={80}
            className="h-auto block mx-auto"
            priority
          />
         
        </div>
        <div className="w-full md:w-[500px] max-w-[500px] p-6 rounded-xl bg-white dark:bg-gray-700 mt-2">
          <Login />
        </div>
      </div>
    </main>
  );
}
