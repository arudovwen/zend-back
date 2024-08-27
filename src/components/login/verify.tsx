"use client";
import { setCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { useRouter } from "next/navigation";
import { VerifyLoginSchema } from "@/schema";
import AppIcon from "@/components/AppIcon";
import ButtonComponent from "@/components/ButtonComponent";
import { verifyOtp, resendOtp } from "@/services/authservice";
import { getItem, setItem } from "@/utils/localStorageControl";

export default function VerifyLogin() {
  const [loading, setLoading] = useState<boolean>(false);
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
  const { emailAddress, id } = getItem("userData");
  const onSubmit = ({ otp }: any) => {
    setLoading(true);

    verifyOtp({ otp, administrator: id, platform: "web", email: emailAddress })
      .then((res: any) => {
        const { data } = res.data;
        if (res.status === 200 && data?.isAuthorized) {
          setItem("token", data?.accessToken);
          setCookie("token", data?.accessToken);
          router.push("/dashboard");
          setLoading(false);
          toast.success("Login successful");
        }
      })
      .catch((err: any) => {
        toast.error(
          err?.response?.data?.message || err?.response?.data?.Message
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    if (counter) {
      setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
    }
  }, [counter]);

  function handleSendOtp() {
    setCounter(50);
    const { emailAddress } = getItem("userData");
    resendOtp({ emailAddress, type: "administrator_authorization", administrator: id });
  }
  return (
    <div className="py-4 max-w-[340px] mx-auto text-center">
      {" "}
      <div className="mb-7">
        <h1 className="font-semibold text-xl text-center mb-1 text-secondary dark:text-white">
          Verify Login
        </h1>
        <p className="text-sm text-light text-secondary  dark:text-white/80">
          Kindly enter the OTP code sent to your email
          <span>
            {" "}
            {emailAddress?.slice(0, 4)}****
            {emailAddress?.slice(emailAddress.length - 4, emailAddress.length)}
          </span>
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
            <p
              className="text-xs cursor-pointer text-primary"
              onClick={handleSendOtp}
            >
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
