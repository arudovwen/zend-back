"use client";
import React, { useState, useEffect } from "react";
import HeaderComponent from "@/components/HeaderComponent";
import Select from "@/components/forms/Select";
import TableCard from "@/components/table";
import { AdministratorHeader, CustomerListHeader } from "@/constants/headers";
import { StatusOptions, GenderOptions } from "@/constants";
import { useParams } from "next/navigation";
import moment from "moment";
import { ucFirst } from "@/utils/methods";
import { getAllUsers, getAllAdmin } from "@/services/userservice";
import AppStatusComponent from "@/components/AppStatusComponent";
import Image from "next/image";
import MenuSelect from "@/components/forms/MenuSelect";
import AppIcon from "@/components/AppIcon";

const Options = [
  {
    label: "View",
    value: "view",
  },
  {
    label: "Ban",
    value: "ban",
  },
  {
    label: "Unban",
    value: "unban",
  },
];
export default function List() {
  const params = useParams();
  const { user } = params;
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [queryParams, setQueryParams] = useState({
    user: "",
    page: 1,
    count: 20,
    type: "",
  });
  const fetchData = async () => {
    setLoading(true);

    try {
      const fetchQuery = user === "customers" ? getAllUsers : getAllAdmin;
      const res = await fetchQuery(queryParams);

      if (res.status === 200) {
        const detail = res.data?.data?.[
          user === "customers" ? "users" : "administrators"
        ]?.map((i: any) => ({
          ...i,
          name: (
            <span className="flex gap-x-[10px] items-center">
              <span>
                <Image
                  width={32}
                  height={32}
                  src={
                    i?.image ||
                    "https://res.cloudinary.com/dxgge3ywq/image/upload/v1676809835/user_images/zendwallet-default-avatar_luqzcv.png"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-lg"
                />
              </span>
              <span className="block">
                <span className="block font-medium text-sm">
                  {ucFirst(i?.firstName)} {ucFirst(i?.lastName)}
                </span>
                <span className="text-xs block">{i?.emailAddress}</span>
              </span>
            </span>
          ),
          username: i?.emailAddress,
          activity: i?.type?.replaceAll("_", " ").toUpperCase(),
          date: moment(i?.createdAt).format("lll"),
          role: ucFirst(i?.primaryRole),
          status: (
            <AppStatusComponent status={i.isBanned ? "banned" : "active"} />
          ),
          action: (
            <MenuSelect
              label={<AppIcon icon="uil:ellipsis-v" />}
              options={Options}
              handleSelected={handleSelected}
            />
          ),
        }));

        setRows(detail);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  function handleSelected(value: string) {
    switch (value) {
      case "view":
        break;
      case "ban":
        break;
      case "unban":
        break;

      default:
        break;
    }
  }
  useEffect(() => {
    fetchData();
  }, [queryParams]);

  return (
    <section>
      <div className="mb-10">
        <HeaderComponent title={user} sub={`List of ${user}`} />
      </div>
      <div>
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
            placeholder="Search name or email"
            className=" border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-4 items-center w-full lg:w-auto">
            {user === "customers" && (
              <Select
                className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px] w-full"
                options={[]}
                placeholder="Select country"
              />
            )}
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={StatusOptions}
              placeholder="Select Status"
            />
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={GenderOptions}
              placeholder="Select Gender"
            />
          </div>
        </div>
        <div className=" w-full ">
          <TableCard
            columns={
              user === "customers" ? CustomerListHeader : AdministratorHeader
            }
            rows={rows}
            isLoading={loading}
          />
        </div>
      </div>
    </section>
  );
}
