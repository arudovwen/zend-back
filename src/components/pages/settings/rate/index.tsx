"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { RateSchema } from "@/schema";
import AppIcon from "@/components/AppIcon";
import ButtonComponent from "@/components/ButtonComponent";
import HeaderComponent from "@/components/HeaderComponent";
import { getRate, setRate } from "@/services/walletservice";

export default function Rates() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    zendrate: null,
    quicksell: null,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RateSchema),
    defaultValues: formData,
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  function fetchRate() {
    getRate().then((res) => {
      if (res.status === 200) {
        setValue("zendrate", res.data.data.rate.rate);
      }
    });
  }
  useEffect(() => {
    fetchRate();
  }, []);

  return (
    <div className=" px-7 pt-10 pb-20 rounded-lg bg-white  dark:bg-gray-800 dark:border-gray-600  border border-[#EAECF0]">
      <div className="mb-10">
        <HeaderComponent
          title="Rates Management"
          sub="Configure your rates for trading"
        />
      </div>{" "}
      <div className="mb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[800px]"
        >
          <h2 className="text-sm font-semibold mb-4">Zend USD</h2>
      <div className="grid gap-y-10">
      <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  icon="USD"
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  value={1}
                />
              </div>
              <span className="border dark:border-gray-600 flex items-center w-[42px] h-[42px] justify-center rounded-[6px]">
                <AppIcon
                  icon="solar:transfer-horizontal-linear"
                  iconClass="dark:text-white/70"
                />
              </span>
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  icon="USDT"
                  value={1}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                className="text-center text-sm !bg-primary !text-white items-center"
                type="submit"
                isLoading={loading}
              >
                Set rate
              </ButtonComponent>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  icon="USD"
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  value={1}
                />
              </div>
              <span className="border dark:border-gray-600 flex items-center w-[42px] h-[42px] justify-center rounded-[6px]">
                <AppIcon
                  icon="solar:transfer-horizontal-linear"
                  iconClass="dark:text-white/70"
                />
              </span>
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  icon="USDC"
                  value={1}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                className="text-center !bg-primary !text-white items-center"
                type="submit"
                isLoading={loading}
              >
                Set rate
              </ButtonComponent>
            </div>
          </div>
      </div>
        </form>
      </div>
      {/* <div className="w-full max-w-[800px]">
        <h2 className="text-sm font-semibold mb-4">Quick Sell</h2>
        <form
          className="grid grid-cols-1 gap-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  icon="USDT"
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                />
              </div>
              <span className="border dark:border-gray-600 flex items-center w-[42px] h-[42px] justify-center rounded-[6px]">
                <AppIcon icon="solar:transfer-horizontal-linear" iconClass="dark:text-white/70" />
              </span>
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  icon="USD"
                  value={1}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                className="text-center !bg-primary !text-white items-center"
                type="submit"
                isLoading={loading}
              >
                Set rate
              </ButtonComponent>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  icon="USDC"
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  value={1}
                />
              </div>
              <span className="border dark:border-gray-600 flex items-center w-[42px] h-[42px] justify-center rounded-[6px]">
                <AppIcon icon="solar:transfer-horizontal-linear" iconClass="dark:text-white/70" />
              </span>
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  icon="USD"
                  value={1}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                className="text-center !bg-primary !text-white items-center"
                type="submit"
                isLoading={loading}
              >
                Set rate
              </ButtonComponent>
            </div>
          </div>{" "}
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  icon="BTC"
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  value={1}
                />
              </div>
              <span className="border dark:border-gray-600 flex items-center w-[42px] h-[42px] justify-center rounded-[6px]">
                <AppIcon icon="solar:transfer-horizontal-linear" iconClass="dark:text-white/70" />
              </span>
              <div className="flex-1">
                <FormField
                  label=""
                  name="password"
                  placeholder=""
                  register={register}
                  errors={errors.password}
                  maxW="max-w-none"
                  icon="USD"
                  value={1}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <ButtonComponent
                className="text-center !bg-primary !text-white items-center"
                type="submit"
                isLoading={loading}
              >
                Set rate
              </ButtonComponent>
            </div>
          </div>
        </form>
      </div> */}
    </div>
  );
}
