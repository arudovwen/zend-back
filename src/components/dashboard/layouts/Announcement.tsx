"use client";
import React, { useState } from "react";
import ButtonComponent from "@/components/ButtonComponent";
import AppIcon from "@/components/AppIcon";
import CenterModal from "@/components/modals/CenterModal";

export default function Announcement() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div>
        <ButtonComponent
          onClick={() => setOpen(true)}
          className="!bg-white dark:!bg-gray-800 !text-secondary dark:!text-white !text-sm !border !border-[#C9C8C8] dark:!border-gray-600 "
        >
          <span className="flex gap-x-2 items-center">
            <AppIcon icon="grommet-icons:announce" />{" "}
            <span className="hidden lg:inline">Broadcast</span>
          </span>{" "}
        </ButtonComponent>
      </div>
      <CenterModal setOpen={() => {}} open={isOpen}>
        <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white p-6 rounded-lg"></div>
      </CenterModal>
    </div>
  );
}
