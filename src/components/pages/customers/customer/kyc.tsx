"use client";

import React, { useState, useEffect } from "react";
import TableCard from "@/components/table";
import { KycHeader } from "@/constants/headers";
import { getUserKycDetail, getUserVerifications } from "@/services/userservice";
import { ucFirst } from "@/utils/methods";
import { useParams } from "next/navigation";
import moment from "moment";
import AppStatusComponent from "@/components/AppStatusComponent";
import AppIcon from "@/components/AppIcon";
import MenuSelect from "@/components/forms/MenuSelect";

const Options = [
  {
    label: "Approve",
    value: "approve",
  },
  {
    label: "Reject",
    value: "reject",
  },
 
];

export default function KYC() {
  const { user, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [queryParams, setQueryParams] = useState({
    user: "",
    page: 1,
    count: 15,
    created_at_stop: null,
    created_at_start: null,
    type: "",
    total: 0,
    id,
  });
  function handleType(type: string) {
    switch (type) {
      case "business":
        return "Business";
      case "email_address":
        return "Email address";
      case "phone_number":
        return "Phone number";
      case "governmentId":
        return "Government Id";
      case "bvn":
        return "BVN";
      case "address":
        return "Address";

      default:
        return type;
    }
  }
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await getUserVerifications(queryParams);

      if (res.status === 200) {
        const detail = res.data?.data?.verifications.map((i: any) => ({
          ...i,
          type: handleType(i?.__t),
          email: i?.user?.emailAddress || "-",
          date: moment(i?.createdAt).format("lll"),
          status: (
            <AppStatusComponent
              status={i.isApproved ? "approved" : "pending"}
            />
          ),
          action: (
            <MenuSelect
              label={<AppIcon icon="uil:ellipsis-v" />}
              options={Options}
              handleSelected={(val: string) => {}}
            />
          ),
        }));

        setRows(detail);
        setQueryParams({
          ...queryParams,
          total: res.data?.data?.totalCount,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryParams.page, queryParams.count]);

  return (
    <div className=" w-full ">
      <h2 className="font-semibold text-sm mb-6">KYC information</h2>
      <TableCard
        columns={KycHeader.filter((i) => i.key !== "name")}
        rows={rows}
        isLoading={loading}
        queryParams={queryParams}
        setQueryParams={(data: any) => setQueryParams(data)}
      />
    </div>
  );
}
