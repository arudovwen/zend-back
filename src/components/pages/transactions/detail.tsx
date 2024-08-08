import { formatCurrency } from "@/utils/methods";
import React from "react";

const TransactionDetailRow = ({ label, value, className = "" }: any) => (
  <>
    {value && (
      <div className="flex justify-between gap-x-20">
        <div className={`font-medium text-gray-500 ${className}`}>{label}</div>
        <div className="col-span-2 text-right  max-w-[200px] break-all">{value}</div>
      </div>
    )}
  </>
);

export default function Transaction({ detail }: any) {
 
  const transactionRows = [
    { label: "Transaction", value: detail?.type },
    { label: "Type", value: detail?.transactionType },
    { label: "Name", value: detail?.name },
    { label: "Date", value: detail?.date },
    { label: "Token", value:detail?.token  ||  detail?.tokenSwapped || detail?.token },
    { label: "Amount", value: detail?.amount },
    { label: "Address", value: detail?.toAddr },
    { label: "Chain", value: detail?.chain },
    {
      label: "Fee",
      value: detail?.fee,
    },
    { label: "Memo", value: detail?.memo },
    { label: "Rate", value: detail?.rate },
    {
      label: "Value in USD",
      value: detail?.usdValue && `${formatCurrency(detail?.usdValue)} USD`,
    },
    {
      label: "Transaction ID",
      value: detail?.transactionId,
    },
    { label: "Status", value: detail?.status },
  ];

  return (
    <div className="p-6 text-secondary mt-4 min-w-[400px]">
      <h1 className="text-base font-semibold mb-6">Transaction Detail</h1>
      <div className="grid grid-cols-1 gap-y-4 text-sm">
        {transactionRows.map((row, index) => (
          <TransactionDetailRow
            key={index}
            label={row.label}
            value={row.value}
          />
        ))}
      </div>
      
    </div>
  );
}
