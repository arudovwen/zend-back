"use client";
import React, { useState, useEffect, useCallback } from "react";
import debounce from "debounce";
import SearchSelect from "@/components/forms/SearchSelect";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import { VerificationTab, VerifyStatusData, VerifyTypeData } from "@/constants";
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
  getAllUsers,
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
    is_approved: null
  });
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setQueryParams({
      ...queryParams,
      created_at_stop: newValue.endDate,
      created_at_start: newValue.startDate,
    });
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
        const detail = res.data.data?.metrics;
        setMetrics(detail);
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, [
    queryParams.page,
    queryParams.count,
    queryParams.created_at_stop,
    queryParams.created_at_start,
    queryParams.user,
    queryParams.type,
    queryParams.is_approved,
  ]);
  const loadOptions = (inputValue: any, callback: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const searchDataT = await getAllUsers({
          user: inputValue,
          page: 1,
          count: 1000,
        });
        const sdata = searchDataT.data?.data?.users.map((data: any) => ({
          label: `${ucFirst(data?.firstName)} ${ucFirst(data.lastName)}}`,
          value: data?.id,
        }));

        setTimeout(() => {
          if (sdata?.length) {
            callback([{ label: "Default", value: "" }, , ...sdata]);
            resolve([{ label: "Default", value: "" }, , ...sdata]);
          } else {
            reject(new Error("No data available."));
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    getMetrics();
  }, []);
  const handleSelectType = (e: any) => {
    setQueryParams({
      ...queryParams,
      type: e.value,
    });
  };
  const handleStatusType = (e: any) => {
    setQueryParams({
      ...queryParams,
      is_approved: e.value,
    });
  };
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
  const handleUsers = (e: any) => {
    setQueryParams({
      ...queryParams,
      user: e.value,
    });
  };

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
            onChange={(e) => debouncedSearch(e.target.value)}
            className=" border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px] w-full"
              options={VerifyTypeData}
              placeholder="Select type"
              onChange={handleSelectType}
            />
            <Select
              className=" border border-gray-200 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px]"
              options={VerifyStatusData}
              placeholder="Select status"
              onChange={handleStatusType}
            />
             <SearchSelect loadOptions={loadOptions} onChange={handleUsers} />
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
