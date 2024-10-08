"use client";
import React, { useContext, useState } from "react";
import Profile from "@/components/pages/customers/customer/profile";
import WalletBalance from "@/components/pages/customers/customer/walletbalance";
import { PersonalInformationData } from "@/constants";
import AppButton from "@/components/AppButton";
import InfoDisplay from "@/components/InfoDisplay";
import InformationForm from "./modals/InformationForm";
import { PageContext, UserContext } from "@/constants/context";

export default function Personal() {
  const { permissions } = useContext(PageContext);
  const [isOpen, setOpen] = useState(false);
  const { userData } = useContext(UserContext);

  return (
    <div className="max-w-[900px] mx-auto pb-10">
      <div className="mb-6">
        <Profile />
      </div>
      <div className="mb-12">
        <WalletBalance />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full items-center mb-4">
          <h2 className="font-semibold text-sm text-secondary dark:text-white/80">
            Personal information
          </h2>
          {permissions.includes("accounts.users.update") && (
            <div>
              {" "}
              <AppButton
                type="button"
                onClick={() => setOpen(true)}
                text="Edit"
                btnClass="!text-xs !py-[6px] !px-[8px]"
                icon="solar:pen-2-linear"
                iconClass="text-sm"
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PersonalInformationData.map((i) => (
            <div key={i.label}>
              <InfoDisplay info={i} data={userData} />
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <InformationForm setOpen={setOpen} isOpen={isOpen} data={userData} />
      )}
    </div>
  );
}
