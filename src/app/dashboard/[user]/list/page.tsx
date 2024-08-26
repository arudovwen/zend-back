import type { Metadata } from "next";
import React from "react";
import CustomersComponent from "@/components/pages/customers/list";

export const metadata: Metadata = {
  title: "Users | Zendwallet Backoffice",
  description: "Users on  Zendwallet",
};

export default function Customers() {
  return (
    <div>
      <CustomersComponent />
    </div>
  );
}
