"use client";
import React, { useState } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { PersonalSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";

export default function KinForm({ setOpen, isOpen, data }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonalSchema),
    defaultValues: data,
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data);
    // router.push("/verify");
  };
  return (
    <CenterModal setOpen={() => {}} open={isOpen}>
      <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white py-8 px-8 rounded-lg">
        <h2 className="font-semibold text-xl mb-10 text-center">
          Update Personal information
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
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            <FormField
              label="Phone number"
              name="phoneNumber"
              placeholder=""
              register={register}
              errors={errors.phoneNumber}
              maxW="max-w-none"
            />
            <FormField
              label="Date of birth"
              name="dateOfBirth"
              placeholder=""
              register={register}
              errors={errors.dateOfBirth}
              maxW="max-w-none"
              type="date"
            />
          </div>
          <div className="mb-6">
            <FormField
              label="Email address"
              name="emailAddress"
              placeholder=""
              type="email"
              register={register}
              errors={errors.emailAddress}
              maxW="max-w-none"
            />
          </div>
          <div className="mb-10">
            <FormField
              label="Home address"
              name="address"
              placeholder=""
              register={register}
              errors={errors.address}
              maxW="max-w-none"
            />
          </div>

          <div className="flex gap-x-5 items-center">
            <ButtonComponent
              onClick={() => setOpen(false)}
              className="w-full text-center !bg-transparent !border !border-gray-200 !text-secondary dark:!text-white/80  items-center"
              type="submit"
              isLoading={loading}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              className="w-full text-center !bg-primary !text-white items-center"
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
