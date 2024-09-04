import React, { useState } from "react";
import CenterModal from "@/components/modals/CenterModal";
import ButtonComponent from "@/components/ButtonComponent";
import AppIcon from "@/components/AppIcon";

interface LockFormProps {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  loading?: boolean;
  onProceed?: any;
}

const Confirm: React.FC<LockFormProps> = ({
  setOpen,
  isOpen,
  loading,
  onProceed,
}: any) => {
  return (
    <CenterModal setOpen={() => setOpen(false)} open={isOpen}>
      <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white py-8 px-8 rounded-lg md:min-w-[400px]">
        <AppIcon icon="" />
        <h2 className="font-semibold text-xl mb-2 text-center capitalize">
          Confirm Action
        </h2>
        <p className="text-base mb-10 text-[#555555] dark:text-white/70 max-w-[465px] text-center">
          Are you sure you want to proceed with this action?
        </p>
        <div className="flex gap-x-5 items-center">
          <ButtonComponent
            className="w-full text-center !border !border-primary !bg-primary !text-white items-center"
            type="button"
            onClick={onProceed}
            isLoading={loading}
          >
            Yes
          </ButtonComponent>
          <ButtonComponent
            onClick={() => setOpen(false)}
            className="w-full text-center !bg-transparent !border !border-[#EAECF0] !text-secondary dark:!text-white/80  items-center"
            type="button" // Changed to "button" type for cancel button
          >
            Cancel
          </ButtonComponent>
        </div>
      </div>
    </CenterModal>
  );
};

export default Confirm;
