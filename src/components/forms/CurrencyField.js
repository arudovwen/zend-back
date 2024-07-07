import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import clsx from "clsx";
import CurrencyInput from "react-currency-input-field";

export default function CurrencyField({
  label,
  name,
  placeholder,
  className = "",
  register,
  setValue,
  errors,
  prefix = "$",
}) {
  const merged = clsx("input", className);

  const handleValueChange = (value, name) => {
    if (value) {
      setValue(name, value);
      // clearError(name); // Clear the error for this field
    }
  };

  const clearError = (fieldName) => {
    if (fieldName in errors) {
      // Clear the error for the specified field
      delete errors[fieldName];
    }
  };

  return (
    <div className="w-full max-w-[374px]">
      {label && (
        <label className="block text-sm text-[#686878] mb-2">{label}</label>
      )}
      <CurrencyInput
        id={name}
        name={name}
        placeholder={placeholder}
        prefix={prefix}
        decimalsLimit={2}
        onValueChange={(value) => handleValueChange(value, name)}
        onBlur={() => {
            register(name); 
          }}
        className={merged}
      />

      {errors && (
        <span className="text-sm text-red-500">{errors.message}</span>
      )}
    </div>
  );
}
