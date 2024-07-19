import React from "react";
import TableCard from "@/components/table";
import { CustomerActivitiesHeader } from "@/constants/headers";

export default function Activities() {
  return (
    <div className=" w-full ">
           <h2 className="font-semibold text-sm mb-6">Activity information</h2>
      <TableCard
        columns={CustomerActivitiesHeader.filter((i) => i.key !== "customer")}
        rows={[]}
      />
    </div>
  );
}
