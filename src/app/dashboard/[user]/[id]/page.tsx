"use client";
import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import Breadcrumbs from "@/components/Breadcrumbs";
import AppSideTab from "@/components/AppSideTab";
import AppTab from "@/components/AppTab";
import Personal from "@/components/pages/customers/customer/personal";
import Kin from "@/components/pages/customers/customer/kin";
import Activities from "@/components/pages/customers/customer/activity";
import KYC from "@/components/pages/customers/customer/kyc";
import Devices from "@/components/pages/customers/customer/devices";
import { useParams, useSearchParams } from "next/navigation";
import { getUserInfo } from "@/services/userservice";
import { UserContext } from "@/constants/context";
import { ucFirst } from "@/utils/methods";

export default function Customer() {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const [userData, setUserData] = useState<any>({});
  const name = searchParams.get("name");
  const [loading, setLoading] = useState(false);
  const Navigations = [
    {
      title: "Information",
      sub: "View customer information, wallet balance, assets and so much more",
      key: "personal",
    },
    {
      title: "Next of Kin",
      key: "kin",
      sub: "Add, view and edit next of kin information on zendwallet",
    },
    {
      title: "Activities",
      key: "activities",
      sub: "View all customer's activities on zendwallet",
    },
    {
      title: "KYC",
      key: "kyc",
      sub: "View all customer's kyc information on zendwallet",
    },
    {
      title: "Devices",
      key: "devices",
      sub: "View all customer's logged devices on zendwallet",
    },
  ];
  const [selected, setSelected] = useState("personal");

  function getData() {
    setLoading(true);
    getUserInfo(id)
      .then((res: any) => {
        if (res.status === 200) {
          const tempData = res.data?.data?.user;
          setUserData({
            ...tempData,
            joinDate: moment(tempData?.createdAt).format("lll"),
            username: ucFirst(tempData?.username),
            gender: ucFirst(tempData?.gender),
            firstName: ucFirst(tempData?.firstName),
            lastName: ucFirst(tempData?.lastName),
            dateOfBirth: moment(tempData?.dateOfBirth).isValid()
              ? moment(tempData?.dateOfBirth).format("lll")
              : tempData?.dateOfBirth,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const value = useMemo(() => {
    return {
      userData,
      loading,
    };
  }, [userData, loading]);

  return (
    <UserContext.Provider value={value}>
      <section>
        <div className="mb-6">
          <Breadcrumbs
            links={[
              {
                title: "Customers",
                url: "/dashboard/customers/list",
              },
              {
                title: "Information",
                url: "#",
              },
              {
                title: name || "",
                url: "#",
              },
            ]}
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-x-10 py-4">
          <div className="w-auto lg:w-full sm:max-w-[300px] ">
            <div className="hidden xl:inline-block overflow-hidden bg-white dark:bg-gray-700 rounded-lg border border-gray-100    dark:border-gray-600 w-full">
              <AppSideTab
                options={Navigations}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className="xl:hidden">
              <AppTab
                tabs={Navigations}
                setActiveTab={setSelected}
                activeTab={selected}
              />
            </div>
          </div>
          <div className="flex-1 py-8 px-6 sm:px-10 bg-white dark:bg-gray-700 rounded-lg border border-gray-100    dark:border-gray-600">
            <div className="max-w-[1024px] pb-10">
              {selected === "personal" && <Personal />}
              {selected === "kin" && <Kin />}
              {selected === "kyc" && <KYC />}
              {selected === "activities" && <Activities />}
              {selected === "devices" && <Devices />}
            </div>
          </div>
        </div>
      </section>
    </UserContext.Provider>
  );
}
