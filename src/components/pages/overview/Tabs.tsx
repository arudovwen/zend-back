import React from "react";
import AppIcon from "@/components/AppIcon";
import { OverviewTabs } from "@/constants";

export default function Tabs() {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
      {OverviewTabs.map((tab) => (
        <div
          key={tab.label}
          className="px-6 py-5 rounded-lg bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex gap-x-3 items-center shadow-sm"
        >
          <span className="h-14 w-14 rounded flex items-center justify-center border border-gray-100 dark:border-gray-600 ">
            <AppIcon icon={tab.icon} iconClass="text-3xl text-[#475467] dark:text-white" />
          </span>
          <span className="block">
            <span className="block leading-tight text-[#475467] dark:text-white text-sm font-normal mb-1">
              {tab.label}
            </span>
            <span className="block leading-tight text-[#475467] dark:text-white text-2xl font-semibold">
              120
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
