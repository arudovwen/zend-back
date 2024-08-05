"use client";

import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import { ActivitiesHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import { AdminActivitiesData } from "@/constants";
import Datepicker from "react-tailwindcss-datepicker";
import {
  getUsersActivity,
  getActivityOptions,
  getAdminsActivity,
} from "@/services/userservice";
import { ucFirst } from "@/utils/methods";
import { useParams } from "next/navigation";
import debounce from "debounce";

const Activities = () => {
  const { user } = useParams();
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [queryParams, setQueryParams] = useState({
    user: "",
    page: 1,
    count: 15,
    created_at_stop: null,
    created_at_start: null,
    type: "",
    total: 0,
    search:""
  });
  const [value, setValue] = useState({ startDate: null, endDate: null });

  const handleValueChange = (newValue: any) => {
    setQueryParams((prev) => ({
      ...prev,
      created_at_stop: newValue.endDate,
      created_at_start: newValue.startDate,
    }));
    setValue(newValue);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const fetchActivity =
        user === "customers" ? getUsersActivity : getAdminsActivity;
      const res = await fetchActivity(queryParams);

      if (res.status === 200) {
        const detail = res.data?.data?.[
          user === "customers"
            ? "userActivityLogs"
            : "administratorActivityLogs"
        ]?.map((i: any) => ({
          ...i,
          name: `${ucFirst(
            i[user === "customers" ? "user" : "administrator"]?.firstName
          )} ${ucFirst(
            i[user === "customers" ? "user" : "administrator"]?.lastName
          )}`,
          email:
            i[user === "customers" ? "user" : "administrator"]?.emailAddress,
          activity: i?.type?.replaceAll("_", " ").toUpperCase(),
          date: moment(i?.createdAt).format("lll"),
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

  async function getOptions() {
    try {
      const res = await getActivityOptions();
      if (res.status === 200) {
        setOptions([
          // @ts-ignore
          {
            label: "Default",
            key: "Default",
            value: "",
          },
          // @ts-ignore
          ...res.data?.data?.types.map((i: any) => ({ ...i, key: i.label })),
        ]);
      }
    } catch (error) {
      console.error("Error fetching activity options:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [
    queryParams.page,
    queryParams.count,
    queryParams.type,
    queryParams.created_at_start,
    queryParams.created_at_stop,
    queryParams.search,
    queryParams.user
  ]);

  useEffect(() => {
    getOptions();
  }, []);
  function handleSearch(val: any) {
    setQueryParams({
      ...queryParams,
      search: val,
      user:val
    });
  }
  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 800),
    []
  );

  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title={`${ucFirst(user)} Activities`}
          sub={`History of ${user} activities`}
        />
      </div>
      <div>
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
             onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search name or email"
            className="border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex gap-x-4 items-center flex-col lg:flex-row gap-y-2 w-full lg:w-auto">
            <Select
              className="border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800 text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={user === "customers" ? options : AdminActivitiesData}
              placeholder="Activity type"
              onChange={(e: any) =>
                setQueryParams({
                  ...queryParams,
                  type: e.value,
                })
              }
            />
            <Datepicker
              showShortcuts
              useRange={false}
              showFooter
              value={value}
              onChange={handleValueChange}
              placeholder="Filter dates"
              inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
              containerClassName="rounded-lg relative text-sm w-full lg:w-[260px] min-w-[250px] text-secondary z-[99]"
            />
          </div>
        </div>
        <div className="w-full">
          <TableCard
            columns={ActivitiesHeader}
            rows={rows}
            isLoading={loading}
            queryParams={queryParams}
            setQueryParams={(data: any) => setQueryParams(data)}
          />
        </div>
      </div>
    </section>
  );
};

export default Activities;
