import type { Metadata } from "next";
import React from "react";
import CustomersComponent from "@/components/pages/customers/list";

export const metadata: Metadata = {
  title: "Customers | Zendwallet Backoffice",
  description: "Customers on  Zendwallet",
};

export default function Customers() {
  return (
    <div>
      <CustomersComponent />
    </div>
  );
}
