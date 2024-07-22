"use client";
import React, { useState } from "react";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { AssetsTab } from "@/constants";
import Select from "@/components/forms/Select";
import { AssetsHeader } from "@/constants/headers";
import GridTab from "@/components/GridTab";

export default function AssetsComponent() {
  const tabs = [
    { title: "swap transactions", key: "swap" },
    { title: "token transactions", key: "token" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <section>
      <div className="mb-8">
        <HeaderComponent title="Assets" sub="List of customers assets" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6  w-full mb-10">
        {AssetsTab.map((tab) => (
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
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={[]}
              placeholder="Select customer"
            />
          </div>
        </div>
        <TableCard columns={AssetsHeader} rows={[]} />
      </div>
    </section>
  );
}
