import React, { useState } from "react";
import AppIcon from "@/components/AppIcon";
import clsx from "clsx";

export default function InputField({
  label,
  name,
  placeholder,
  icon,
  type,
  className = "",

  isCheckbox = false, // Add this prop to indicate if it's a checkbox
  isRadio = false,
  maxW = "max-w-[374px]",
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const merged = clsx("input", className);

  return (
    <div className={`w-full ${maxW}`}>
      {label && !isCheckbox && !isRadio && (
        <label className="block text-sm text-[#686878] mb-2">{label}</label>
      )}
      <div className="flex items-center relative">
        {isCheckbox ? ( // Check if it's a checkbox
          <div>
            <label className="text-sm text-[#686878] flex gap-x-2 items-center whitespace-nowrap">
              {" "}
              <input className={merged} type="checkbox" value={name} /> {label}
            </label>
          </div>
        ) : isRadio ? (
          <div>
            <label className="text-sm text-[#686878] flex gap-x-2 items-center whitespace-nowrap">
              {" "}
              <input className={merged} type="checkbox" /> {label}
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
                {isPasswordVisible ? <AppIcon icon="jam:padlock-alt-open" /> : <AppIcon icon="jam:padlock-alt-close" /> }
              </button>
            ) : (
              icon
            )}
          </span>
        )}
      </div>
   
    </div>
  );
}
