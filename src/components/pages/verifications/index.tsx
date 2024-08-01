"use client";
import React, { useEffect, useState } from "react";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import { VerificationTab } from "@/constants";
import GridTab from "@/components/GridTab";
import { VarificationsHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import Datepicker from "react-tailwindcss-datepicker";
import MenuSelect from "@/components/forms/MenuSelect";
import AppIcon from "@/components/AppIcon";
import AppStatusComponent from "@/components/AppStatusComponent";
import {
  getUsersVerifications,
  getUsersVerificationMetrics,
} from "@/services/userservice";
import moment from "moment";
import { ucFirst } from "@/utils/methods";

const Options = [
  {
    label: "Approve",
    value: "approve",
  },
  {
    label: "Reject",
    value: "reject",
  },
];

const statusData = [
  { key: "Default", value: "" },
  { key: "Pending", value: false },
  { key: "Approved", value: true },
];
export default function VerficationComponent() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [queryParams, setQueryParams] = useState({
    user: "",
    page: 1,
    count: 15,
    created_at_stop: null,
    created_at_start: null,
    type: "",
    total: 0,
    id: null,
  });
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setValue(newValue);
  };
  function handleSelected(val: any, data: any) {}
  function handleType(type: string) {
    switch (type) {
      case "business":
        return "Business";
      case "email_address":
        return "Email address";
      case "phone_number":
        return "Phone number";
      case "governmentId":
        return "Government Id";
      case "bvn":
        return "BVN";
      case "address":
        return "Address";

      default:
        return type;
    }
  }
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getUsersVerifications(queryParams);

      if (res.status === 200) {
        const detail = res.data?.data?.userVerifications.map((i: any) => ({
          ...i,
          name: i?.user?.firstName + " " + i?.user?.lastName,
          type: handleType(i?.__t),
          email: i?.user?.emailAddress || "-",
          date: moment(i?.createdAt).format("lll"),
          status: (
            <AppStatusComponent
              status={i.isApproved ? "approved" : "pending"}
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
          total: res.data?.data?.totalCount,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  function getMetrics() {
    getUsersVerificationMetrics().then((res) => {
      if (res.status === 200) {
        const detail = res.data.data?.metrics
        setMetrics(detail);
       
      }
      
    });
  }

  useEffect(() => {
    fetchData();
  }, [queryParams.page, queryParams.count]);

  useEffect(() => {
    getMetrics();
  }, []);

  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title="Verifications"
          sub="Track & Manage Users verification history on the system"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4  w-full mb-10">
        {VerificationTab.map((tab: any) => (
          <div key={tab.label}>
            <GridTab
              tab={tab}
              iconClass="!text-2xl"
              borderClass="!h-10  !w-10"
              labelClass="!text-xs"
              numClass="!text-xl"
              isVerification
              value={metrics?.[tab?.key]}
            />
          </div>
        ))}
      </div>{" "}
      <div className=" w-full ">
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
            placeholder="Search email address"
            className=" border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px] w-full"
              options={[]}
              placeholder="Select token"
            />
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px]"
              options={[]}
              placeholder="Select status"
            />
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={[]}
              placeholder="Select customer"
            />
            <Datepicker
              showShortcuts
              useRange={false}
              showFooter
              value={value}
              // @ts-ignore
              onChange={handleValueChange}
              placeholder="Filter dates"
              inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
              containerClassName="rounded-lg relative text-sm w-full lg:w-[200px] min-w-[200px] text-secondary z-[99]"
            />
          </div>
        </div>
        <TableCard
          columns={VarificationsHeader}
          rows={rows}
          isLoading={loading}
          queryParams={queryParams}
          setQueryParams={(data: any) => setQueryParams(data)}
        />
      </div>
    </section>
  );
}
