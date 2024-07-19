import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import clsx from "clsx";

export default function TextField({
  placeholder,
  icon,
  errors,
  register,
  name,
  label,
  className = "",
}) {
  const merged = clsx("input", className);
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-[#686878] mb-2">{label}</label>
      )}
      <div className="flex items-center relative">
        <textarea
          className={merged}
          placeholder={placeholder}
          {...register(name)}
        ></textarea>
        {icon && <span className={`text-xl absolute right-4 `}>{icon}</span>}
      </div>
      {errors && (
        <span className="text-sm text-red-500">{errors.message}</span>
      )}
    </div>
  );
}
