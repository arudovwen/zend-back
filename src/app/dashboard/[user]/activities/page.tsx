import type { Metadata } from "next";
import React from "react";
import ActivitiesComponent from "@/components/pages/customers/activities";

export const metadata: Metadata = {
  title: "User Activities | Zendwallet Backoffice",
  description: "User Activities on  Zendwallet",
};

export default function Activities() {
  return (
    <div>
      <ActivitiesComponent />
    </div>
  );
}
