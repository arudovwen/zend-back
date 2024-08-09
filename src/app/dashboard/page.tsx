"use client"
import Tabs from "@/components/pages/overview/Tabs";
import Chart from "@/components/pages/overview/Chart";
import Analysis from "@/components/pages/overview/Analysis";
import Activities from "@/components/pages/overview/Activities";
import Transactions from "@/components/pages/overview/Transactions";


export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10">
      <Tabs />
      <Chart />
      <Analysis />
      <Activities />
      <Transactions />
    </main>
  );
}
