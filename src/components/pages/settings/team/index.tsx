"use client";
import React, { useState } from "react";
import AppSideTab from "@/components/AppSideTab";
import AppTab from "@/components/AppTab";
import Pending from "./pending";
import Active from "./active";
export default function Team() {
  const Navigations = [
    {
      title: "Active",
      key: "active",
      sub: "List of active team members",
    },
    {
      title: "Pending",
      sub: "List of pending team requests",
      key: "pending",
    },
  ];
  const [selected, setSelected] = useState("active");
  return (
    <div className="max-w-[1024px]">
      <div className="flex flex-col xl:flex-row gap-x-10 py-4">
        <div className="w-auto lg:w-full sm:max-w-[230px] ">
          <div className="hidden xl:inline-block overflow-hidden bg-white dark:bg-gray-700 rounded-lg border border-gray-100    dark:border-gray-600 w-full">
            <AppSideTab
              options={Navigations}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
          <div className="xl:hidden">
            <AppTab
              tabs={Navigations}
              setActiveTab={setSelected}
              activeTab={selected}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="max-w-[1024px] pb-10">
            {selected === "pending" && <Pending />}
            {selected === "active" && <Active />}
          </div>
        </div>
      </div>
    </div>
  );
}
