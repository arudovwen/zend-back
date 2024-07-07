"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { navigations } from "@/constants";
import AppIcon from "@/components/AppIcon";
import AppLogo from "@/components/AppLogo";

export default function SideBar({ handleLogout }: any) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-[250px] h-screen bg-white dark:bg-gray-800 lg:border-r border-[#ECECEC] dark:border-gray-400">
      <div className="pt-6 px-[25px] mb-10">
        <AppLogo w={100} />
      </div>
      <ul className="grid gap-y-[4px] px-[25px]">
        {navigations.map((nav: any, idx: number) => (
          <li
            onClick={() => router.push(nav.url)}
            className={`cursor-pointer px-[10px] py-[10px] rounded text-sm  flex gap-x-2 items-center  ${
              pathname === nav.url
                ? "bg-primary font-medium text-white"
                : "font-normal text-[#475467] dark:text-white"
            }`}
            key={idx}
          >
            <AppIcon icon={nav.icon} iconClass="text-lg" /> {nav.label}
          </li>
        ))}
        <li
          onClick={() => handleLogout()}
          className={`lg:hidden cursor-pointer px-[10px] py-[10px] rounded text-sm  flex gap-x-2 items-center  font-normal text-[#475467] dark:text-white`}
        >
          <AppIcon icon="solar:logout-2-broken" iconClass="text-lg" /> Logout
        </li>
      </ul>
    </div>
  );
}
