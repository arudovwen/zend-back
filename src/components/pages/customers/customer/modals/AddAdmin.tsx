"use client";
import React, { useState, useContext } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { AddAdminSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import { createAdmin } from "@/services/userservice";

export default function AddAdminForm({ setOpen, isOpen,refresh }: any) {

  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddAdminSchema),
  
  });
  const onSubmit = (data: any) => {
    setLoading(true);

    createAdmin({ ...data})
      .then((res) => {
        if (res.status === 200) {
        
          toast.success("Request successful");
          setLoading(false);
          setOpen(false);
          refresh()
        }
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || "Process failed");
      });
  };
  return (
    <CenterModal setOpen={() => {}} open={isOpen}>
      <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white pt-6 pb-10 px-8 rounded-lg">
        <h2 className="font-semibold text-xl mb-10 text-center">
         Create Admin
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            <FormField
              label="First name"
              name="firstName"
              placeholder=""
              register={register}
              errors={errors.firstName}
              maxW="max-w-none"
            />
            <FormField
              label="Last name"
              name="lastName"
              placeholder=""
              register={register}
              errors={errors.lastName}
              maxW="max-w-none"
            />
          </div>
          <div className="mb-6 lg:col-span-2">
            <FormField
              label="Email address"
              name="emailAddress"
              placeholder=""
              register={register}
              errors={errors.emailAddress}
              maxW="max-w-none"
            />
          </div>
          <div className="flex gap-x-5 items-center">
            <ButtonComponent
              onClick={() => setOpen(false)}
              className="w-full text-center !bg-transparent !border !border-[#EAECF0] !text-secondary dark:!border-gray-600 dark:!text-white/80  items-center"
              type="button"
              disabled={loading}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              className="w-full text-center !bg-primary !border-primary !text-white items-center"
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
}
