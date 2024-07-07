import React, { useState, FC } from 'react';
import clsx from 'clsx';

interface Tab {
  key: string;
  title: string;
}

interface TabsComponentProps {
  tabs: Tab[];
  className?: string;
  count?: { [key: string]: number };
}

const TabsComponent: FC<TabsComponentProps> = ({ tabs, className = '', count = {} }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className={clsx("flex gap-x-4 mb-8 w-full overflow-x-auto border-b border-[#EAECF0]", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.title}
          onClick={() => setActiveTab(tab.key)}
          className={clsx(
            "capitalize text-xs md:text-sm font-semibold pb-3 border-b-2 px-1 flex items-center gap-x-1",
            {
              'border-primary-500 text-primary-500': activeTab === tab.key,
              'border-transparent text-[#667085]': activeTab !== tab.key,
            }
          )}
        >
          <span>{tab.title}</span>
          {count[tab.key] && (
            <span className="text-xs h-6 min-w-[24px] rounded-full flex justify-center items-center border border-[#EAECF0] bg-[#F9FAFB] text-[#454745]">
              {count[tab.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TabsComponent;
