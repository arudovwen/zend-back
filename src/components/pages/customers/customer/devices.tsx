import React from "react";
import AppIcon from "@/components/AppIcon";
export default function devices() {
  return (
    <div>
      <h2 className="font-semibold text-sm mb-6">Devices information</h2>

      <div className="grid grid-cols-1 gap-y-6">
        <div className="p-4 rounded-lg text-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600">
          <div className="flex items-start gap-x-10 text-sm justify-between mb-4">
            <div>
              <span className="items-center font-medium text-base flex gap-x-2 mb-1">
                <AppIcon icon="solar:laptop-linear" iconClass="text-lg" />
                <span className="text-primary dark:text-white"> Laptop PC</span>
              </span>

              <span className="font-medium text-sm dark:text-white/80">
                Chrome(Web) - IP : 190.23.3.4
              </span>
            </div>
            <div className="flex gap-x-4 items-center">
              <span className="text-xs border border-gray-200 rounded-full px-2 py-1">
                Locked
              </span>
              <button className="border h-7 w-7 border-gray-200 rounded-lg flex items-center justify-center">
                <AppIcon icon="solar:trash-bin-trash-linear" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-x-10 text-xs justify-between">
            <span className="font-normal text-xs text-slate-500 dark:text-white/60">
              Added: 25 December,2023
            </span>
            <span className="font-normal text-xs text-slate-500 dark:text-white/60">
              Last login: 25 December,2023 08:36 GMT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
