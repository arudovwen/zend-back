import React from "react";

export default function HeaderComponent({ title, sub, count = 0 }: any) {
  return (
    <div>
      <h1 className="text-base font-semibold text-secondary dark:text-white capitalize mb-[4px] flex gap-x-4 items-center">
        {title}{" "}
        {count > 0 && (
          <span className="text-xs max-w-max min-w-[20px] font-medium flex items-center justify-center text-secondary dark:text-white/70 px-2 bg-gray-blue-100 dark:bg-gray-700 border border-[#EAECF0] dark:border-gray-700 rounded-full">
            {count}
          </span>
        )}
      </h1>
      {sub && (
        <p className="text-xs text-secondary dark:text-white/80">{sub}</p>
      )}
    </div>
  );
}
