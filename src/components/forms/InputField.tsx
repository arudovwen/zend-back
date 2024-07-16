import React, { useState } from "react";
import AppIcon from "@/components/AppIcon";
import clsx from "clsx";

interface InputFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: "text" | "email" | "password" | "checkbox" | "radio" | "search";
  className?: string;
  isCheckbox?: boolean;
  isRadio?: boolean;
  maxW?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
  icon,
  type = "text",
  className = "",
  isCheckbox = false,
  isRadio = false,
  maxW = "",
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const merged = clsx("input", className, type === "search" ? "!pl-8" : "");

  return (
    <div className={`w-full flex items-center relative ${maxW} `}>
      {type === "search" && (
        <span className="absolute z-10 left-3">
          <AppIcon icon="ri:search-line" className="text-xl text-gray-400" />
        </span>
      )}
      {label && !isCheckbox && !isRadio && (
        <label className="block text-sm text-[#686878] mb-2">{label}</label>
      )}
      <div className="flex items-center relative">
        {isCheckbox ? (
          <div>
            <label className="text-sm text-[#686878] flex gap-x-2 items-center whitespace-nowrap">
              <input className={merged} type="checkbox" value={name} /> {label}
            </label>
          </div>
        ) : isRadio ? (
          <div>
            <label className="text-sm text-[#686878] flex gap-x-2 items-center whitespace-nowrap">
              <input className={merged} type="radio" name={name} /> {label}
            </label>
          </div>
        ) : (
          <input
            className={merged}
            placeholder={placeholder}
            type={type === "password" && isPasswordVisible ? "text" : type}
          />
        )}
        {icon && (
          <span
            className={`text-xl absolute right-4 ${
              type === "password" ? "top-1/2 transform -translate-y-1/2" : ""
            }`}
          >
            {type === "password" ? (
              <button type="button" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <AppIcon icon="jam:padlock-alt-open" />
                ) : (
                  <AppIcon icon="jam:padlock-alt-close" />
                )}
              </button>
            ) : (
              icon
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
