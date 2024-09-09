"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import moment from "moment";
import debounce from "debounce";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import TableCard from "@/components/table";
import AppIcon from "@/components/AppIcon";
import { OverviewSwapHeader, OverviewTokenHeader } from "@/constants/headers";
import Select from "@/components/forms/Select";
import Datepicker from "react-tailwindcss-datepicker";
import {
  getAllTransactions,
  getDashboardMetrics,
  resolveTransaction,
} from "@/services/walletservice";
import formatCurrency from "@/utils/formatCurrency";
import {
  capitalizeSentence,
  formatCurrencyAmt,
  ucFirst,
} from "@/utils/methods";
import AppStatusComponent from "@/components/AppStatusComponent";
import GridTab from "@/components/GridTab";
import {
  AssetsTab,
  currencies,
  TransactionOptions,
  TypeData,
} from "@/constants";
import OptionsList from "@/components/forms/OptionsList";
import MenuSelect from "@/components/forms/MenuSelect";
import { getAllUsers } from "@/services/userservice";
import SearchSelect from "@/components/forms/SearchSelect";
import SideModal from "@/components/modals/SideModal";
import Transaction from "./detail";
import { toast } from "react-toastify";
import ButtonComponent from "@/components/ButtonComponent";
import CenterModal from "@/components/modals/CenterModal";
import { PageContext } from "@/constants/context";
import FormField from "@/components/forms/FormField";
import ResolveForm from "./resolveForm";

