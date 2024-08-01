/* eslint-disable react/jsx-no-undef */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AssetsTab, cryptoTokens } from "@/constants";
import GridTab from "@/components/GridTab";
import TableCard from "@/components/table";
import AppButton from "@/components/AppButton";
import Select from "@/components/forms/Select";
import { AssetHeader } from "@/constants/headers";
import AppIcon from "@/components/AppIcon";
import AppStatusComponent from "@/components/AppStatusComponent";
import MenuSelect from "@/components/forms/MenuSelect";

import {
  getUserAssetBalance,
  getDashboardMetrics,
  enableWithdrawal,
  disableWithdrawal,
  getWallets,
} from "@/services/walletservice";
import { currencyFormat, ucFirst } from "@/utils/methods";
import moment from "moment";
import router from "next/router";
import { useParams, useSearchParams } from "next/navigation";

const Options = [
  {
    label: "View",
    value: "view",
  },
];

export default function AssetComponent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<any>([]);
  const [queryParams, setQueryParams] = useState({
    user: "",
    page: 1,
    count: 15,
    total: 0,
  });
  const data = useRef<any>(null);
  const assets = useRef<any>(null);
  const assetsFunding = useRef<any>(null);
  const calTotalUsd =
    parseFloat(assets.current?.totalUsd) +
    parseFloat(assetsFunding.current?.totalUsd);

  function getData() {
    getUserAssetBalance({ id, type: "trading" }).then((res) => {
      if (res.status === 200) {
        assets.current = res.data;
      }
    });

    getUserAssetBalance({ id, type: "funding" }).then((res) => {
      if (res.status === 200) {
        assetsFunding.current = res.data;
      }
    });
  }

  useEffect(() => {
    getData();
    const tempRow = cryptoTokens.map((key: any) => {
      return {
        token: `${key.label} (${key.value})`,
        fundingBal: currencyFormat(0),
        tradingBal: currencyFormat(0),
      };
    });
    setRows(tempRow)
    console.log("🚀 ~ tempRow ~ tempRow:", tempRow);
  }, []);
  return (
    <section>
      <div className="mb-6">
        <Breadcrumbs
          links={[
            {
              title: "Assets",
              url: "/dashboard/assets",
            },
            {
              title: name,
              url: "#",
            },
          ]}
        />
      </div>

      <div className=" w-full ">
        <div className="mb-4 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <div></div>
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <AppButton text="Suspend wallet" />
          </div>
        </div>
        <TableCard columns={AssetHeader} rows={rows} />
      </div>
    </section>
  );
}
