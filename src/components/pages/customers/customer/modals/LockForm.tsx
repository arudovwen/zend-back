import React, { useState } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import TextField from "@/components/forms/TextField";
import { LockSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import Image from "next/image";
import InfoDisplay from "@/components/InfoDisplay";
import {
  banUser,
  unbanUser,
  unlockUser,
  lockUser,
  banAdmin,
  unbanAdmin,
} from "@/services/userservice";
import { ucFirst } from "@/utils/methods";
import BanSvg from "@/assets/svgs/ban";
import LockSvg from "@/assets/svgs/lock";
import { updateWithdrawal, enableWithdrawal } from "@/services/walletservice";

interface FormData {
  reason: string;
  id: string;
  user?: any;
}

interface LockFormProps {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  type: string; // Adjusted type definition based on usage
  detail?: any;
  userType?: any;
  lockType?: any;
  user?: any;
  onClose?: any;
}

const LockForm: React.FC<LockFormProps> = ({
  setOpen,
  isOpen,
  type,
  detail,
  userType = "customers",
  lockType = "account",
  user,
  onClose,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData] = useState<FormData>({
    reason: "",
    id: detail?.id,
    user,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(LockSchema),
    defaultValues: formData, // Use defaultValues instead of initialValue
  });
  const methods: any = {
    ban: banUser,
    unban: unbanUser,
    lock: lockUser,
    unlock: unlockUser,
    enable: updateWithdrawal,
    disable: updateWithdrawal,
  };
  const adminmethods: any = {
    ban: banAdmin,
    unban: unbanAdmin,
  };
  const onSubmit = (data: FormData) => {
    setLoading(true);
    // Perform your form submission logic here
    (userType === "customers" ? methods : adminmethods)
      [type]({ ...data, type })
      .then((res: any) => {
        if (res.status === 200) {
          toast.success(`${ucFirst(type)} Request submitted successfully!`);
          setLoading(false);
          onClose && onClose();
          setOpen(false); // Example of closing modal after successful submission
        }
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || "Process failed");
      });
  };
  const data = [
    {
      label: "Full name",
      key: "name",
    },
    {
      label: "Email address",
      key: "email",
    },
  ];

  return (
    <CenterModal setOpen={() => setOpen(false)} open={isOpen}>
      <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white py-8 px-8 rounded-lg">
        <div className="flex justify-center mb-4">
          {type === "ban" || type === "unban" ? <BanSvg /> : <LockSvg />}
        </div>
        <h2 className="font-semibold text-xl mb-2 text-center capitalize">
          {type} User {lockType}
        </h2>
        <p className="text-xs mb-10 text-[#555555] dark:text-white/70 max-w-[465px] text-center">
          Are you sure you want to {type} this user&apos;s {lockType}?{" "}
          {lockType.includes(["lock", "disabled", "bane"]) && (
            <span>
              This action will temporarily restrict the user from accessing
              their {lockType}.
            </span>
          )}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 gap-y-3 mb-6">
            {data.map((i, index) => (
              <div key={i.label}>
                <InfoDisplay info={i} data={detail} />
              </div>
            ))}
          </div>

          <div className="mb-10">
            <TextField
              label={`Reason for ${type}`}
              name="reason"
              placeholder=""
              register={register}
              errors={errors?.reason}
              icon={undefined}
            />
          </div>

          <div className="flex gap-x-5 items-center">
            <ButtonComponent
              onClick={() => setOpen(false)}
              className="w-full text-center !bg-transparent !border !border-gray-200 !text-secondary dark:!text-white/80  items-center"
              type="button" // Changed to "button" type for cancel button
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              className="w-full text-center !border !border-primary !bg-primary !text-white items-center"
              type="submit"
              isLoading={loading}
            >
              Submit
            </ButtonComponent>
          </div>
        </form>
      </div>
    </CenterModal>
  );
};

export default LockForm;
