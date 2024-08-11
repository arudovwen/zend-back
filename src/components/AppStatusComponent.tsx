import React, { useState, useEffect } from "react";

function StatusSpan({ status, type, stattype = "default" }: any) {
  const StatusClass = {
    0: "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]",
    1: "text-[#067647] bg-[#ECFDF3] border-[#ABEFC6]",
    2: "text-[#175CD3] bg-[#EFF8FF] border-[#B2DDFF]",
    3: "text-[#363F72] bg-transparent dark:bg-[#3E4784] border-[#3E4784] dark:text-white/60",
    4: "text-[#B42318] bg-[#FEF3F2] border-[#FECDCA]",
    5: "text-[#5925DC] bg-[#F4F3FF] border-[#D9D6FE]",
  };

  const TextStatusText = {
    pending: {
      text: "Pending",
      className: StatusClass[0],
    },

    active: {
      text: "Active",
      className: StatusClass[1],
    },
    approved: {
      text: "Approved",
      className: StatusClass[1],
    },
    enabled: {
      text: "Enabled",
      className: StatusClass[1],
    },
    disabled: {
      text: "Disabled",
      className: StatusClass[4],
    },
    success: {
      text: "Success",
      className: StatusClass[1],
    },
    rejected: {
      text: "Cancelled",
      className: StatusClass[4],
    },
    declined: {
      text: "Declined",
      className: StatusClass[4],
    },
    banned: {
      text: "Banned",
      className: StatusClass[4],
    },

    disputed: {
      text: "Disputed",
      className: StatusClass[3],
    },
    failed: {
      text: "Failed",
      className: StatusClass[4],
    },
    locked: {
      text: "Locked",
      className: StatusClass[3],
    },
    close: {
      text: "Close",
      className: StatusClass[4],
    },
    default: {
      text: "Close",
      className: StatusClass[3],
    },
  };

  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    if (stattype === "default") {
      setStats(TextStatusText);
    }
  }, [stattype]);

  const className = `px-2 py-[2px] text-xs rounded-full flex gap-x-1 items-center border max-w-max font-semibold ${stats[status]?.className}`;

  return (
    <span className={className}>
      {/* Replace with your AppIcon component */}
      {/* <AppIcon icon="octicon:dot-fill-24" /> */}
      <span>{stats[status]?.text}</span>
    </span>
  );
}

export default StatusSpan;
