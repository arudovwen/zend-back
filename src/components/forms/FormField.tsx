"use client";
import React, { useState } from "react";
import AppIcon from "@/components/AppIcon";
import clsx from "clsx";
import OtpInput from "react-otp-input";

// Define the props interface
interface FormFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  register?: any;
  value?: any;
  errors?: any;
  isCheckbox?: boolean;
  isRadio?: boolean;
  maxW?: string;
  numInputs?: number;
  isOtp?: boolean;
  setValue?: any;
  trigger?: any;
  suffix?: any;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  icon = "",
  type = "text",
  className = "",
  register,
  value = "",
  errors,
  isCheckbox = false,
  isRadio = false,
  maxW = "",
  isOtp = false,
  numInputs = 6,
  setValue,
  trigger,
  suffix,
  disabled
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const merged = clsx("input", className);

  return (
    <div className={`w-full ${maxW}`}>
      {label && !isCheckbox && !isRadio && (
        <label className="block text-sm text-[#686878] dark:text-white/70  mb-2">
          {label}
        </label>
      )}
      <div className="flex items-center relative">
        {isCheckbox ? (
          <div>
            <label className="text-sm text-[#686878] dark:text-white/70   flex gap-x-2 items-start whitespace-nowrap">
              <input
                className={`${merged} w-auto mt-1`}
                type="checkbox"
                value={value}
                {...(register ? register(name) : {})}
                disabled={disabled}
              />{" "}
              {label}
            </label>
          </div>
        ) : isRadio ? (
          <div>
            <label className="text-sm text-[#686878] flex gap-x-2 items-start">
              <input
                className={`${merged} w-auto mt-1`}
                type="radio"
                disabled={disabled}
                {...(register ? register(name) : {})}
              />{" "}
              {label}
            </label>
          </div>
        ) : (
          <>
            {isOtp ? (
              <OtpInput
                value={value}
                onChange={(val) => {
                  register ? register(name) : {};
                  setValue(name, val);
                  trigger && trigger(name);
                }}
                numInputs={numInputs}
                renderSeparator={<span> </span>}
                containerStyle="flex gap-x-1 justify-between  w-full"
                inputStyle="input !w-12 h-12 !p-1 w-full"
                renderInput={(props) => <input {...props} />}
              />
            ) : (
              <input
                className={merged}
                placeholder={placeholder}
                {...(register ? register(name) : {})}
                disabled={disabled}
                type={type === "password" && isPasswordVisible ? "text" : type}
                defaultValue={value}
                
              />
            )}
          </>
        )}
   
        {icon && (
          <span
            className={`h-[16px] absolute right-4 text-secondary dark:text-white ${
              type === "password" ? "top-1/2 transform -translate-y-1/2" : ""
            }`}
          >
            {type === "password" ? (
              <button
                className="text-secondary dark:text-white"
                type="button"
                onClick={togglePasswordVisibility}
              >
                 {isPasswordVisible ? <AppIcon icon="game-icons:padlock-open" /> : <AppIcon icon="game-icons:padlock" /> }
              </button>
            ) : (
              <span className="text-sm">{icon}</span>
            )}
          </span>
        )}
      </div>
      {errors && <span className="text-sm text-red-500">{errors.message}</span>}
    </div>
  );
};

export default FormField;
