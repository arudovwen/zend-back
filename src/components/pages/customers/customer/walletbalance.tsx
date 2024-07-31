import React, { useRef, useEffect } from "react";
import { WalletBalanceOptions } from "@/constants";
import formatCurrency from "@/utils/formatCurrency";
import { useParams } from "next/navigation";
import { getUserAssetBalance } from "@/services/walletservice";

export default function WalletBalance() {
  const { id } = useParams();
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
  }, []);

  data.current = {
    balance: calTotalUsd,
    assets: 15,
  };

  return (
    <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-7 w-full">
      {WalletBalanceOptions.map((tab: any) => (
        <div
          key={tab.label}
          className="px-6 py-4 sm:py-5 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 flex flex-col gap-y-[6px] sm:gap-y-2 items-center "
        >
          <span className="text-xs sm:text-sm text-gray-500  dark:text-white/50">
            {tab.label}
          </span>
          <span className="text-xl sm:text-2xl font-semibold text-secondary dark:text-white/90">
            {tab.isCurrency
              ? formatCurrency(data.current?.[tab.key] || 0)
              : data.current?.[tab.key]}
          </span>
        </div>
      ))}
    </div>
  );
}
