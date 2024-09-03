"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import debounce from "debounce";
import HeaderComponent from "@/components/HeaderComponent";
import Select from "@/components/forms/Select";
import TableCard from "@/components/table";
import { AdministratorHeader, CustomerListHeader } from "@/constants/headers";
import { StatusOptions, GenderOptions, CountryFilters } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import moment from "moment";
import { ucFirst } from "@/utils/methods";
import { getAllUsers, getAllAdmin } from "@/services/userservice";
import AppStatusComponent from "@/components/AppStatusComponent";
import Image from "next/image";
import MenuSelect from "@/components/forms/MenuSelect";
import AppIcon from "@/components/AppIcon";
import LockForm from "./customer/modals/LockForm";
import { PageContext } from "@/constants/context";

const Options = [
  {
    label: "View",
    value: "view",
  },
  {
    label: "Ban",
    value: "ban",
  },
  {
    label: "Unban",
    value: "unban",
  },
  // {
  //   label: "Lock",
  //   value: "lock",
  // },
  {
    label: "Unlock",
    value: "unlock",
  },
];
export default function List() {
  const router = useRouter();
  const params = useParams();
  const { permissions } = useContext(PageContext);
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState<
    "view" | "ban" | "unlock" | "lock" | "unban"
  >("lock");
  const { user } = params;
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [queryParams, setQueryParams] = useState<any>({
    user: "",
    page: 1,
    count: 15,
    total: 0,
    type: "",
    search: "",
    is_banned: false,
    is_deleted: false,
    is_locked: false,
    country: null,
    gender: null,
  });


  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchQuery = user === "customers" ? getAllUsers : getAllAdmin;
      const res = await fetchQuery(queryParams);

      if (res.status === 200) {
        const detail = res.data?.data?.[
          user === "customers" ? "users" : "administrators"
        ]?.map((i: any) => ({
          ...i,
          name: (
            <span className="flex gap-x-[10px] items-center">
              <span className="w-8 h-8 hidden xl:inline-block">
                <Image
                  width={32}
                  height={32}
                  src={
                    i?.image ||
                    "https://res.cloudinary.com/dxgge3ywq/image/upload/v1676809835/user_images/zendwallet-default-avatar_luqzcv.png"
                  }
                  alt="avatar"
                  className="w-8 h-8 rounded-lg"
                />
              </span>
              <span className="block flex-1">
                <span className="block font-medium text-sm">
                  {ucFirst(i?.firstName)} {ucFirst(i?.lastName)}
                </span>
                <span className="text-xs block">{i?.emailAddress}</span>
              </span>
            </span>
          ),
          username: i?.emailAddress,
          activity: i?.type?.replaceAll("_", " ").toUpperCase(),
          date: moment(i?.createdAt).format("lll"),
          role: ucFirst(i?.primaryRole),
          status: (
            <AppStatusComponent status={i.isBanned ? "banned" : "active"} />
          ),
          action: (
            <MenuSelect
              label={<AppIcon icon="uil:ellipsis-v" />}
              options={
                user === "administrators"
                  ? handleOptions(
                      i,
                      Options.filter((i: any) => i.value !== "view")
                    )
                  : handleOptions(i, Options)
              }
              handleSelected={(val: any) =>
                handleSelected(val, {
                  ...i,
                  name: ` ${ucFirst(i?.firstName)} ${ucFirst(i?.lastName)}`,
                })
              }
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

  function handleSelected(
    value: "view" | "ban" | "unlock" | "lock" | "unban",
    data: any
  ) {
    setCustomer(data);
    setType(value);
    switch (value) {
      case "view":
        router.push(
          `/dashboard/customers/${data.id}?name=${encodeURIComponent(
            data?.name
          )}`
        );
        break;
      case "ban":
        setOpen(true);
        break;
      case "unban":
        setOpen(true);
        break;

      case "lock":
        setOpen(true);
        break;
      case "unlock":
        setOpen(true);
        break;

      default:
        break;
    }
  }
  function handleOptions(data: any, options: any) {
    let optTemp = options;

    if (user === "customers" && !permissions.includes("accounts.users.update")) {
      optTemp = optTemp.filter((i: any) => i.value === "view");
   
    }
  
    if (
      user === "administrators" &&
      !permissions.includes("accounts.administrators.update")
    ) {
      optTemp = optTemp.filter((i: any) => i.value === "view");
    }
  
    const tempData = optTemp.filter((i: any) => {
      if (data.isBanned && i.value === "ban") return false;
      if (data.isLocked && i.value === "lock") return false;
      if (!data.isBanned && i.value === "unban") return false;
      if (!data.isLocked && i.value === "unlock") return false;
      return true;
    });
  
    // console.log("🚀 ~ handleOptions ~ tempData:", tempData);
    return tempData;
  }
  

  useEffect(() => {
    fetchData();
  }, [queryParams.page]);

  useEffect(() => {
    if (queryParams.page !== 1) {
      setQueryParams({
        ...queryParams,
        page: 1,
      });
    } else {
      fetchData();
    }
  }, [
    queryParams.count,
    queryParams.is_banned,
    queryParams.is_locked,
    queryParams.id_deleted,
    queryParams.search,
    queryParams.country,
    queryParams.gender,
  ]);

  function handleSearch(val: any) {
    setQueryParams({
      ...queryParams,
      search: val,
    });
  }
  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 800),
    []
  );

  function handleStatus(option: any) {
    switch (option?.value) {
      case "banned":
        setQueryParams({
          ...queryParams,
          is_banned: true,
          is_deleted: false,
          is_locked: false,
        });
        break;
      case "locked":
        setQueryParams({
          ...queryParams,
          is_banned: false,
          is_deleted: false,
          is_locked: true,
        });
        break;
      case "deleted":
        setQueryParams({
          ...queryParams,
          is_banned: false,
          is_deleted: true,
          is_locked: false,
        });
        break;

      default:
        setQueryParams({
          ...queryParams,
          is_banned: false,
          is_deleted: false,
          is_locked: false,
        });
        break;
    }
  }
  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title={user}
          sub={`List of ${user} on Zendwallet platform`}
          count={queryParams.total}
        />
      </div>
      <div>
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
            placeholder="Search name or email"
            onChange={(e) => debouncedSearch(e.target.value)}
            className="text-secondary dark:text-white/80 border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-4 items-center w-full lg:w-auto">
            {user === "customers" && (
              <Select
                className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px] w-full"
                options={CountryFilters}
                placeholder="Select country"
                onChange={(e: any) =>
                  setQueryParams({
                    ...queryParams,
                    country: e.value,
                  })
                }
              />
            )}
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={StatusOptions}
              placeholder="Select Status"
              onChange={(val: any) => handleStatus(val)}
            />
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
              options={GenderOptions}
              placeholder="Select Gender"
              onChange={(e: any) =>
                setQueryParams({
                  ...queryParams,
                  gender: e.value,
                })
              }
            />
          </div>
        </div>
        <div className=" w-full ">
          <TableCard
            columns={
              user === "customers" ? CustomerListHeader : AdministratorHeader
            }
            rows={rows}
            isLoading={loading}
            queryParams={queryParams}
            setQueryParams={(data: any) => setQueryParams(data)}
          />
        </div>
      </div>
      {isOpen && (
        <LockForm
          setOpen={setOpen}
          isOpen={isOpen}
          type={type}
          detail={{
            name: `${customer?.firstName} ${customer?.lastName}`,
            email: customer?.emailAddress,
            id: customer?.id,
          }}
          userType={user}
        />
      )}
    </section>
  );
}
