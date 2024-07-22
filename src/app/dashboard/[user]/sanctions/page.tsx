"use client";
import React, { useState } from "react";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import { SanctionHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import AppButton from "@/components/AppButton";
import { useRouter } from "next/navigation";

export default function Activities() {
  const router = useRouter();
  return (
    <section>
      <div className="mb-8">
        <HeaderComponent
          title="Sanction Verification"
          sub="History of customer sanctions and verification"
        />
      </div>
      <div>
        <div className="mb-6 flex justify-between flex-col lg:flex-row gap-y-4 items-center">
          <input
            placeholder="Search name or email"
            className=" border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded md:max-w-[280px] w-full"
          />
          <div className="flex  gap-x-4 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800 text-sm px-[14px] py-[7px] rounded md:min-w-[180px]"
              options={[]}
              placeholder="All customers"
            />
            <AppButton
              text="Sanction list"
              icon="solar:eye-linear"
              iconClass="text-sm"
              type="button"
              btnClass="!bg-primary !border-primary !text-white flex-1 whitespace-nowrap"
              onClick={() => router.push("/dashboard/customers/sanctions/list")}
            />
          </div>
        </div>
        <div className=" w-full ">
          <TableCard columns={SanctionHeader} rows={[]} />
        </div>
      </div>
    </section>
  );
}
