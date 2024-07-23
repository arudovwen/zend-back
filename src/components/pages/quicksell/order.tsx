import React from "react";
import { OrderInformationData } from "@/constants";
import Breadcrumbs from "@/components/Breadcrumbs";
import InfoDisplay from "@/components/InfoDisplay";
import AppButton from "@/components/AppButton";
import HeaderComponent from "@/components/HeaderComponent";

export default function OrderComponent() {
  return (
    <div className="max-w-[986px] mx-auto pb-10">
      <div className="mb-10">
        <HeaderComponent
          title="Quick sell"
          sub={
            <Breadcrumbs
              links={[
                {
                    title: "Ads",
                    url: "/dashboard/quick-sell",
                  },
                {
                  title: "Orders",
                  url: "/dashboard/quick-sell/orders",
                },
                {
                  title: "John Snow",
                  url: "#",
                },
                {
                  title: "42455666666",
                  url: "#",
                },
              ]}
            />
          }
        />
    
      </div>

      <div className="grid grid-cols-1 gap-y-10 ">
        {OrderInformationData.map((i) => (
          <div key={i.label}>
            <h2 className="text-xs font-semibold mb-4">{i.label}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {i.data.map((j) => (
                <div key={j.label}>
                  <div>
                    <InfoDisplay info={j} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="mt-[10px] flex justify-end gap-x-4">
          {" "}
          <AppButton text="Update status" />{" "}
          <AppButton text="See chat" icon="solar:chat-line-linear" />
        </div>
      </div>
    </div>
  );
}
