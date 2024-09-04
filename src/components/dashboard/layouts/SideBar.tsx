"use client";
import React, { useContext } from "react";
import { deleteCookie } from "cookies-next";
import { Switch } from "@headlessui/react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { navigations, bottomNavigations } from "@/constants";
import AppIcon from "@/components/AppIcon";
import AppLogo from "@/components/AppLogo";
import AppButton from "@/components/AppButton";
import { toLightMode, toDarkMode } from "@/plugins/Theme";
import CenterModal from "@/components/modals/CenterModal";
import TypeSwitch from "./TypeSwitch";
import { PageContext } from "@/constants/context";
import { getItem } from "@/utils/localStorageControl";
import Image from "next/image";
import { permission } from "process";

export default function SideBar() {
  const { setColormode, permissions } = useContext(PageContext);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openMenus, setopenMenus] = useState<any>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [enabled, setEnabled] = useState<boolean | null>(null);

  const userData = getItem("userData");
  useEffect(() => {
    setEnabled(localStorage.theme === "light" ? false : true);
    setColormode(localStorage.theme);
  }, []);

  useEffect(() => {
    if (enabled === false) {
      toLightMode();
      setColormode("light");
    }

    if (enabled === true) {
      toDarkMode();
      setColormode("dark");
    }
  }, [enabled]);

  function handleSub(value: string) {
    setopenMenus((prev: any[]) =>
      openMenus.includes(value)
        ? prev.filter((menu: any) => menu !== value)
        : [...prev, value]
    );
  }

  function handleLogout() {
    // setLoading(true);
    // logOut()
    //   .then((res: any) => {
    //     if (res.status === 200) {

    deleteCookie("token");
    localStorage.clear();
    sessionStorage.clear();
    window?.location?.replace("/");
    setLoading(false);
    //   }
    // })
    // .catch((err) => {
    //   setLoading(false);
    //   toast.error(err?.response?.data?.message);
    // });
  }

  function handleSubMenus(value: any) {
    return value.filter((i: any) =>
      i?.permissions?.length
        ? i?.permissions?.some((item: any) => permissions.includes(item))
        : i
    );
  }

  useEffect(() => {
    if (!permissions.length) return;
    const tempData: any = navigations
      .filter((i) => i.key !== "dashboard")
      .find((i) => pathname.includes(i.key));
    if (!tempData?.permissions.length) return;
    const canProceed = tempData?.permissions?.some((item: any) => {
      return permissions.includes(item);
    });
    if (!canProceed) router.push("/dashboard");
  }, [pathname, navigations, permissions]);

  return (
    <div className="w-[260px] no-scrollbar flex flex-col gap-y-2 bg-white pb-8 dark:bg-gray-800 lg:border-r border-[#ECECEC] dark:border-gray-500 max-h-full h-screen overflow-y-auto">
      <div className="pt-6 px-[25px] mb-6">
        <AppLogo w={160} />
      </div>
      <div className="flex-1 pb-10">
        <div className="hidden lg:block mb-4 px-[25px]">
          <TypeSwitch />
        </div>
        <ul className="grid gap-y-[4px] px-[25px]">
          {handleSubMenus(navigations).map((nav: any, idx: number) => (
            <li onClick={() => !nav.asSub && router.push(nav.url)} key={idx}>
              <span className="block">
                <span
                  className={`cursor-pointer px-[10px] py-[10px] rounded text-sm  flex gap-x-2 items-center justify-between  ${
                    pathname === nav.url && !nav.asSub
                      ? "bg-primary font-medium "
                      : "font-normal"
                  }`}
                >
                  <span
                    className={`flex flex-col xl:flex-row gap-y-2 gap-x-2 items-center ${
                      pathname === nav.url && !nav.asSub
                        ? "font-medium text-white"
                        : "font-normal text-[#475467] dark:text-white"
                    }`}
                    onClick={() => nav.asSub && handleSub(nav.label)}
                  >
                    <AppIcon
                      icon={nav.icon}
                      iconClass={`text-lg ${
                        pathname === nav.url && !nav.asSub
                          ? "text-white"
                          : "text-[#475467] dark:text-white"
                      }`}
                    />{" "}
                    {nav.label}
                  </span>
                  {nav.asSub && (
                    <span onClick={() => handleSub(nav.label)}>
                      {" "}
                      <AppIcon
                        icon={
                          !openMenus.includes(nav.label)
                            ? "tabler:plus"
                            : "tabler:minus"
                        }
                        iconClass="text-[#475467] dark:text-white"
                      />
                    </span>
                  )}
                </span>
                {nav.asSub && openMenus.includes(nav.label) && (
                  <ul className="grid grid-cols-1 py-2 gap-y-1 overflow-hidden">
                    {handleSubMenus(nav.submenus)?.map((submenu: any) => (
                      <li
                        onClick={() => router.push(submenu.url)}
                        key={submenu.label}
                        className="pl-10 relative"
                      >
                        {
                          <div className="h-[42px] w-[14px] border-l border-b  rounded-bl-lg mb-[16px] absolute left-[18px] bottom-0 border-gray-300 dark:border-gray-500"></div>
                        }
                        <span
                          className={`pl-4 py-[6px] block text-sm cursor-pointer relative ${
                            pathname === submenu.url
                              ? "bg-primary font-medium rounded text-white"
                              : "font-normal text-secondary dark:text-white/80"
                          }`}
                        >
                          {submenu.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className=" px-[25px]">
        <ul className="grid gap-y-[4px] mb-4">
          <li
            className={`cursor-pointer px-[10px] py-[10px] rounded text-sm  flex gap-x-2 items-center justify-between  font-normal text-[#475467] dark:text-white`}
          >
            <span className="flex flex-col xl:flex-row gap-y-2  gap-x-2 items-center text-[#475467] dark:text-white">
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
            onClick={() => setOpen(true)}
            className={`cursor-pointer px-[10px] py-[10px] rounded text-sm  flex gap-x-2 items-center  font-normal text-[#475467] dark:text-white`}
          >
            <AppIcon icon="solar:logout-2-broken" iconClass="text-lg" /> Logout
          </li>
        </ul>

        <div>
          <div className="inline-flex w-full items-center justify-between rounded-lg px-3 py-3 bg-gray-100 border border-gray-50 dark:bg-gray-700 dark:border-gray-500 text-sm/6 font-semibold text-[#475467] dark:text-white shadow-inner shadow-white/10 focus:outline-none dark:data-[hover]:bg-gray-700  dark:data-[open]:bg-gray-700  dark:data-[focus]:outline-1  dark:data-[focus]:outline-white">
            <div className="flex items-center gap-x-3">
              <span className="flex h-9 w-9 bg-gray-200 dark:bg-gray-800 rounded-full items-center justify-center text-sm">
                {" "}
                <Image
                  alt="avatar"
                  src={userData.image || "/ava.png"}
                  width={36}
                  height={36}
                  className="w-full h-full rounded-full object-cover"
                />
              </span>
              <div className="text-left">
                <p className="test-sm block font-medium text-[#475467] dark:text-white">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className="text-xs font-light text-[#475467] dark:text-white capitalize">
                  {userData?.primaryRole}
                </p>
              </div>
            </div>
            {/* <AppIcon
              icon="humbleicons:chevron-down"
              iconClass="size-4 fill-white/60 text-[#475467] dark:text-white"
            /> */}
          </div>
        </div>
      </div>
      <CenterModal setOpen={() => {}} open={isOpen}>
        <div className="bg-white dark:bg-gray-800 text-secondary text-center dark:text-white p-6 rounded-lg min-w-[300px] sm:min-w-[350px]">
          <h2 className="font-semibold text-xl mb-[6px]">Log Out</h2>
          <p className="font-normal text-sm mb-8">
            Are you sure you want to logout?
          </p>
          <div className="flex gap-x-4 items-center justify-center text-sm font-medium">
            <AppButton
              onClick={() => handleLogout()}
              isDisabled={loading}
              isLoading={loading}
              btnClass="!border !border-[#EAECF0] dark:!border-red-400 !rounded !px-3 !py-1 w-full !text-white !font-medium !bg-red-500"
              text="Yes"
            />
            <button
              className="border border-[#EAECF0] dark:!border-gray-600  rounded px-3 py-1 w-full"
              onClick={() => setOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      </CenterModal>
    </div>
  );
}
