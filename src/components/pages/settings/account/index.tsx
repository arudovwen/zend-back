"use client";
import React, { useState, useEffect, useRef } from "react";
import CenterModal from "@/components/modals/CenterModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import FormField from "@/components/forms/FormField";
import { AdminSchema } from "@/schema";
import ButtonComponent from "@/components/ButtonComponent";
import AppButton from "@/components/AppButton";
import Image from "next/image";
import { getCurrentAdmin, updateProfile } from "@/services/userservice";
import { getItem, setItem } from "@/utils/localStorageControl";
import Loader from "@/components/Loader";
import { AiOutlineLoading } from "react-icons/ai";

export default function Account() {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageloading, setImageLoading] = useState<boolean>(false);
  const [formData] = useState<any>({
    firstName: null,
    lastName: null,
    emailAddress: null,
    image: null,
    role: null,
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(AdminSchema),
    defaultValues: formData,
  });
  const uploadRef = useRef<any>(null);

  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      // .replace("data:", "").replace(/^.+,/, ""));
      reader.onerror = reject;
    });
  const handleFileChange = async (e: any) => {
    setImageLoading(true);
    const userData = getItem("userData");
    const file = e.target.files[0];
    if (file) {
      const base64: any = await toBase64(file);
      updateProfile({ id: userData?.id, image: base64, type: "administrators" })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Image updated");
            fetchData();
          }
        })
        .catch((err) => {
          setImageLoading(false);
          toast.error(err.response.data?.message || "Upload failed");
        });
    }
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    console.log("🚀 ~ onSubmit ~ data:", data);
    // router.push("/verify");
  };
  function fetchData() {
    setLoading(true);
    const userData = getItem("userData");
    getCurrentAdmin(userData.id)
      .then((res) => {
        if (res.status === 200) {
          setImageLoading(false);
          setLoading(false);
          setItem("userData", res?.data?.data?.administrator);
          setValue("firstName", res.data?.data?.administrator?.firstName);
          setValue("lastName", res.data?.data?.administrator?.lastName);
          setValue("emailAddress", res.data?.data?.administrator?.emailAddress);
          setValue("image", res.data?.data?.administrator?.image);
          setValue("gender", res.data?.data?.administrator?.gender);
          setValue("role", res.data?.data?.administrator?.primaryRole);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="max-w-[968px] px-7 py-10 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 border border-[#EAECF0]">
          <div className="flex  flex-col md:flex-row gap-6 justify-start lg:justify-between lg:items-center mb-12 max-w-[800px]">
            <div className="flex  flex-col md:flex-row gap-4 items-center text-center sm:text-left">
              <div className="overflow-hidden h-20 lg:h-28 w-20 lg:w-28 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl font-semibold">
                {!imageloading ? (
                  <Image
                    alt="avatar"
                    src={getValues()?.image || "/ava.png"}
                    width={120}
                    height={120}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>
                    <AiOutlineLoading className="text-[60px] animate-spin text-primary" />
                  </span>
                )}
              </div>
              <div>
                <div className="mb-4">
                  <span className="block font-medium text-sm text-secondary dark:text-white/90">
                    {getValues()?.firstName} {getValues()?.lastName}
                  </span>
                  <span className="block text-xs text-secondary/80 dark:text-gray-400">
                    {getValues()?.emailAddress}
                  </span>
                </div>
                <div className="flex gap-x-3 items-center">
                  <span className="px-[14px] py-[5px] capitalize rounded-full border border-blue-300 bg-blue-50 dark:bg-transparent text-xs text-blue-700 dark:text-blue-300">
                    {getValues()?.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-x-4 items-center justify-center md:justify-start">
              <label>
                <input
                  type="file"
                  className="hidden"
                  ref={uploadRef}
                  onChange={handleFileChange}
                />
                <AppButton
                  text="Upload"
                  icon="solar:upload-minimalistic-linear"
                  type="button"
                  onClick={handleUploadClick}
                />
              </label>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-sm text-secondary dark:text-white/80 mb-6">
              Personal information
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-[800px]"
            >
              <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormField
                  label="First name"
                  name="firstName"
                  placeholder=""
                  register={register}
                  errors={errors.firstName}
                  maxW="max-w-none"
                  value={getValues().firstName}
                />
                <FormField
                  label="Last name"
                  name="lastName"
                  placeholder=""
                  register={register}
                  errors={errors.lastName}
                  maxW="max-w-none"
                  value={getValues().lastName}
                />
              </div>
              <div className="mb-6">
                <FormField
                  label="Email address"
                  name="emailAddress"
                  placeholder=""
                  type="email"
                  register={register}
                  maxW="max-w-none"
                  value={getValues().emailAddress}
                />
              </div>
              {/* <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            <FormField
              label="Phone number"
              name="phoneNumber"
              placeholder=""
              register={register}
              errors={errors.phoneNumber}
              maxW="max-w-none"
              value={getValues().phoneNumber}
            />
          </div> */}

              {/* <div className="flex gap-x-5 items-center">
            <ButtonComponent
              className="text-center !bg-primary !text-white items-center !border-primary !text-sm"
              type="submit"
              isLoading={loading}
            >
              Save information
            </ButtonComponent>
          </div> */}
            </form>
          </div>
        </div>
      ) : (
        <div className="h-[800px] flex items-center justify-center">
          <Loader />{" "}
        </div>
      )}
    </div>
  );
}
