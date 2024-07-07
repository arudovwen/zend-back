import React from "react";
import { Icon } from "@iconify/react";

export default function AppIcon({ icon, iconClass }: any) {
  return (
    <div>
      <Icon icon={icon} className={iconClass} />
    </div>
  );
}
