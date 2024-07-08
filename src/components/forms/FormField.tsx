"use client";
import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import clsx from "clsx";

// Define the props interface
interface FormFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  register?: any;
  value?: string;
  errors?: any;
  isCheckbox?: boolean;
  isRadio?: boolean;
  maxW?: string;
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
  maxW = "max-w-[374px]",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const merged = clsx("input", className);

  return (
    <div className={`w-full ${maxW}`}>
      {label && !isCheckbox && !isRadio && (
        <label className="block text-sm text-[#686878] dark:text-gray-300 mb-2">{label}</label>
      )}
      <div className="flex items-center relative">
        {isCheckbox ? (
          <div>
            <label className="text-sm text-[#686878] dark:text-gray-300  flex gap-x-2 items-start whitespace-nowrap">
              <input
                className={`${merged} w-auto mt-1`}
                type="checkbox"
                value={value}
                {...(register ? register(name) : {})}
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
                {...(register ? register(name) : {})}
              />{" "}
              {label}
            </label>
          </div>
        ) : (
          <input
            className={merged}
            placeholder={placeholder}
            {...(register ? register(name) : {})}
            type={type === "password" && isPasswordVisible ? "text" : type}
          />
        )}
        {icon && (
          <span
            className={`text-xl absolute right-4 text-secondary dark:text-white ${
              type === "password" ? "top-1/2 transform -translate-y-1/2" : ""
            }`}
          >
            {type === "password" ? (
              <button className="text-secondary dark:text-white" type="button" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            ) : (
              icon
            )}
          </span>
        )}
      </div>
      {errors && <span className="text-sm text-red-500">{errors.message}</span>}
    </div>
  );
};

export default FormField;
