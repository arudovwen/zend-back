"use client";
import AppIcon from "@/components/AppIcon";
import React from "react";
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { navigations } from "@/constants";
import CenterModal from "@/components/modals/CenterModal";
import SideModal from "@/components/modals/SideModal";
import SideBar from "./SideBar";
import { toLightMode, toDarkMode } from "@/plugins/Theme";

export default function TopBar() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [isSideOpen, setSideOpen] = useState(false);
  const router = useRouter();
  
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
        <span className="font-semibold text-sm lg:text-base">
          {navigations.find((i: any) => i.url === pathname)?.label}
        </span>
      </span>
      <span className="flex gap-x-4 lg:gap-x-6 dark:gap-x-6 dark:lg:gap-x-8 items-center">
        <span>
          {" "}
          <Switch
            // @ts-ignore
            checked={enabled}
            onChange={setEnabled}
            className="group relative flex items-center h-5 w-10 cursor-pointer rounded-full bg-primary  p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-gray-700/50"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none flex items-center justify-center size-4 -translate-x-[2px] rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-[18px]"
            >
              <AppIcon
                icon="material-symbols:dark-mode"
                iconClass="hidden dark:inline text-secondary text-xs"
              />
              <AppIcon
                icon="material-symbols-light:light-mode"
                iconClass="inline dark:hidden text-primary text-xs"
              />
            </span>
          </Switch>
        </span>
        <span>
          <AppIcon icon="solar:bell-bold-duotone" iconClass="text-xl" />
        </span>
        <span className="text-[#475467] dark:text-white hidden lg:inline-block">
          {" "}
          <Menu>
            <MenuButton className="inline-flex items-center gap-x-3 rounded-md bg-white dark:bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-[#475467] dark:text-white shadow-inner shadow-white/10 focus:outline-none dark:data-[hover]:bg-gray-700  dark:data-[open]:bg-gray-700  dark:data-[focus]:outline-1  dark:data-[focus]:outline-white">
              <span className="flex h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full items-center justify-center text-sm">
                {" "}
                <AppIcon icon="solar:user-bold-duotone" iconClass="text-xl" />
              </span>
              <span>John Snow</span>
              <AppIcon
                icon="humbleicons:chevron-down"
                iconClass="size-4 fill-white/60"
              />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-44 origin-top-right shadow-black mt-1 rounded-lg border border-gray-100 dark:border-gray-600 bg-white dark:bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <span
                  onClick={() => setOpen(true)}
                  className="text-secondary dark:text-white cursor-pointer group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-"
                >
                  Logout
                </span>
              </MenuItem>
            </MenuItems>
          </Menu>
        </span>
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
      <CenterModal setOpen={() => {}} open={isOpen}>
        <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white p-6 rounded-lg">
          <h2 className="font-semibold mb-6">
            Are you sure you want to logout?
          </h2>
          <div className="flex gap-x-4 items-center justify-center text-sm font-medium">
            <button
              className="border border-gray-200 rounded px-5 py-1"
              onClick={() => setOpen(false)}
            >
              No
            </button>
            <button
              onClick={() => router.push("/")}
              className="border border-gray-200 rounded px-5 py-1"
            >
              Yes
            </button>
          </div>
        </div>
      </CenterModal>
      <SideModal setOpen={setSideOpen} open={isSideOpen}>
        <SideBar
          handleLogout={() => {
            setOpen(true);
            setSideOpen(false);
          }}
        />
      </SideModal>
    </nav>
  );
}
