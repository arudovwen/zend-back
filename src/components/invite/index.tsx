"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { useRouter } from "next/navigation";
import { CreateAdminSchema } from "@/schema";
import AppIcon from "@/components/AppIcon";
import ButtonComponent from "@/components/ButtonComponent";

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
    resolver: yupResolver(CreateAdminSchema),
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data);
    router.push("/verify");
  };
  return (
    <div className="py-4 w-full">
      {" "}
      <h1 className="font-semibold text-xl text-center mb-1 text-secondary dark:text-white">
        Welcome Back
      </h1>
      <p className="text-sm text-secondary text-center mb-6">
        You&apos;ve been invited to join as an admin. Please set up your account
        to get started.
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
        <div className="mb-6">
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
        <div className="mb-10">
          <FormField
            label="Confrim Password"
            name="confirmpassword"
            placeholder="Confirm your password"
            icon={true}
            type="password"
            register={register}
            errors={errors.confirmpassword}
            maxW="max-w-none"
          />
        </div>
        <div className="mb-4">
          <Link href="/dashboard">
            <ButtonComponent
              className="w-full text-center !bg-primary !text-white items-center"
              type="submit"
              isLoading={loading}
            >
              Register
            </ButtonComponent>
          </Link>
        </div>
        <div className="text-sm text-primary font-medium text-center">
          <Link href="/">Login as admin</Link>
        </div>
      </form>
    </div>
  );
}
