"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schema";
import AppIcon from "@/components/AppIcon";
import ButtonComponent from "@/components/ButtonComponent";
import { loginAdmin } from "@/services/authservice";
import { setItem } from "@/utils/localStorageControl";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
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

    loginAdmin(data)
      .then((res) => {
        if (res.status === 200) {
          setItem("userData", res?.data?.data?.administrator);
          router.push("/verify");
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || err?.response?.data?.Message
        );
        setLoading(false);
      });
  };
  return (
    <div className="py-4">
      {" "}
      <h1 className="font-semibold text-xl text-center mb-1 text-secondary dark:text-white">
        Welcome Back
      </h1>
      <p className="text-sm text-secondary dark:text-white/80 text-center mb-6">
        Access your account to manage the platform
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-6">
          <FormField
            label="Email"
            name="emailAddress"
            placeholder="Provide your email"
            icon={<AppIcon icon="line-md:email" />}
            type="email"
            register={register}
            errors={errors.emailAddress}
            maxW="max-w-none"
          />
        </div>
        <div className="mb-10">
          <FormField
            label="Password"
            name="password"
            placeholder="Provide your password"
            icon={true}
            type="password"
            register={register}
            errors={errors.password}
            maxW="max-w-none"
          />
        </div>
        <div>
          <ButtonComponent
            className="w-full text-center !bg-primary !text-white items-center"
            type="submit"
            isLoading={loading}
          >
            Login
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
}
