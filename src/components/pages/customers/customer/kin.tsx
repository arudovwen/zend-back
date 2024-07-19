"use client";
import React, { useState } from "react";
import { KinData } from "@/constants";
import KinForm from "./modals/KinForm";
import AppButton from "@/components/AppButton";
import InfoDisplay from "@/components/InfoDisplay";
export default function Kin() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="font-semibold text-sm">Next of kin information</h2>
        <div>
          {" "}
          <AppButton
            text="Edit"
            btnClass="!text-xs !py-[6px] !px-[8px]"
            icon="solar:pen-2-linear"
            iconClass="text-sm"
            type="button"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {KinData.map((i) => (
          <div key={i.label}>
            <InfoDisplay info={i} />
          </div>
        ))}
      </div>
      <KinForm setOpen={setOpen} isOpen={isOpen} />
    </div>
  );
}
