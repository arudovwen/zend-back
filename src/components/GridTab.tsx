"use client";
import React from "react";
import AppIcon from "@/components/AppIcon";
import formatCurrency from "@/utils/formatCurrency";

export default function GridTab({
  tab,
  iconClass = "",
  borderClass = "",
  labelClass = "",
  numClass = "",
  value = 0,
  isVerification = false,
}: any) {

  return (
    <div className="px-6 py-5 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 flex gap-x-3 items-center ">
      <span
        className={`${borderClass} h-14 w-14 rounded flex items-center justify-center border border-gray-100 dark:border-gray-600`}
      >
        <AppIcon
          icon={tab.icon}
          iconClass={`${iconClass} text-3xl text-[#475467] dark:text-white`}
        />
      </span>
      <span className="block">
        <span
          className={`${labelClass} block leading-tight text-[#475467] dark:text-white text-sm font-normal mb-1`}
        >
          {tab.label}
        </span>
        <span
          className={`${numClass} block leading-tight text-[#475467] dark:text-white text-2xl font-semibold`}
        >
          {!isVerification ? value : value?.total}
        </span>
      </span>
    </div>
  );
}
