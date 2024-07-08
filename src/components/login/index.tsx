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
    console.log("🚀 ~ onSubmit ~ data:", data);
    router.push("/verify");
  };
  return (
    <div className="py-4">
      {" "}
      <h1 className="font-semibold text-xl text-center mb-6 text-secondary dark:text-white">
        Administrator Sign In
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <FormField
            label="Email"
            name="email"
            placeholder="Provide your email"
            icon={<AppIcon icon="line-md:email" />}
            type="email"
            register={register}
            errors={errors.email}
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
