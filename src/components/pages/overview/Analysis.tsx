"use client";
import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { AnalysisTab } from "@/constants";
import GridTab from "@/components/GridTab";

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
            inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
            containerClassName="rounded-lg relative text-sm lg:w-[260px] min-w-[250px] text-secondary z-[20]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:gric-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 w-full">
        {AnalysisTab.map((tab) => (
          <div key={tab.label}>
            <GridTab tab={tab} />
          </div>
        ))}
      </div>{" "}
    </div>
  );
}
