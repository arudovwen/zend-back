"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { useRouter } from "next/navigation";
import { VerifyLoginSchema } from "@/schema";
import AppIcon from "@/components/AppIcon";
import ButtonComponent from "@/components/ButtonComponent";

export default function VerifyLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [verifying, setVerifying] = useState(true);
  const [counter, setCounter] = useState(50);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(VerifyLoginSchema),
  });
  const values = getValues();
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data.otp);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (counter) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
  }, [counter]);

  function handleSendOtp() {}
  return (
    <div className="py-4">
      {" "}
      <div className="mb-7">
        <h1 className="font-semibold text-xl text-center mb-1 text-secondary dark:text-white">
          Verify Login
        </h1>
        <p className="text-sm text-light text-secondary  dark:text-white/80">
          Kindly enter the OTP code sent to your email
          <span> succyy**** </span>
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <FormField
            label=""
            name="otp"
            placeholder="Provide your otp"
            register={register}
            errors={errors.otp}
            trigger={trigger}
            setValue={setValue}
            value={values.otp}
            isOtp={true}
          />
        </div>

        <div className="mb-6 text-secondary dark:text-white/80">
          {counter === 0 ? (
            <p className="text-xs cursor-pointer text-primary" onClick={handleSendOtp}>
              <span onClick={() => setCounter(50)}> Resend Code </span>
            </p>
          ) : (
            <p className="text-xs">
              Request a new code in <span>{counter}s</span>
            </p>
          )}
        </div>

        <div>
          <ButtonComponent
            className="w-full text-center !bg-primary !text-white items-center"
            type="submit"
            isLoading={loading}
          >
            Verify
          </ButtonComponent>
        </div>
      </form>
    </div>
  );
}
