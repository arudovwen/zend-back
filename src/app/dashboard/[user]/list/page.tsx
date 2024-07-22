"use client";
import React from "react";
import HeaderComponent from "@/components/HeaderComponent";
import Select from "@/components/forms/Select";
import TableCard from "@/components/table";
import { CustomerListHeader } from "@/constants/headers";
import { StatusOptions, GenderOptions } from "@/constants";
import { useParams } from "next/navigation";

export default function List() {
  const params = useParams();
  const { user } = params

  return (
    <section>
      <div className="mb-8">
        <HeaderComponent title={user} sub={`List of ${user}`} />
      </div>
      <div>
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
            placeholder="Search name or email"
            className=" border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-4 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px] w-full"
              options={[]}
              placeholder="Select token"
            />
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={StatusOptions}
              placeholder="Select Status"
            />
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={GenderOptions}
              placeholder="Select Gender"
            />
          </div>
        </div>
        <div className=" w-full ">
          <TableCard columns={CustomerListHeader} rows={[]} />
        </div>
      </div>
    </section>
  );
}
