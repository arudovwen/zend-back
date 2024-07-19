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

interface FormData {
  reason: string;
}

interface KinFormProps {
  setOpen: (open: boolean) => void;
  isOpen: boolean;
  type: "ban" | "unlock" | "lock" | "unban"; // Adjusted type definition based on usage
}

const KinForm: React.FC<KinFormProps> = ({ setOpen, isOpen, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    reason: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(LockSchema),
    defaultValues: formData, // Use defaultValues instead of initialValue
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    console.log("Form data:", data);
    // Perform your form submission logic here
    toast.success(`Form submitted successfully!`);
    setLoading(false);
    setOpen(false); // Example of closing modal after successful submission
  };

  const data = [
    {
      label: "Full name",
    },
    {
      label: "Email address",
    },
  ];

  return (
    <CenterModal setOpen={() => setOpen(false)} open={isOpen}>
      <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white py-8 px-8 rounded-lg">
        <div>
          <Image
            width={120}
            height={120}
            src={type === "ban" ? "/ban.svg" : "/dlock.svg"}
            alt="lock"
            className="block mx-auto mb-6"
          />
        </div>
        <h2 className="font-semibold text-xl mb-2 text-center capitalize">
          {type === "ban" ? "Ban" : "Unlock"} User Account
        </h2>
        <p className="text-xs mb-10 text-[#555555] dark:text-white/70 max-w-[465px] text-center">
          Are you sure you want to {type === "ban" ? "ban" : "unlock"} this
          user&apos;s account? This action will temporarily restrict the user
          from accessing their account.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid grid-cols-1 gap-y-3 mb-6">
            {data.map((i, index) => (
              <div key={i.label}>
                <InfoDisplay info={i} />
              </div>
            ))}
          </div>

          <div className="mb-10">
            <TextField
              label={`Reason for ${type === "ban" ? "banning" : "unlocking"}`}
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
              isLoading={loading}
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

export default KinForm;
