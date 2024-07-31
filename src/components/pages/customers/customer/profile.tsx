"use client";
import React, { useContext, useState } from "react";
import LockForm from "./modals/LockForm";
import AppButton from "@/components/AppButton";
import Image from "next/image";
import { UserContext } from "@/constants/context";

export default function Profile() {
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState<"ban" | "unlock" | "lock" | "unban">("lock");

  const { userData, loading } = useContext(UserContext);

  return (
    <div className="flex  flex-col md:flex-row gap-6 justify-start lg:justify-between lg:items-center">
      <div className="flex  flex-col md:flex-row gap-4 items-center text-center sm:text-left">
        <div className="overflow-hidden h-20 lg:h-28 w-20 lg:w-28 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-semibold">
          <Image
            alt="avatar"
            src={userData.image || "/ava.png"}
            width={120}
            height={120}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {!loading && (
          <div>
            <div className="mb-4">
              <span className="block font-medium text-sm text-secondary dark:text-white/90 capitalize">
                {userData?.firstName} {userData?.lastName}
              </span>
              <span className="block text-xs text-secondary/80 dark:text-gray-400">
                {userData?.emailAddress}
              </span>
            </div>
            <div className="flex gap-x-3 items-center">
              <span className="px-[14px] py-[5px] rounded-full border border-blue-300 dark:bg-transparent bg-blue-50 text-xs text-blue-700 dark:text-blue-300">
                Level 2
              </span>
              <span className="px-[14px] py-[5px] rounded-full border border-green-300 bg-green-50 dark:bg-transparent text-xs text-green-700 dark:text-green-300">
                Active
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-x-4 items-center justify-center md:justify-start">
        <AppButton
          text="Ban Account"
          icon="solar:forbidden-circle-linear"
          iconClass="text-red-500"
          type="button"
          onClick={() => {
            setType("ban");
            setOpen(true);
          }}
        />
        <AppButton
          text="Lock Account"
          icon="solar:lock-keyhole-minimalistic-linear"
          type="button"
          onClick={() => {
            setType("lock");
            setOpen(true);
          }}
        />
      </div>
      <LockForm setOpen={setOpen} isOpen={isOpen} type={type} />
    </div>
  );
}
