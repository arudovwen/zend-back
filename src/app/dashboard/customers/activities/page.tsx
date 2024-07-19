"use client";
import React, { useState } from "react";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import { ActivitiesHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import { StatusOptions, GenderOptions } from "@/constants";
import Datepicker from "react-tailwindcss-datepicker";

export default function Activities() {
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
    <section>
      <div className="mb-8">
        <HeaderComponent
          title="Activities"
          sub="History of customer activities"
        />
      </div>
      <div>
        <div className="mb-4 flex justify-between items-center">
          <input
            placeholder="Search name or email"
            className=" border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded max-w-[280px] w-full"
          />
          <div className="flex gap-x-4 items-center">
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800 text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={[]}
              placeholder="Activity type"
            />
            <Datepicker
              showShortcuts
              useRange={false}
              showFooter
              value={value}
              // @ts-ignore
              onChange={handleValueChange}
              placeholder="Filter dates"
              inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
              containerClassName="rounded-lg relative text-sm lg:w-[260px] min-w-[250px] text-secondary z-[99]"
            />
          </div>
        </div>
        <div className=" w-full ">
          <TableCard columns={ActivitiesHeader} rows={[]} />
        </div>
      </div>
    </section>
  );
}
