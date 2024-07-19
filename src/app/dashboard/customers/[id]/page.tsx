import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Customer() {
  return (
    <div>
      <Breadcrumbs
        links={[
          {
            title: "Customers",
            url: "/dashboard/customers",
          },
          {
            title: "John snow",
            url: "#",
          },
        ]}
      />
    </div>
  );
}
