import React from "react";
import TableCard from "@/components/table";
import { KycHeader } from "@/constants/headers";

export default function KYC() {
  return (
    <div className=" w-full ">
         <h2 className="font-semibold text-sm mb-6">KYC information</h2>
      <TableCard
        columns={KycHeader.filter((i) => i.key !== "customer")}
        rows={[]}
      />
    </div>
  );
}
