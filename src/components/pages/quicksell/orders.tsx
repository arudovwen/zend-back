"use client";
import React, { useState } from "react";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { QuickSellOrdersTab } from "@/constants";
import Select from "@/components/forms/Select";
import { QuickSellOrderHeader } from "@/constants/headers";
import GridTab from "@/components/GridTab";

export default function OrdersComponent() {
  return (
    <section>
      <div className="mb-10">
        <HeaderComponent title="Orders" sub="List of quicksell orders" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4  w-full mb-10">
        {QuickSellOrdersTab.map((tab) => (
          <div key={tab.label}>
            <GridTab
              tab={tab}
              iconClass="!text-2xl"
              borderClass="!h-10  !w-10"
              labelClass="!text-xs"
              numClass="!text-xl"
            />
          </div>
        ))}
      </div>{" "}
      <div className=" w-full ">
        <div className="mb-4 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <div></div>
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px]"
              options={[]}
              placeholder="Select status"
            />
       
          </div>
        </div>
        <TableCard columns={QuickSellOrderHeader} rows={[]} />
      </div>
    </section>
  );
}
