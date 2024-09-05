"use client";
import Tabs from "@/components/pages/overview/Tabs";
import Chart from "@/components/pages/overview/Chart";
import Analysis from "@/components/pages/overview/Analysis";
import Activities from "@/components/pages/overview/Activities";
import Transactions from "@/components/pages/overview/Transactions";
import { PageContext } from "@/constants/context";
import { useContext } from "react";

export default function Dashboard() {
  const { permissions } = useContext(PageContext);
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10">
      <Tabs />
      {permissions.includes("accounts.users.metrics") && <Chart />}
      <Analysis />
      <Activities />
     {permissions.includes("wallets.transactions.find") &&  <Transactions />}
    </main>
  );
}
