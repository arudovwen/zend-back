"use client";
import React, { useState } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { PersonalSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import AppButton from "@/components/AppButton";
import Image from "next/image";

export default function Account() {
    const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonalSchema),
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data);
    // router.push("/verify");
  };
  return (
    <div className="max-w-[800px]">
      <div className="flex  flex-col md:flex-row gap-6 justify-start lg:justify-between lg:items-center mb-12">
        <div className="flex  flex-col md:flex-row gap-4 items-center text-center sm:text-left">
          <div className="overflow-hidden h-20 lg:h-28 w-20 lg:w-28 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-semibold">
            <Image
              alt="avatar"
              src="/ava.png"
              width={120}
              height={120}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div>
            <div className="mb-4">
              <span className="block font-medium text-sm text-secondary dark:text-white/90">
                John Snow
              </span>
              <span className="block text-xs text-secondary/80 dark:text-gray-400">
                johnsnoe@email.com
              </span>
            </div>
            <div className="flex gap-x-3 items-center">
              <span className="px-[14px] py-[5px] rounded-full border border-blue-300 bg-blue-50 dark:bg-transparent text-xs text-blue-700 dark:text-blue-300">
                Superadmin
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 items-center justify-center md:justify-start">
          <AppButton
            text="Upload"
            icon="solar:upload-minimalistic-linear"
            type="button"
          />
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-sm text-secondary dark:text-white/80 mb-6">Personal information</h2>

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
          <div className="mb-6">
            <FormField
              label="Email address"
              name="email"
              placeholder=""
              type="email"
              register={register}
              errors={errors.email}
              maxW="max-w-none"
            />
          </div>
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            <FormField
              label="Username"
              name="username"
              placeholder=""
              register={register}
              errors={errors.username}
              maxW="max-w-none"
            />
            <FormField
              label="Phone number"
              name="phoneNumber"
              placeholder=""
              register={register}
              errors={errors.phoneNumber}
              maxW="max-w-none"
            />
          </div>
         
        
          <div className="flex gap-x-5 items-center">
           
            <ButtonComponent
              className="text-center !bg-primary !text-white items-center !border-primary !text-sm"
              type="submit"
              isLoading={loading}
            >
               Save information
            </ButtonComponent>
          </div>
        </form>
      </div>
    </div>
  );
}
