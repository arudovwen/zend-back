import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AssetsTab } from "@/constants";
import GridTab from "@/components/GridTab";
import TableCard from "@/components/table";
import AppButton from "@/components/AppButton";
import Select from "@/components/forms/Select";
import { AssetHeader } from "@/constants/headers";
export default function AssetComponent() {
  return (
    <section>
      <div className="mb-6">
        <Breadcrumbs
          links={[
            {
              title: "Assets",
              url: "/dashboard/customers/assets",
            },
            {
              title: "John Snow",
              url: "#",
            },
          ]}
        />
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
            <AppButton text="Suspend wallet" />
          </div>
        </div>
        <TableCard columns={AssetHeader} rows={[]} />
      </div>
    </section>
  );
}
