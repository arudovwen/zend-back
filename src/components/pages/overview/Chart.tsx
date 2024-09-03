"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import dynamic from "next/dynamic";
import Datepicker from "react-tailwindcss-datepicker";
import { ApexOptions } from "apexcharts";
// import ReactApexChart from "react-apexcharts";
import { PageContext } from "@/constants/context";
import { getSignUpMetrics } from "@/services/userservice";

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Chart() {
  const { colormode } = useContext(PageContext);
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [series, setSeries] = useState<any>([
    {
      name: "Signups",
      data: [],
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>({
    theme: {
      mode: colormode,
    },
    chart: {
      height: 260,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#485fe6"],

    grid: {
      show: true,
      borderColor: "#f7f8fa"
    },
    xaxis: {
      categories: months,
      axisTicks: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
            toolbar: {
              show: false,
            },
          },
        },
      },
    ],
  });

  const handleValueChange = (newValue: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setValue(newValue);
  };
  function getMonthString(monthNumber: number) {
    const months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    }
    return "Invalid month number";
  }
  useEffect(() => {
    // @ts-ignore
    setOptions((prevOptions) => ({
      ...prevOptions,
      theme: {
        mode: colormode,
      },
    }));
  }, [colormode]); // Update when the theme changes

  useEffect(() => {

    getSignUpMetrics({}).then((res) => {
      const customMonths = res?.data?.data?.chartData?.map(
        (i: any) => `${getMonthString(i?._id.month)} ${i?._id.year}`
      );
      const customCounts = res?.data?.data?.chartData?.map((i: any) => i?.count);
      setSeries([
        {
          name: "Signups",
          data: customCounts,
        },
      ]);
      setOptions({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: customMonths,
        },
      });
    });
  }, []);
  return (
    <div className="w-full">
     
      <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-2 rounded-lg border border-gray-100 dark:border-gray-600 w-full  z-10">
      <div className="flex flex-col md:flex-row gap-y-4 text-left lg:items-center lg:justify-between mb-6">
        <h2 className="text-secondary dark:text-white font-semibold">
          Customers Signup Metrics
        </h2>
        <div className="relative">
          {/* <Datepicker
            showShortcuts
            useRange={false}
            showFooter
            value={value}
            // @ts-ignore
            onChange={handleValueChange}
            placeholder="Filter dates"
            inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
            containerClassName="rounded-lg relative text-sm lg:w-[260px] min-w-[250px] text-secondary z-[99]"
          /> */}
        </div>
      </div>
        <div className="w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={280}
          />
        </div>
      </div>
    </div>
  );
}
