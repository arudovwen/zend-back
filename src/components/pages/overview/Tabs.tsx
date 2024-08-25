"use client";
import { useState, useEffect } from "react";
import GridTab from "@/components/GridTab";
import { OverviewTabs } from "@/constants";
import { getUserMetrics } from "@/services/userservice";

export default function Tabs() {
  const [rows, setRows] = useState<any>(null);
  // Define a function to fetch data from the API
  async function fetchData() {
   
    try {
      const res = await getUserMetrics({});
     
      if (res.status === 200) {
        setRows(res?.data?.data?.metrics || []);
      } else {
        console.error("Failed to fetch data", res.status);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {OverviewTabs.map((tab) => (
        <div key={tab.label}>
          <GridTab tab={tab} value={rows?.[tab.key]} />
        </div>
      ))}
    </div>
  );
}
