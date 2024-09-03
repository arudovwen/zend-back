/* eslint-disable react/jsx-no-undef */
"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { AssetsTab, cryptoTokens } from "@/constants";
import GridTab from "@/components/GridTab";
import TableCard from "@/components/table";
import AppButton from "@/components/AppButton";
import Select from "@/components/forms/Select";
import { AssetHeader } from "@/constants/headers";
import AppIcon from "@/components/AppIcon";
import AppStatusComponent from "@/components/AppStatusComponent";
import Image from "next/image";

import {
  getUserAssetBalance,
  getDashboardMetrics,
  getWallets,
} from "@/services/walletservice";
import { currencyFormat, ucFirst } from "@/utils/methods";
import moment from "moment";
import router from "next/router";
import { useParams, useSearchParams } from "next/navigation";
import LockForm from "../customers/customer/modals/LockForm";
import { PageContext } from "@/constants/context";

const Options = [
  {
    label: "View",
    value: "view",
  },
];

export default function AssetComponent() {
  const { permissions } = useContext(PageContext);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState("suspend");
  const { id } = useParams();
  const [detail, setDetail] = useState<any>(null);
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

  function handleWallet() {
    getWallets({ user: id }).then((res) => {
      if (res.status === 200) {
        setDetail(res.data?.wallets[0]);
      }
    });
  }

  useEffect(() => {
    getData();
    handleWallet();
    const tempRow = cryptoTokens.map((key: any) => {
      return {
        token: (
          <span className="flex gap-x-2 items-center">
            <Image
              alt="token"
              className="w-[18px] h-[18px] rounded-full"
              width="18"
              height="18"
              src={key.imageUrl}
            />
            {`${key.label} (${key.value})`}
          </span>
        ),
        fundingBal: currencyFormat(0),
        tradingBal: currencyFormat(0),
      };
    });
    setRows(tempRow);
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
          <div className="text-sm flex gap-x-2 items-center  text-secondary dark:text-white/80">
            <span> Withdrawal:</span>
            <AppStatusComponent
              status={detail?.withdrawal?.enabled ? "enabled" : "disabled"}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
           {permissions.includes("wallets.wallets.update")  && <AppButton
              onClick={() => {
                setType(detail?.withdrawal?.enabled ? "disable" : "enable");
                setOpen(true);
              }}
              text={
                detail?.withdrawal?.enabled
                  ? "Suspend Withdrawal"
                  : "Enable withdrawal"
              }
            />}
          </div>
        </div>
        <TableCard columns={AssetHeader} rows={rows} />
      </div>
      <LockForm
        setOpen={setOpen}
        isOpen={isOpen}
        type={type}
        lockType={"Withdrawal"}
        user={id}
        detail={{
          name: name,
          id: id,
        }}
        onClose={handleWallet}
      />
    </section>
  );
}
