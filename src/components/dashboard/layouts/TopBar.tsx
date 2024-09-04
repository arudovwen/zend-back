"use client";
import Marquee from "react-fast-marquee";
import AppIcon from "@/components/AppIcon";
import React, { useContext } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { DefaultCurrency, navigations } from "@/constants";
import SideModal from "@/components/modals/SideModal";
import SideBar from "./SideBar";
import { toLightMode, toDarkMode } from "@/plugins/Theme";
import Search from "./Search";
import Announcement from "./Announcement";
import { socket } from "@/constants/socket";
import { PageContext } from "@/constants/context";

export default function TopBar() {
  const pathname = usePathname();
  const { permissions } = useContext(PageContext);
  // console.log("🚀 ~ TopBar ~ permissions:", permissions);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isSideOpen, setSideOpen] = useState(false);
  const formattedData = useRef<any>(DefaultCurrency);
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
    setSideOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleRates = (data: string) => {
      const res = JSON.parse(data);
      const tempData = res.reduce((acc: any, item: any) => {
        acc[item.currency] = {
          currency: item.currency,
          currentPrice: item.currentPrice,
          percentagePrice: item.percentagePrice,
          percentageChange: item.percentageChange,
        };
        return acc;
      }, {});
      formattedData.current = Object.values(tempData);
    };

    socket.emit("rates");
    socket.on("rates", handleRates);

    return () => {
      socket.off("rates", handleRates);
    };
  }, []);
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
        <span className="text-sm font-medium hidden lg:flex gap-x-10 items-center max-w-[300px]">
          <Marquee pauseOnHover speed={30}>
            <span className="flex gap-x-3 items-center">
              {formattedData.current?.map((i: any) => (
                <span key={i?.currency} className="flex gap-x-3 items-center">
                  <span className="uppercase">
                    {i?.currency} - ${i?.currentPrice}
                  </span>{" "}
                  <AppIcon icon="pepicons-pencil:line-y" />
                </span>
              ))}
            </span>
          </Marquee>
        </span>
      </span>
      <span className="flex gap-x-4 lg:gap-x-6 dark:gap-x-6 dark:lg:gap-x-8 items-center">
        {/* <span>
          <AppIcon icon="solar:bell-bold-duotone" iconClass="text-xl" />
        </span> */}
        <span className="text-[#475467] dark:text-white hidden lg:inline-block">
          {" "}
        </span>
        <span className="hidden lg:inline">
          <Search />
        </span>
        {permissions.includes("accounts.broadcast") && (
          <span>
            <Announcement />
          </span>
        )}
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
        <SideBar />
      </SideModal>
    </nav>
  );
}
