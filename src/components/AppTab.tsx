import React, { useState, FC } from "react";
import clsx from "clsx";

interface Tab {
  key: string;
  title: string;
}

interface TabsComponentProps {
  tabs: Tab[];
  className?: string;
  count?: { [key: string]: number };
  setActiveTab: (e: any) => void;
  activeTab: string;
}

const TabsComponent: FC<TabsComponentProps> = ({
  tabs,
  className = "",
  count = {},
  setActiveTab,
  activeTab,
}) => {
  return (
    <div
      className={clsx(
        "flex gap-x-4 mb-8 w-full overflow-x-auto border-b border-[#EAECF0] dark:border-gray-500",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.title}
          onClick={() => setActiveTab(tab.key)}
          className={clsx(
            "capitalize text-xs md:text-sm font-semibold pb-3 border-b-2 px-1 flex items-center gap-x-1",
            {
              "border-primary dark:border-white !text-primary dark:!text-white":
                activeTab === tab.key,
              "border-transparent text-[#667085] dark:!text-white/60":
                activeTab !== tab.key,
            }
          )}
        >
          {tab.title}
          {count[tab.key] && (
            <span className="text-xs h-6 min-w-[24px] rounded-full flex justify-center items-center border border-[#EAECF0] dark:border-gray-500 bg-[#F9FAFB] dark:bg-gray-700 text-[#454745] dark:text-white/80">
              {count[tab.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabsComponent;
