import React from "react";
import TableCard from "@/components/table";
import { RoleHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import AppButton from "@/components/AppButton";

export default function Pending() {
  return (
    <div className="max-w-[946px] mx-auto">
      <div className="mb-6 flex justify-between flex-col lg:flex-row gap-y-4 items-center">
        <input
          placeholder="Search role"
          className=" border border-[#EAECF0] dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded md:max-w-[280px] w-full"
        />
        <div className="flex  gap-x-4 items-center w-full lg:w-auto">
          <AppButton
            text="Add role"
            icon="ph:plus-bold"
            iconClass="text-sm"
            type="button"
            btnClass="!bg-primary !border-primary !text-white flex-1 whitespace-nowrap"
          />
        </div>
      </div>
      <div className=" w-full ">
        <TableCard columns={RoleHeader} rows={[]} />
      </div>
    </div>
  );
}
