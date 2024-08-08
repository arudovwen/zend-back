"use client";
import React, { useState, useContext } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { AdminSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import { UserContext } from "@/constants/context";
import { updateProfile } from "@/services/userservice";

export default function KinForm({ setOpen, isOpen, data }: any) {
  const { getUserData } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AdminSchema),
    defaultValues: {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      role: data.role,
    },
  });
  const onSubmit = (data: any) => {
    setLoading(true);

    updateProfile({ ...data, type: "admin" })
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
