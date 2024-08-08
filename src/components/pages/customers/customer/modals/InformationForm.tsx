"use client";
import React, { useState, useContext } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import FormSelect from "@/components/forms/FormSelect";
import { PersonalSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import { UserContext } from "@/constants/context";
import { updateProfile } from "@/services/userservice";
import { GenderOptions } from "@/constants";

export default function KinForm({ setOpen, isOpen, data }: any) {
  const { getUserData } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
    getValues
  } = useForm({
    resolver: yupResolver(PersonalSchema),
    defaultValues: {
      id:data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      homeAddress: data.homeAddress,
      gender: data.gender,
    },
  });
  const onSubmit = (data: any) => {
    setLoading(true);

    updateProfile({ ...data, type: "users" })
      .then((res) => {
        if (res.status === 200) {
          getUserData();
          toast.success("Profile updated");
          setLoading(false);
          setOpen(false);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err?.response?.data?.message || "Process failed");
      });
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
              value={getValues().dateOfBirth}
              className=" !pr-[14px] w-full"
            />
          </div>
          <div className="mb-10">
            <FormSelect
              label={`Gender`}
              name="gender"
              placeholder="Select gender"
              register={register}
              errors={errors?.gender}
              options={GenderOptions} // Replace with actual options
              setValue={setValue}
              trigger={trigger}
              value={getValues().gender}
            />
          </div>

          <div className="mb-10">
            <FormField
              label="Home address"
              name="homeAddress"
              placeholder=""
              register={register}
              errors={errors.homeAddress}
              maxW="max-w-none"
            />
          </div>

          <div className="flex gap-x-5 items-center">
            <ButtonComponent
              onClick={() => setOpen(false)}
              className="w-full text-center !bg-transparent !border !border-gray-200 !text-secondary dark:!text-white/80  items-center"
              type="button"
              disabled={loading}
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
