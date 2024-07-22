"use client";
import React, { useState } from "react";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { OverviewSwapHeader, OverviewTokenHeader } from "@/constants/headers";
import AppTab from "@/components/AppTab";

export default function Transactions() {
  const tabs = [
    { title: "swap transactions", key: "swap" },
    { title: "token transactions", key: "token" },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-secondary dark:text-white font-semibold">
          Recent transactions
        </h2>
        <div className="">
          <button className="flex gap-x-1 items-center font-medium pb-1 text-sm text-primary dark:text-white">
            View all <AppIcon icon="teenyicons:arrow-right-outline" />
          </button>
        </div>
      </div>
      <div>
        <AppTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
      <div>
        <div className=" w-full ">
          <TableCard
            columns={
              activeTab === "swap"
                ? OverviewSwapHeader.filter((i) => i.key !== "action")
                : OverviewTokenHeader.filter((i) => i.key !== "action")
            }
            rows={[]}
          />
        </div>
      </div>
    </div>
  );
}
