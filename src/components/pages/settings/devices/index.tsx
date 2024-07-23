import React from "react";
import DeviceInfo from "@/components/DeviceInfo";
import HeaderComponent from "@/components/HeaderComponent";


export default function Devices() {
  return (
    <div className="max-[968px]">
      <div className="mb-10">
     <HeaderComponent title="Device Management" sub="Manage your list of devices" />
     </div>
      <div className="grid grid-cols-1 gap-y-6">
        <DeviceInfo />
      </div>
    </div>
  );
}
