/* eslint-disable react/jsx-no-undef */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AssetsTab, StatusOptions } from "@/constants";
import GridTab from "@/components/GridTab";
import TableCard from "@/components/table";
import AppButton from "@/components/AppButton";
import Select from "@/components/forms/Select";
import { AssetsHeader } from "@/constants/headers";
import AppIcon from "@/components/AppIcon";
import AppStatusComponent from "@/components/AppStatusComponent";
import MenuSelect from "@/components/forms/MenuSelect";

import { getWallets } from "@/services/walletservice";
import { ucFirst } from "@/utils/methods";

import { useRouter } from "next/navigation";
import HeaderComponent from "@/components/HeaderComponent";
import debounce from "debounce";

const Options = [
  {
    label: "View",
    value: "view",
  },
  {
    label: "Suspend wallet",
    value: "suspend",
  },
];

export default function AssetComponent() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({
    user: "",
    page: 1,
    count: 15,
    total: 0,
    status
  });
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getWallets({
        ...queryParams,
        limit: queryParams.count,
      });

      if (res.status === 200) {
        const detail = res.data?.wallets?.map((i: any) => ({
          ...i,
          name: (
            <span className="flex gap-x-[10px] items-center">
              <span className="block">
                <span className="block font-medium text-sm">
                  {ucFirst(i?.user?.firstName)} {ucFirst(i?.user?.lastName)}
                </span>
              </span>
            </span>
          ),
          email: i?.user?.emailAddress,
          id: i?.user?.id,
          coins: 16,
          status: (
            <AppStatusComponent
              status={!i?.withdrawal?.enabled ? "banned" : "active"}
            />
          ),
          action: (
            <MenuSelect
              label={<AppIcon icon="uil:ellipsis-v" />}
              options={Options}
              handleSelected={(val: string) =>
                handleSelected(val, {
                  ...i,
                  name: ` ${ucFirst(i?.user?.firstName)} ${ucFirst(
                    i?.user?.lastName
                  )}`,
                  id: i?.user?.id,
                })
              }
            />
          ),
        }));

        setRows(detail);

        setQueryParams({
          ...queryParams,
          total: res.data?.totalWallets,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  function handleSelected(value: string, data: any) {
    switch (value) {
      case "view":
        router.push(
          `/dashboard/assets/${data.id}?name=${encodeURIComponent(data?.name)}`
        );
        break;
      case "suspend":
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    fetchData();
  }, [
    queryParams.page,
    queryParams.count,
    queryParams.user,
    queryParams.status,
  ]);
  function handleSearch(val: any) {
    setQueryParams({
      ...queryParams,
      user: val,
    });
  }
  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 800),
    []
  );
  function handleStatus(val: any) {
    setQueryParams({
      ...queryParams,
      status: val.value,
    });
  }
  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title="Assets"
          sub="Manage customers assets on zendwallet"
        />
      </div>
      <div className=" w-full ">
        <div className="mb-4 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <div>
            {" "}
            <input
              placeholder="Search name or email"
              onChange={(e) => debouncedSearch(e.target.value)}
              className=" border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded w-full lg:w-[280px] "
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={StatusOptions.filter(
                (i) => i.value !== "deleted" && i.value !== "locked"
              )}
              placeholder="Select Status"
              onChange={(val: any) => handleStatus(val)}
            />
            <AppButton text="Suspend wallets" />
          </div>
        </div>
        <TableCard
          columns={AssetsHeader}
          rows={rows}
          isLoading={loading}
          queryParams={queryParams}
          setQueryParams={(data: any) => setQueryParams(data)}
        />
      </div>
    </section>
  );
}
