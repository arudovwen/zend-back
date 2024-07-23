import React, { useState } from "react";
import AppButton from "@/components/AppButton";
import Image from "next/image";
export default function Account() {
  return (
  <div className="max-w-[1024px]">
      <div className="flex  flex-col md:flex-row gap-6 justify-start lg:justify-between lg:items-center">
      <div className="flex  flex-col md:flex-row gap-4 items-center text-center sm:text-left">
        <div className="overflow-hidden h-20 lg:h-28 w-20 lg:w-28 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-semibold">
          <Image
            alt="avatar"
            src="/ava.png"
            width={120}
            height={120}
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
        <div>
          <div className="mb-4">
            <span className="block font-medium text-sm text-secondary dark:text-white/90">John Snow</span>
            <span className="block text-xs text-secondary/80 dark:text-gray-400">
              johnsnoe@email.com
            </span>
          </div>
          <div className="flex gap-x-3 items-center">
            <span className="px-[14px] py-[5px] rounded-full border border-blue-300 bg-blue-50 dark:bg-transparent text-xs text-blue-700 dark:text-blue-300">
              Superadmin
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 items-center justify-center md:justify-start">
        <AppButton
          text="Upload"
          icon="solar:upload-minimalistic-linear"
          type="button"
        
        />
       
      </div>
    
    </div>
  </div>
  );
  
}
