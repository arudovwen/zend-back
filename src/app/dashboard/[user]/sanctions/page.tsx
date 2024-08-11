"use client";
import React, { useState, useEffect, useCallback } from "react";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import { SanctionHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import AppButton from "@/components/AppButton";
import { useRouter } from "next/navigation";
import { getSanctionList } from "@/services/walletservice";
import debounce from "debounce";

export default function Activities() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    count: 20,
    user: "",
    firstName: null,
    lastName: "",
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getSanctionList(queryParams);

      if (res.status === 200) {
        const detail = res.data?.data?.userVerifications?.map((i: any) => ({
          ...i,

          username: i?.emailAddress,

          // action: (
          //   <MenuSelect
          //     label={<AppIcon icon="uil:ellipsis-v" />}
          //     options={
          //       user === "administrators"
          //         ? Options.filter((i) => i.value !== "view")
          //         : Options
          //     }
          //     handleSelected={(val: string) =>
          //       handleSelected(val, {
          //         ...i,
          //         name: ` ${ucFirst(i?.firstName)} ${ucFirst(i?.lastName)}`,
          //       })
          //     }
          //   />
          // ),
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
  useEffect(() => {
    fetchData();
  }, [queryParams.page]);

  useEffect(() => {
    if (queryParams.page !== 1) {
      setQueryParams({
        ...queryParams,
        page: 1,
      });
    } else {
      fetchData();
    }
  }, [queryParams.count, queryParams.user]);

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

  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title="Sanction Verification"
          sub="History of customer sanctions and verification"
        />
      </div>
      <div>
        <div className="mb-6 flex justify-between flex-col lg:flex-row gap-y-4 items-center">
          <input
            placeholder="Search name or email"
            onChange={(e) => debouncedSearch(e.target.value)}
            className="text-secondary dark:text-white/80 border border-gray-200 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded md:max-w-[280px] w-full"
          />
        </div>
        <div className=" w-full ">
          <TableCard
            columns={SanctionHeader}
            rows={rows}
            isLoading={loading}
            queryParams={queryParams}
            setQueryParams={(data: any) => setQueryParams(data)}
          />
        </div>
      </div>
    </section>
  );
}
