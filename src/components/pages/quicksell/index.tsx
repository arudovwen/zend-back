"use client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { QuickSellHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import Datepicker from "react-tailwindcss-datepicker";
import AppStatusComponent from "@/components/AppStatusComponent";
import { getQuickSell, getQuickSellMetric } from "@/services/walletservice";
import {
  ucFirst,
  capitalizeSentence,
  formatCurrency,
  formatCurrencyAmt,
} from "@/utils/methods";
import MenuSelect from "@/components/forms/MenuSelect";

export default function QuickSellComponent() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
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
  function handleSelected(val: any, data: any) {}
  function getTransactions(params: any) {
    setLoading(true);
    getQuickSell(params)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          const detail = res.data.data.orders.map((data: any, i: any) => {
            const user = data?.user || {};
            const firstName = user.firstName
              ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
              : "";
            const lastName = user.lastName
              ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
              : "";

            return {
              key: i + 1,
              id: user.id || "",
              fullName: `${firstName} ${lastName}`,
              name: (
                <span>
                  <span className="block">
                    {`${firstName} ${lastName}`.trim()}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {data?.user?.emailAddress}
                  </span>
                </span>
              ),
              country: data?.user?.country,
              transactionId: data?.id || "",
              tokenSwapped: `${data?.fromCurrency || ""} > ${
                data?.toCurrency || ""
              }`,
              coin: (
                <span>
                  <span className="block">{data?.currency.toUpperCase()}</span>
                  <span className="text-gray-500">
                    {`${formatCurrencyAmt(
                      1,
                      data?.rate.baseCurrency
                    )} - ${formatCurrencyAmt(
                      data?.rate?.rate,
                      data?.rate.targetCurrency
                    )}` || 0}
                  </span>
                </span>
              ),
              date: data?.createdAt ? moment(data.createdAt).format("lll") : "",
              info: (
                <span>
                  <span className="text-xs block text-gray-500">
                    {data?.beneficiary?.bankAccountNumber} -{" "}
                    {data?.beneficiary?.bankName}
                  </span>

                  <span className="text-xs block text-gray-500 capitalize">
                    {data?.beneficiary?.bankAccountName.toLowerCase()}
                  </span>
                </span>
              ),
              amount: (
                <span className="block">
                  {formatCurrency(data?.amount || 0)}{" "}
                  {data?.currency.toUpperCase()}
                </span>
              ),
              amountInUsd: `${formatCurrencyAmt(
                data?.usdValue || 0,
                data?.rate.baseCurrency
              )}`,
              status: <AppStatusComponent status={data?.status} />,
              action: (
                <MenuSelect
                  label={<AppIcon icon="uil:ellipsis-v" />}
                  options={[]}
                  handleSelected={(val: string) => handleSelected(val, i)}
                />
              ),
            };
          });
          setRows(detail);
          setQueryParams({
            ...queryParams,
            total: res.data?.data?.totalCount,
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
    });
  }, [queryParams.count, queryParams.page]);

  return (
    <section>
      <div className="mb-10">
        <HeaderComponent title="Quick sell" sub="View list of recent ads" />
      </div>

      <div className=" w-full ">
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
            placeholder="Search transaction id"
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
          columns={QuickSellHeader}
          rows={rows}
          isLoading={loading}
          queryParams={queryParams}
          setQueryParams={(data: any) => setQueryParams(data)}
        />
      </div>
    </section>
  );
}
