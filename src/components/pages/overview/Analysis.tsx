"use client"
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import AppIcon from "@/components/AppIcon";
import { AnalysisTab } from "@/constants";
import formatCurrency from "@/utils/formatCurrency"

export default function Analysis() {
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setValue(newValue);
  };

  return (
    <div className="w-full">
      <div className="flex  flex-col lg:flex-row gap-y-4 lg:items-center lg:justify-between mb-4">
        <h2 className="text-secondary dark:text-white font-semibold">
          Service Analytics
        </h2>
        <div className="relative">
          <Datepicker
            showShortcuts
            useRange={false}
            showFooter
            value={value}
            // @ts-ignore
            onChange={handleValueChange}
            placeholder="Filter dates"
            inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-700 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
            containerClassName="rounded-lg relative text-sm lg:w-[260px] min-w-[250px] text-secondary z-[99]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:gric-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 w-full">
        {AnalysisTab.map((tab) => (
          <div
            key={tab.label}
            className="px-6 py-5 rounded-lg bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex gap-x-3 items-center shadow-sm"
          >
            <span className="h-14 w-14 rounded flex items-center justify-center border border-gray-100 dark:border-gray-600 ">
              <AppIcon
                icon={tab.icon}
                iconClass="text-3xl text-[#475467] dark:text-white"
              />
            </span>
            <span className="block">
              <span className="block leading-tight text-[#475467] dark:text-white text-sm font-normal mb-1">
                {tab.label}
              </span>
              <span className="block leading-tight text-[#475467] dark:text-white text-2xl font-semibold">
                {formatCurrency(120000)}
              </span>
            </span>
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
