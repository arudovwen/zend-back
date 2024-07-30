"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import {
  AdminActivitiesHeader,
  CustomerActivitiesHeader,
} from "@/constants/headers";
import { getUsersActivity, getAdminsActivity } from "@/services/userservice";
import { ucFirst } from "@/utils/methods";
import Link from "next/link";

export default function Activities() {
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminRows, setAdminRows] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [userRows, setUserRows] = useState([]);
  const [queryParams] = useState({
    user: "",
    page: 1,
    count: 5,
    created_at_stop: null,
    created_at_start: null,
    type: "",
  });
  function getData() {
    setUserLoading(true);
    setAdminLoading(true);
    getUsersActivity(queryParams)
      .then((res) => {
        if (res.status === 200) {
          const detail = res.data?.data?.userActivityLogs?.map((i: any) => ({
            ...i,
            name: `${ucFirst(i.user?.firstName)} ${ucFirst(i.user?.lastName)}`,
            email: i.user?.emailAddress,
            activity: i?.type?.replaceAll("_", " ").toUpperCase(),
            date: moment(i?.createdAt).format("lll"),
          }));

          setUserRows(detail);
          setUserLoading(false);
        }
      })
      .catch(() => {
        setUserLoading(false);
      });
    getAdminsActivity(queryParams)
      .then((res) => {
        if (res.status === 200) {
          const detail = res.data?.data?.administratorActivityLogs?.map(
            (i: any) => ({
              ...i,
              name: `${ucFirst(i.administrator?.firstName)} ${ucFirst(
                i.administrator?.lastName
              )}`,
              email: i.administrator?.emailAddress,
              activity: i?.type?.replaceAll("_", " ").toUpperCase(),
              date: moment(i?.createdAt).format("lll"),
            })
          );

          setAdminRows(detail);
          setAdminLoading(false);
 
        }
      })
      .catch(() => {
       
        setAdminLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const data = [
    {
      title: "Customer activities",
      header: CustomerActivitiesHeader,
      rows: userRows,
      loader: userLoading,
      url: "dashboard/customers/activities",
    },
    {
      title: "Admin activities",
      header: AdminActivitiesHeader,
      rows: adminRows,
      loader: adminLoading,
      url: "/dashboard/administrator/activities",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 lg:gap-x-8 w-full">
      {data.map((i) => (
        <div key={i.title}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-secondary dark:text-white font-semibold">
              {i.title}
            </h2>
            <div className="">
              <Link href={i.url}>
                <button className="flex gap-x-1 items-center font-medium pb-1 text-sm text-primary dark:text-white">
                  View all <AppIcon icon="teenyicons:arrow-right-outline" />
                </button>
              </Link>
            </div>
          </div>
          <div className=" w-full ">
            <TableCard columns={i.header} rows={i.rows} isLoading={i.loader} />
          </div>
        </div>
      ))}
    </div>
  );
}
