"use client";
import moment from "moment";
import { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { AnalysisTab } from "@/constants";
import GridTab from "@/components/GridTab";
import { getDashboardMetrics } from "@/services/walletservice";

export default function Analysis() {
  const [rows, setRows] = useState<any[]>([]);
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  async function fetchData() {
    try {
      const res = await getDashboardMetrics({
        customFromDate: value.startDate && moment(value.startDate).isValid()
          ? moment(value.startDate).format("YYYY-MM-DD")
          : null,
        customToDate: value.endDate && moment(value.endDate).isValid()
          ? moment(value.endDate).format("YYYY-MM-DD")
          : null,
      });

      if (res.status === 200) {
        setRows(res?.data?.data || []);
      } else {
        console.error("Failed to fetch data", res.status);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  // Fetch data when the component mounts or value changes
  useEffect(() => {
    fetchData();
  }, [value]);

  
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-y-4 lg:items-center lg:justify-between mb-4">
        <h2 className="text-secondary dark:text-white font-semibold">
          Service Analytics
        </h2>
        <div className="relative">
          <Datepicker
            showShortcuts
            useRange={false}
            showFooter
            value={value}
            onChange={handleValueChange}
            placeholder="Filter dates"
            inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
            containerClassName="rounded-lg relative text-sm lg:w-[260px] min-w-[250px] text-secondary z-[20]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {AnalysisTab.map((tab) => (
          <div key={tab.label}>
            {/* @ts-ignore  */}
            <GridTab tab={tab} value={rows?.[tab?.key]} />
          </div>
        ))}
      </div>
    </div>
  );
}
