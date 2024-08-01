"use client";

import React, { useState, useEffect } from "react";
import DeviceInfo from "@/components/DeviceInfo";
import { getUserSessions } from "@/services/userservice";
import { useParams } from "next/navigation";
import EmptyComponent from "@/components/EmptyComponent";
export default function Devices() {
  const { user, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getUserSessions(id);

      if (res.status === 200) {
        const detail = res.data?.data?.sessions;

        setRows(detail);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-sm mb-6">Devices information</h2>

      {rows.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-6">
          {rows.map((tab, index) => (
            <div key={index.toString()}>
              {" "}
              <DeviceInfo tab={tab} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyComponent title="No device available" />
      )}
    </div>
  );
}
