"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import AppTab from "@/components/AppTab";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { getAllTransactions } from "@/services/walletservice";
import formatCurrency from "@/utils/formatCurrency";
import { capitalizeSentence, ucFirst } from "@/utils/methods";
import { OverviewSwapHeader, OverviewTokenHeader } from "@/constants/headers";
import Link from "next/link";
import AppStatusComponent from "@/components/AppStatusComponent";
import { PageContext } from "@/constants/context";

export default function Transactions() {
  const tabs = [
    { title: "swap transactions", key: "swap" },
    { title: "token transactions", key: "transaction" },
  ];

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [queryParams, setQueryParams] = useState({
    page: 1,
    count: 10,
    status: "",
    customFromDate: null,
    customToDate: null,
    transactionType: "",
    transactionId: "",
    currency: "",
  });
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
            type: ucFirst(i.type)
          }));
          setRows(detail);
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
    });
  }, [queryParams, activeTab]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-secondary dark:text-white font-semibold">
          Recent transactions
        </h2>
        <div className="">
          <Link href="/dashboard/transactions">
            <button className="flex gap-x-1 items-center font-medium pb-1 text-sm text-primary dark:text-white">
              View all <AppIcon icon="teenyicons:arrow-right-outline" />
            </button>
          </Link>
        </div>
      </div>
      <div>
        <AppTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
      <div>
        <div className=" w-full ">
          <TableCard
            columns={
              activeTab === "swap"
                ? OverviewSwapHeader.filter((i) => i.key !== "action")
                : OverviewTokenHeader.filter((i) => i.key !== "action")
            }
            rows={rows}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}
