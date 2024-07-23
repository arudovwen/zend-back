import React from "react";
import DeviceInfo from "@/components/DeviceInfo";
export default function Devices() {
  return (
    <div >
      <h2 className="font-semibold text-sm mb-6">Devices information</h2>

      <div className="grid grid-cols-1 gap-y-6">
       <DeviceInfo />
      </div>
    </div>
  );
}
