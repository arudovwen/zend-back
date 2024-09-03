import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import AppIcon from "@/components/AppIcon";
import clsx from "clsx";
import { triggerAsyncId } from "async_hooks";

interface Option {
  label: string;
  value: string | number | null;
}

interface FormMultiSelectProps {
  className?: string;
  options: Option[];
  placeholder?: string;
  errors?: any;
  register: any; // Adjust type based on your useForm usage
  setValue: any; // Adjust type based on your useForm usage
  name: string;
  label?: string;
  value?: string | number | null;
  trigger?: any;
  isMultiple?: boolean;
}

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  className = "",
  options,
  placeholder = "Filter",
  errors,
  register,
  setValue,
  name,
  label,
  value,
  trigger,
  isMultiple,
}) => {
  const [selected, setSelected] = useState<any>(isMultiple ? [] : null);
  const merged = clsx("input", className);

  useEffect(() => {
    if (selected) {

      setValue(name, selected?.value);
      register(name);
      trigger(name);
    }
  }, [name, register, selected, setValue]);

  useEffect(() => {
    if (value) {
      const tempData = options.find((option) => {
        if (typeof option.value === "string" && typeof value === "string") {
          return option.value.toLowerCase() === value.toLowerCase();
        }
        return option.value === value;
      });
      setSelected(tempData || null);
    }
  }, [value, options]);

  function onSelect(selectedList: any, selectedItem: any) {
    if (selectedList) {
      setValue(name, selectedList);
      register(name);
      trigger(name);
    }
  }

  function onRemove(selectedList: any, removedItem: any) {
    setValue(name, selectedList);
  }
  return (
    <div>
      {label && (
        <label className="block text-sm text-[#686878] dark:!text-white/70  mb-2">
          {label}
        </label>
      )}

      <Multiselect
        options={options} // Options to display in the dropdown
        selectedValues={selected} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        placeholder={placeholder} // Property name to display in the dropdown options
        displayValue="label"
        className="hidden dark:inline darkcss dark:bg-gray-800"
      />
      <Multiselect
        options={options} // Options to display in the dropdown
        selectedValues={selected} // Preselected value to persist in dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        placeholder={placeholder} // Property name to display in the dropdown options
        displayValue="label"
        className="inline dark:hidden"
      />

      {errors && <span className="text-sm text-red-500">{errors.message}</span>}
    </div>
  );
};

export default FormMultiSelect;
