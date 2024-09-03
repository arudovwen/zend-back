"use client";
import React, { useState } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { ResolveSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import FormSelect from "@/components/forms/FormSelect";
import { currencies, TransactionTypes } from "@/constants";
import { getAllUsers } from "@/services/userservice";
import { ucFirst } from "@/utils/methods";
import SearchSelect from "@/components/forms/SearchSelect";

export default function KinForm({ setOpen, isOpen }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResolveSchema),
  });
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data);
    // router.push("/verify");
  };

  const loadOptions = (inputValue: any, callback: any) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const searchDataT = await getAllUsers({
          user: inputValue,
          page: 1,
          count: 1000,
        });
        const sdata = searchDataT.data?.data?.users.map((data: any) => ({
          label: `${ucFirst(data?.firstName)} ${ucFirst(data.lastName)} - @${ucFirst(data.username)}`,
          value: data?.username,
        }));

        setTimeout(() => {
          if (sdata?.length) {
            callback([{ label: "Default", value: "" }, , ...sdata]);
            resolve([{ label: "Default", value: "" }, , ...sdata]);
          } else {
            reject(new Error("No data available."));
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  };
  const handleUsers = (e: any) => {
    setValue("username", e.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-secondary dark:text-white py-8 px-8 rounded-lg min-w-[400px]">
      <h2 className="font-semibold text-xl mb-10 text-center capitalize">
        Resolve transaction
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-y-6">
        <div>
          <SearchSelect loadOptions={loadOptions} onChange={handleUsers} />
          {errors?.username && (
            <span className="text-sm text-red-500">
              {errors?.username?.message}
            </span>
          )}
        </div>
        <FormSelect
          label={`Transaction type`}
          name="type"
          placeholder="Select Transaction type"
          register={register}
          errors={errors?.type}
          options={TransactionTypes} // Replace with actual options
          setValue={setValue}
          value={getValues().type}
          trigger={trigger}
        />
        <FormField
          label="Transaction ID"
          name="transactionId"
          placeholder=""
          register={register}
          errors={errors.transactionId}
          maxW="max-w-none"
        />
        {getValues().type === "withdrawal" && (
          <FormField
            label="Withdrawal ID"
            name="wxId"
            placeholder=""
            register={register}
            errors={errors.wxId}
            maxW="max-w-none"
          />
        )}
        <FormField
          label="Transaction Date"
          name="transactionDate"
          type="transactionDate"
          placeholder=""
          register={register}
          errors={errors.transactionDate}
          maxW="max-w-none"
        />
        <FormSelect
          label={`Currency`}
          name="currency"
          placeholder="Select currency"
          register={register}
          errors={errors?.currency}
          options={currencies} // Replace with actual options
          setValue={setValue}
          value={getValues().currency}
          trigger={trigger}
        />
        <div className="flex gap-x-5 items-center">
          <ButtonComponent
            onClick={() => setOpen(false)}
            className="w-full text-center !bg-transparent !border !border-[#EAECF0] !text-secondary dark:!text-white/80 items-center"
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
  );
}
