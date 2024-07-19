"use client";
import AppIcon from "@/components/AppIcon";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navigations } from "@/constants";
import SideModal from "@/components/modals/SideModal";
import SideBar from "./SideBar";
import { toLightMode, toDarkMode } from "@/plugins/Theme";
import Search from "./Search"
import Announcement from "./Announcement"

export default function TopBar() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isSideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.theme === "light" ? false : true);
  }, []);

  useEffect(() => {
    if (enabled === false) {
      toLightMode();
    }
    if (enabled === true) {
      toDarkMode();
    }
  }, [enabled]);
  useEffect(() => {
    setSideOpen(false)
  }, [pathname]);
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-[#EDEFEB] dark:border-gray-600 text-[#475467] dark:text-white px-6 py-4 lg:py-3 flex justify-between items-center">
      <span className="flex items-center gap-x-2">
        <Image
          alt="icon"
          src="/icon.png"
          priority
          width={40}
          height={40}
          className="
        lg:hidden"
        />
        <span className="font-semibold text-sm lg:text-base lg:hidden">
          {navigations.find((i: any) => i.url === pathname)?.label}
        </span>
        <span className="text-sm font-medium hidden lg:flex gap-x-2 items-center"><span className="">BTC - $61,000</span> <AppIcon icon="heroicons:slash-20-solid" /> <span className="">ETH - $61,000</span> <span className="text-[11px] font-light ">as at June 1, 2024</span></span>
      </span>
      <span className="flex gap-x-4 lg:gap-x-6 dark:gap-x-6 dark:lg:gap-x-8 items-center">
       
        {/* <span>
          <AppIcon icon="solar:bell-bold-duotone" iconClass="text-xl" />
        </span> */}
        <span className="text-[#475467] dark:text-white hidden lg:inline-block">
          {" "}
        </span>
        <span className="hidden lg:inline"><Search /></span>
        <span><Announcement /></span>

        <span className="lg:hidden" onClick={() => setSideOpen(true)}>
          <AppIcon
            icon={
              isSideOpen
                ? "line-md:menu-to-close-alt-transition"
                : "line-md:close-to-menu-alt-transition"
            }
            iconClass="text-xl"
          />
        </span>
  
      </span>
      <SideModal setOpen={setSideOpen} open={isSideOpen}>
        <SideBar
        />
      </SideModal>
    </nav>
  );
}
