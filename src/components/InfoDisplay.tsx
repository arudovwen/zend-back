import React from "react";

export default function InfoDisplay({ info }: any) {
  return (
    <div className="p-4 rounded-lg flex justify-between items-center text-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 ">
      <span className="text-secondary/80 text-secondary dark:text-white/80">
        {info.label}
      </span>
      <span className="text-secondary dark:text-white">-</span>
    </div>
  );
}