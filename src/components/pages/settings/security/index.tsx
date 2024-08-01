"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { LoginSchema } from "@/schema";
import AppIcon from "@/components/AppIcon";
import ButtonComponent from "@/components/ButtonComponent";
import HeaderComponent from "@/components/HeaderComponent";

export default function Security() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data);
  };
  return (
    <div className=" px-7 py-10 rounded-lg bg-white  dark:bg-gray-800 dark:border-gray-600  border border-[#EAECF0]">
     <div className="mb-10">
     <HeaderComponent title="Password Management" sub="Update your account password here" />
     </div>
      {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      <div >
          <FormField
            label="Old Password"
            name="password"
            placeholder=""
            icon={true}
            type="password"
            register={register}
            errors={errors.password}
            maxW="max-w-none"
          />
        </div>
        <div >
          <FormField
            label="New Password"
            name="password"
            placeholder=""
            icon={true}
            type="password"
            register={register}
            errors={errors.password}
            maxW="max-w-none"
          />
        </div>
        <div >
          <FormField
            label="Confirm Password"
            name="password"
            placeholder=""
            icon={true}
            type="password"
            register={register}
            errors={errors.password}
            maxW="max-w-none"
          />
        </div>
      </div>
        <div>
          <ButtonComponent
            className="text-center !bg-primary !text-white items-center"
            type="submit"
            isLoading={loading}
          >
            Update password
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
}
