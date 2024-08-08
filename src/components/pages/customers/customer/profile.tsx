"use client";
import React, { useContext, useState } from "react";
import LockForm from "./modals/LockForm";
import AppButton from "@/components/AppButton";
import AppStatusComponent from "@/components/AppStatusComponent";
import Image from "next/image";
import { UserContext } from "@/constants/context";

export default function Profile() {
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState<"ban" | "unlock" | "lock" | "unban">("lock");
  const { userData, loading } = useContext(UserContext);

  function getLevel() {
    if (
      userData.hasVerifiedPhoneNumber &&
      userData.hasVerifiedEmailAddress &&
      userData.hasVerifiedGovernmentId
    ) {
      if (userData.country.toLowerCase() === "nigeria") {
        if (userData.hasVerifiedBvn) {
          if (userData.hasVerifiedAddress) {
            return 3;
          }
        } else {
          return 1;
        }
      } else {
        if (userData.hasVerifiedAddress) {
          return 3;
        }
      }
    } else {
      return 0;
    }
  }

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
              <span className="px-2 py-[2px] text-xs rounded-full border border-blue-300 dark:bg-transparent bg-blue-50  text-blue-700 dark:text-blue-300">
                Level {getLevel()}
              </span>
              <AppStatusComponent
                status={
                  userData.isBanned
                    ? "banned"
                    : userData.isLocked
                    ? "locked"
                    : "active"
                }
              />
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
            setType(userData?.isBanned ? "unban" : "ban");
            setOpen(true);
          }}
        />
        <AppButton
          text="Lock Account"
          icon="solar:lock-keyhole-minimalistic-linear"
          type="button"
          onClick={() => {
            setType(userData?.isLocked ? "unlock" : "lock");
            setOpen(true);
          }}
        />
      </div>
      {isOpen && (
        <LockForm
          setOpen={setOpen}
          isOpen={isOpen}
          type={type}
          detail={{
            name: `${userData.firstName} ${userData.lastName}`,
            email: userData.emailAddress,
            id: userData.id,
          }}
        />
      )}
    </div>
  );
}
