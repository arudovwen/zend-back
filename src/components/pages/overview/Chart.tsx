"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Datepicker from "react-tailwindcss-datepicker";
import { ApexOptions } from "apexcharts";
import {currentTheme} from "@/plugins/Theme"

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const themeOp = currentTheme()
export default function Chart() {
  const [show, setShow] = useState(false);
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
  const theme = useRef<any>(themeOp);

  const [options, setOptions] = useState<ApexOptions>({
    theme: {
      mode: theme.current && theme.current,
    },
    // chart: {
    //   toolbar: {
    //     show: false,
    //   },
    // },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#485fe6"],
    title: {
        text: "",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "text-secondary dark:text-white/90",
        },
      },
    subtitle: {
      text: "",
      align: "left",
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: months,
      axisTicks: {
        show: false,
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

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);

    if (theme.current) {
      console.log("🚀 ~ useEffect ~ theme:", theme.current);
      // @ts-ignore
    //   setOptions((prevOptions) => ({
    //     ...prevOptions,
    //     theme: {
    //       mode: theme,
    //     },
    //   }));
    }
   
  }, [theme.current]); // Update when the theme changes

  useEffect(()=>{
    setSeries([{
        name: "Signups",
        data:[40, 70, 45, 100, 75, 40, 49, 88, 120, 98, 40, 78]
    }])
  },[])
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-y-4 text-left lg:items-center lg:justify-between mb-4">
        <h2 className="text-secondary dark:text-white font-semibold">
          Customers Signup Metrics
        </h2>
        <div className="relative">
          <Datepicker
            showShortcuts
            useRange={false}
            showFooter
            value={value}
            // @ts-ignore
            onChange={handleValueChange}
            placeholder="Filter dates"
            inputClassName="border w-full px-3 py-2 rounded bg-white dark:bg-gray-700 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
            containerClassName="rounded-lg relative text-sm lg:w-[260px] min-w-[250px] text-secondary z-[99]"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-100 dark:border-gray-600 w-full shadow-sm z-10">
        <div className="w-full">
          {show && (
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
}
