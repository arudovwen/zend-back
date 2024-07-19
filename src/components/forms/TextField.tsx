import React from "react";
import { IconType } from "react-icons";
import clsx from "clsx";

interface TextFieldProps {
  placeholder?: string;
  icon?: IconType; // IconType from react-icons
  errors?: any; // Error object shape
  register: any; // Adjust the type of register based on your useForm usage
  name: string;
  label?: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  icon: Icon,
  errors,
  register,
  name,
  label,
  className = "",
}) => {
  const merged = clsx("input resize-none", className);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-[#686878] dark:text-white/70 mb-2">{label}</label>
      )}
      <div className="flex items-center relative">
        <textarea
          className={merged}
          placeholder={placeholder}
          {...register(name)}
          rows={5}
        />
        {Icon && <span className="text-xl absolute right-4"><Icon /></span>}
      </div>
      {errors && (
        <span className="text-sm text-red-500">{errors.message}</span>
      )}
    </div>
  );
};

export default TextField;
