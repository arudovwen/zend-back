import React from "react";
import { navigations } from "@/constants";
import { usePathname } from "next/navigation";

export default function RouteName() {
  const pathname = usePathname();
  return (
    <span className="font-semibold text-sm lg:text-base">
      {navigations.find((i: any) => i.url === pathname)?.label}
    </span>
  );
}
