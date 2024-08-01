"use client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { OverviewSwapHeader, OverviewTokenHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import Datepicker from "react-tailwindcss-datepicker";
import {
  getAllTransactions,
  getDashboardMetrics,
} from "@/services/walletservice";
import formatCurrency from "@/utils/formatCurrency";
import {
  capitalizeSentence,
  formatCurrencyAmt,
  ucFirst,
} from "@/utils/methods";
import AppStatusComponent from "@/components/AppStatusComponent";
import GridTab from "@/components/GridTab";
import { AssetsTab } from "@/constants";
import OptionsList from "@/components/forms/OptionsList";
import MenuSelect from "@/components/forms/MenuSelect";
export default function Transactions() {
  const tabs = [
    { title: "swap transactions", key: "swap" },
    { title: "token transactions", key: "transaction" },
  ];
  const [metrics, setMetrics] = useState<any>({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    count: 15,
    status: "",
    customFromDate: null,
    customToDate: null,
    transactionType: "",
    transactionId: "",
    currency: "",
    total: 0,
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

  function getMetrics() {
    getDashboardMetrics({}).then((res) => {
      if (res.status === 200) {
        setMetrics(res.data.data);
      }
    });
  }
  function handleSelected(val: any, data: any) {}
  function getTransactions(params: any) {
    setLoading(true);
    getAllTransactions(params)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          const detail = res.data.transactions.map((i: any) => ({
            ...i,
            name: `${ucFirst(i.user?.firstName)} ${ucFirst(i.user?.lastName)}`,
            transactionId: i.txId || i.billId || i.ordId || i.wdId,
            date: moment(i.timeStamp).format("lll"),
            token: i.currency,
            transactionType: capitalizeSentence(i?.transactionType),
            tokenamount:
              formatCurrency(parseFloat(i?.amount)) + " " + i?.currency,
            swapamount: `${formatCurrency(i?.toCurrencyAmt)} ${i?.toCurrency}`,
            tokenSwapped: `${i?.fromCurrency} > ${i?.toCurrency}`,
            status: <AppStatusComponent status={i.status} />,
            type: ucFirst(i.type),
            action: (
              <MenuSelect
                label={<AppIcon icon="uil:ellipsis-v" />}
                options={[]}
                handleSelected={(val: string) =>
                  handleSelected(val, {
                    ...i,
                    name: `${ucFirst(i.user?.firstName)} ${ucFirst(
                      i.user?.lastName
                    )}`,
                  })
                }
              />
            ),
          }));
          setRows(detail);
          setQueryParams({
            ...queryParams,
            total: res.data?.totalTransactions,
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getTransactions({
      ...queryParams,
      type: activeTab,
      limit: queryParams.count,
    });
  }, [queryParams.page, queryParams.count, activeTab]);

  useEffect(() => {
    getMetrics();
  }, []);

  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title="Transactions"
          sub="History of customer swaps and deposit transaction"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6  w-full mb-10">
        {AssetsTab.map((tab) => (
          <div key={tab.label}>
            <GridTab
              tab={tab}
              iconClass="!text-2xl"
              borderClass="!h-10  !w-10"
              labelClass="!text-xs"
              numClass="!text-xl"
              value={formatCurrencyAmt(metrics?.[tab.key] || 0, "USD")}
            />
          </div>
        ))}
      </div>{" "}
      <div>
        <AppTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
      <div className=" w-full ">
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
            placeholder="Search transaction id"
            className=" border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px] w-full"
              options={[]}
              placeholder="Select token"
            />
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px]"
              options={[]}
              placeholder="Select status"
            />
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
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
              inputClassName="border w-full px-3 py-[10px] rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
              containerClassName="rounded-lg relative text-sm w-full lg:w-[200px] min-w-[200px] text-secondary z-[99]"
            />
          </div>
        </div>
        <TableCard
          columns={
            activeTab === "swap" ? OverviewSwapHeader : OverviewTokenHeader
          }
          rows={rows}
          isLoading={loading}
          queryParams={queryParams}
          setQueryParams={(data: any) => setQueryParams(data)}
        />
      </div>
    </section>
  );
}