const Options = [
  {
    label: "View",
    value: "view",
  },
  {
    label: "Resolve",
    value: "resolve",
  },
];
export default function Transactions() {
  const tabs = [
    { title: "swap transactions", key: "swap" },
    { title: "token transactions", key: "transaction" },
  ];
  const { permissions } = useContext(PageContext);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<any>({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [isSideOpen, setSideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [transactionId, setTransactinId] = useState<any>("");
  const [type, setType] = useState<any>("deposit");
  const [transactionLoading, setTransactionLoading] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<any>({
    page: 1,
    count: 15,
    status: "",
    customFromDate: null,
    customToDate: null,
    transactionType: "",
    transactionId: "",
    currency: "",
    total: 0,
    user: "",
    fromToken: null,
    toToken: null,
  });
  const [value, setValue] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setQueryParams({
      ...queryParams,
      customToDate:
        newValue.endDate && moment(newValue.endDate).isValid()
          ? moment(newValue.endDate).format("DD-MM-YYYY")
          : null,
      customFromDate:
        newValue.startDate && moment(newValue.startDate).isValid()
          ? moment(newValue.startDate).format("DD-MM-YYYY")
          : null,
    });
    setValue(newValue);
  };
  const handleSearch = (value: any) => {
    setQueryParams({
      ...queryParams,
      transactionId: value,
    });
  };
  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 800),
    []
  );

  const handleType = (e: any) => {
    setQueryParams({
      ...queryParams,
      transactionType: e.value,
    });
  };

  const handleUsers = (e: any) => {
    setQueryParams({
      ...queryParams,
      user: e.value,
    });
  };

  const handleStatus = (e: any) => {
    setQueryParams({
      ...queryParams,
      status: e.value,
    });
  };
  const handleCurrency = (e: any) => {
    setQueryParams({
      ...queryParams,
      currency: e.value,
    });
  };
  function getMetrics() {
    getDashboardMetrics(queryParams).then((res) => {
      if (res.status === 200) {
        setMetrics(res.data.data);
      }
    });
  }
  function handleSelected(val: any, data: any) {
    setDetail(data);
    if (val === "view") {
      setSideOpen(true);
    }
    if (val === "resolve") {
      resolveTransaction({
        txId: data.transactionId || data.internalTransId,
        type: data.type.toLowerCase(),
      })
        .then((res) => {
          if (res.status === 200) {
            getAllTransactions();
            toast.success("Transaction resolved successfully");
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || "Process failed");
        });
    }
  }
  function getTransactions(params: any) {
    setLoading(true);
    getAllTransactions(params)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          const detail = res.data.transactions.map((i: any) => ({
            ...i,
            name: `${ucFirst(i.user?.firstName)} ${ucFirst(i.user?.lastName)}`,
            transactionId: i.txId || i.billId || i.ordId || i.wdId,
            date: moment(i.timeStamp).format("lll"),
            token: i.currency,
            transactionType: capitalizeSentence(i?.transactionType),
            tokenamount:
              formatCurrency(parseFloat(i?.amount)) + " " + i?.currency,
            swapamount: `${formatCurrency(i?.toCurrencyAmt)} ${i?.toCurrency}`,
            tokenSwapped: `${i?.fromCurrency} > ${i?.toCurrency}`,
            status: <AppStatusComponent status={i.status} />,
            type: ucFirst(i.type),
            action: (
              <MenuSelect
                label={<AppIcon icon="uil:ellipsis-v" />}
                options={
                  i.status === "pending" && activeTab === "transaction"
                    ? Options
                    : Options.filter((j) => j.value !== "resolve")
                }
                handleSelected={(val: string) =>
                  handleSelected(val, {
                    ...i,
                    name: `${ucFirst(i.user?.firstName)} ${ucFirst(
                      i.user?.lastName
                    )}`,
                    transactionId: i.txId || i.billId || i.ordId || i.wdId,
                    date: moment(i.timeStamp).format("lll"),
                    token: i.currency,
                    transactionType: capitalizeSentence(i?.transactionType),
                    tokenamount:
                      formatCurrency(parseFloat(i?.amount)) + " " + i?.currency,
                    swapamount: `${formatCurrency(i?.toCurrencyAmt)} ${
                      i?.toCurrency
                    }`,
                    tokenSwapped: `${i?.fromCurrency} > ${i?.toCurrency}`,
                    status: <AppStatusComponent status={i.status} />,
                    type: ucFirst(i.type),
                  })
                }
              />
            ),
          }));
          setRows(detail);
          setQueryParams({
            ...queryParams,
            total: res.data?.totalTransactions,
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }
  function handleResolve(e: any) {
    e.preventDefault();
    setTransactionLoading(true);
    resolveTransaction({ type, txId: transactionId })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Transaction resolved successfully");
          getAllTransactions();
          setOpen(false);
          setTransactionLoading(false);
        }
      })
      .catch((err) => {
        toast.error(
          `${err.response.data.message || "Resolve failed"}, ${
            err.response.data.data
          }`
        );
        setTransactionLoading(false);
      });
  }
  useEffect(() => {
    getTransactions({
      ...queryParams,
      type: activeTab,
      limit: queryParams.count,
    });
    getMetrics();
  }, [
    queryParams.page,
    queryParams.count,
    activeTab,
    queryParams.currency,
    queryParams.type,
    queryParams.transactionType,
    queryParams.transactionId,
    queryParams.user,
    queryParams.status,
    queryParams.customFromDate,
    queryParams.customToDate,
    queryParams.fromToken,
    queryParams.toToken,
  ]);

  const loadOptions = (inputValue: any, callback: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const searchDataT = await getAllUsers({
          user: inputValue,
          page: 1,
          count: 1000,
        });
        const sdata = searchDataT.data?.data?.users.map((data: any) => ({
          label: `${ucFirst(data?.firstName)} ${ucFirst(data.lastName)}`,
          value: data?.id,
        }));

        setTimeout(() => {
          if (sdata?.length) {
            callback([{ label: "Default", value: "" }, , ...sdata]);
            resolve([{ label: "Default", value: "" }, , ...sdata]);
          } else {
            reject(new Error("No data available."));
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title="Transactions"
          sub="History of customer swaps and deposit transaction"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4  w-full mb-10">
        {AssetsTab.map((tab) => (
          <div key={tab.label}>
            <GridTab
              tab={tab}
              iconClass="!text-2xl"
              borderClass="!h-10  !w-10"
              labelClass="!text-xs"
              numClass="!text-xl"
              value={formatCurrencyAmt(metrics?.[tab.key] || 0, "USD")}
            />
          </div>
        ))}
      </div>{" "}
      {permissions.includes("wallets.transactions.update") && (
        <div className="flex justify-end my-6">
          <ButtonComponent
            onClick={() => setOpen(true)}
            className="!bg-white dark:!bg-gray-800 !text-secondary dark:!text-white !text-sm !border !border-[#C9C8C8] dark:!border-gray-600"
          >
            <span className="flex gap-x-2 items-center">
              <AppIcon icon="pajamas:retry" />
              <span className="hidden lg:inline">Resolve transaction</span>
            </span>
          </ButtonComponent>
        </div>
      )}
      <div>
        <AppTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
      <div className=" w-full ">
        <div className="mb-6 flex flex-col lg:flex-row gap-y-4 justify-between items-center">
          <input
            placeholder="Search transaction id"
            onChange={(e) => debouncedSearch(e.target.value)}
            className=" border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800 text-secondary dark:text-white/80 text-sm px-[14px] py-[10px] rounded lg:max-w-[280px] w-full"
          />
          <div className="flex flex-col lg:flex-row gap-y-2 gap-x-2 items-center w-full lg:w-auto">
            <Select
              className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px]"
              options={TransactionOptions}
              placeholder="Select status"
              onChange={handleStatus}
              value={queryParams.status}
            />
            {activeTab === "transaction" ? (
              <>
                <Select
                  className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[130px] w-full"
                  options={currencies}
                  placeholder="Select token"
                  onChange={handleCurrency}
                  value={queryParams.currency}
                />
                <Select
                  className=" border border-gray-100 dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  text-sm px-[14px] py-[7px] rounded min-w-[180px]"
                  options={TypeData}
                  placeholder="Select type"
                  onChange={handleType}
                  value={queryParams.transactionType}
                />
              </>
            ) : (
              <div className="border border-[#EAECF0] rounded-[6px]  dark:border-gray-500 bg-transparent bg-white dark:bg-gray-800  flex gap-x-4 items-center">
                <Select
                  className=" !border-none  bg-transparent bg-white dark:bg-gray-800  text-sm px-0 py-0 rounded min-w-[120px]"
                  options={currencies}
                  placeholder="From token"
                  onChange={handleCurrency}
                  value={queryParams.fromCurrency}
                />{" "}
                <span className="flex items-center w-[42px] h-[42px] justify-center rounded-[6px]">
                  <AppIcon
                    icon="solar:transfer-horizontal-linear"
                    iconClass="!text-secondary/60 dark:text-white/70"
                  />
                </span>
                <Select
                  className=" !border-none  bg-transparent bg-white dark:bg-gray-800  text-sm px-0 py-0 rounded min-w-[120px]"
                  options={currencies}
                  placeholder="To token"
                  onChange={handleCurrency}
                  value={queryParams.toCurrency}
                />
              </div>
            )}

            <SearchSelect loadOptions={loadOptions} onChange={handleUsers} />
            <Datepicker
              showShortcuts
              useRange={false}
              showFooter
              value={value}
              // @ts-ignore
              onChange={handleValueChange}
              placeholder="Filter dates"
              inputClassName="border w-full px-3 py-[10px] rounded bg-white dark:bg-gray-800 text-secondary dark:text-white/80 border-gray-100 dark:border-gray-500"
              containerClassName="rounded-lg relative text-sm w-full lg:w-[200px] min-w-[200px] text-secondary z-[99]"
            />
          </div>
        </div>
        <TableCard
          columns={
            activeTab === "swap" ? OverviewSwapHeader : OverviewTokenHeader
          }
          rows={rows}
          isLoading={loading}
          queryParams={queryParams}
          setQueryParams={(data: any) => setQueryParams(data)}
        />
      </div>
      <SideModal setOpen={setSideOpen} open={isSideOpen}>
        <Transaction detail={detail} />
      </SideModal>
      <CenterModal setOpen={setOpen} open={isOpen} canClose={true}>
       <ResolveForm />
      </CenterModal>
    </section>
  );
}
