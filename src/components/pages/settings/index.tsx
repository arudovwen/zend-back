"use client";
import React, { useState } from "react";
import AppTab from "@/components/AppTab";
import HeaderComponent from "@/components/HeaderComponent";
import Account from "./account";
import Rates from "./rate";
import Roles from "./roles";
import Security from "./security";
import Devices from "./devices";

export default function SettingsComponent() {
  const tabs = [
    { title: "Account information", key: "account", component: <Account /> },
    // { title: "Roles & Permissions", key: "roles", component: <Roles /> },
    { title: "Devices", key: "devices", component: <Devices /> },
    { title: "Security", key: "security", component: <Security /> },
    { title: "Rate settings", key: "rate", component: <Rates /> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <section>
      <div className="mb-10">
        <HeaderComponent
          title="Settings"
          sub="Configure your account and preferences"
        />
      </div>
      <div>
        <AppTab tabs={tabs} setActiveTab={setActiveTab} activeTab={activeTab} />
      </div>
      <div className="max-w-[968px]">{tabs.find((i) => i.key === activeTab)?.component}</div>
    </section>
  );
}
