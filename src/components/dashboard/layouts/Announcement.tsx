import React from "react";
import ButtonComponent from "@/components/ButtonComponent";
import AppIcon from "@/components/AppIcon";

export default function Announcement() {
  return (
    <div>
      <div>
        <ButtonComponent className="!bg-white dark:!bg-gray-800 !text-secondary dark:!text-white !text-sm !border !border-[#C9C8C8]"><span className="flex gap-x-2 items-center"><AppIcon icon="grommet-icons:announce" /> Announcement</span> </ButtonComponent>
      </div>
    </div>
  );
}
