import React from "react";
import GridTab from "@/components/GridTab";
import { OverviewTabs } from "@/constants";

export default function Tabs() {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
      {OverviewTabs.map((tab) => (
        <div key={tab.label}>
          <GridTab tab={tab}/>
        </div>
      ))}
    </div>
  );
}
