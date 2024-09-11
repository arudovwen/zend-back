"use client";
import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { QuickSellOrdersTab } from "@/constants";
import Select from "@/components/forms/Select";
import { QuickSellOrderHeader } from "@/constants/headers";
import GridTab from "@/components/GridTab";
import { getAllTransactions } from "@/services/walletservice";
import AppStatusComponent from "@/components/AppStatusComponent";
import { ucFirst, capitalizeSentence, formatCurrency } from "@/utils/methods";

export default function OrdersComponent() {
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


  function getTransactions(params: any) {
    setLoading(true);
    getAllTransactions(params)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          const detail = res.data.data.transactions.map((i: any) => ({
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
          }));
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
      ...queryParams
    });
  }, [queryParams]);
  
  return (
    <section>
      <div className="mb-10">
        <HeaderComponent title="Orders" sub="List of quicksell orders" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4  w-full mb-10">
        {QuickSellOrdersTab.map((tab) => (
          <div key={tab.label}>
            <GridTab
              tab={tab}
              iconClass="!text-2xl"
              borderClass="!h-10  !w-10"
              labelClass="!text-xs"
              numClass="!text-xl"
            />
          </div>
        ))}
      </div>{" "}
      <div className=" w-full ">
        <div className="mb-4 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <div></div>
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <Select
              className=" border border-[#EAECF0] dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px]"
              options={[]}
              placeholder="Select status"
            />
       
          </div>
        </div>
        <TableCard columns={QuickSellOrderHeader} rows={[]} />
      </div>
    </section>
  );
}
