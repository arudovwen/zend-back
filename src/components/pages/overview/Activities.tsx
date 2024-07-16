import React from "react";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import {
  AdminActivitiesHeader,
  CustomerActivitiesHeader,
} from "@/constants/headers";

export default function Activities() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 lg:gap-x-8 w-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-secondary dark:text-white font-semibold">
            Customer activities
          </h2>
          <div className="">
            <button className="flex gap-x-1 items-center font-medium pb-1 text-sm text-primary dark:text-white">
              View all <AppIcon icon="teenyicons:arrow-right-outline" />
            </button>
          </div>
        </div>
        <div className=" w-full shadow-sm">
          <TableCard columns={CustomerActivitiesHeader} rows={[]} />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-secondary dark:text-white font-semibold">
            Admin activities
          </h2>
          <div className="">
            <button className="flex gap-x-1 items-center font-medium pb-1 text-sm text-primary dark:text-white">
              View all <AppIcon icon="teenyicons:arrow-right-outline" />
            </button>
          </div>
        </div>
        <div className=" w-full shadow-sm">
          <TableCard columns={AdminActivitiesHeader} rows={[]} />
        </div>
      </div>
    </div>
  );
}
