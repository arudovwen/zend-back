"use client";
import React from "react";
import Image from "next/image";
import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { navigations, bottomNavigations } from "@/constants";
import AppIcon from "@/components/AppIcon";
import AppLogo from "@/components/AppLogo";
import { toLightMode, toDarkMode } from "@/plugins/Theme";

export default function SideBar({ handleLogout }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [enabled, setEnabled] = useState<boolean | null>(null);

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
  return (
    <div className="w-[280px] flex flex-col gap-y-2 h-full bg-white pb-8 dark:bg-gray-800 lg:border-r border-[#ECECEC] dark:border-gray-400">
      <div className="pt-6 px-[25px] mb-10">
        <AppLogo w={100} />
      </div>
      <div className="flex-1 flex flex-col justify-between gap-y-10 pb-6">
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
        </ul>
      </div>
      <div className=" px-[25px]">
        <ul className="grid gap-y-[4px] mb-4">
          <li
            className={`cursor-pointer px-[10px] py-[10px] rounded text-sm  flex gap-x-2 items-center justify-between  font-normal text-[#475467] dark:text-white`}
          >
            <span className="flex gap-x-2 items-center text-[#475467] dark:text-white">
              <AppIcon
                icon="material-symbols:dark-mode"
                iconClass="inline dark:hidden text-lg"
              />
              <AppIcon
                icon="material-symbols-light:light-mode"
                iconClass="hidden dark:inline  text-lg"
              />{" "}
              {enabled ? "Light" : "Dark"} mode
            </span>
            <span>
              {" "}
              <Switch
                // @ts-ignore
                checked={enabled}
                onChange={setEnabled}
                className="group relative flex items-center h-4 w-9 cursor-pointer rounded-full bg-primary  p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-gray-700/50"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none flex items-center justify-center size-3 -translate-x-[2px] rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-[18px]"
                />
              </Switch>
            </span>
          </li>
          {bottomNavigations.map((nav: any, idx: number) => (
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
            className={`cursor-pointer px-[10px] py-[10px] rounded text-sm  flex gap-x-2 items-center  font-normal text-[#475467] dark:text-white`}
          >
            <AppIcon icon="solar:logout-2-broken" iconClass="text-lg" /> Logout
          </li>
        </ul>

        <Menu>
          <MenuButton className="inline-flex w-full items-center justify-between rounded-lg px-3 py-3 bg-gray-100 border border-gray-50 dark:bg-gray-800 text-sm/6 font-semibold text-[#475467] dark:text-white shadow-inner shadow-white/10 focus:outline-none dark:data-[hover]:bg-gray-700  dark:data-[open]:bg-gray-700  dark:data-[focus]:outline-1  dark:data-[focus]:outline-white">
            <div className="flex items-center gap-x-3">
            <span className="flex h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-lg items-center justify-center text-sm">
              {" "}
              <AppIcon icon="solar:user-bold-duotone" iconClass="text-xl text-[#475467] dark:text-white" />
            </span>
            <div>
              <p className="test-sm block font-medium text-[#475467] dark:text-white">John Snow</p>
              <p className="text-xs font-light text-[#475467] dark:text-white">Administrator</p>
            </div>
            </div>
            <AppIcon
              icon="humbleicons:chevron-down"
              iconClass="size-4 fill-white/60 text-[#475467] dark:text-white"
            />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-44 origin-top-right shadow-black mt-1 rounded-lg border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem>
              <span className="text-secondary dark:text-white cursor-pointer group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-">
                Logout
              </span>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
