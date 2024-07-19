import React from "react";
import { Icon } from "@iconify/react";

export default function AppIcon({ icon, iconClass }: any) {
  return (
    <>
      <Icon icon={icon} className={iconClass} />
    </>
  );
}
