import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import AppIcon from "@/components/AppIcon";
import clsx from "clsx";
import { triggerAsyncId } from "async_hooks";

interface Option {
  label: string;
  value: string | number | null;
}

interface CustomSelectProps {
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

const CustomSelect: React.FC<CustomSelectProps> = ({
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
  const [selected, setSelected] = useState<any>(
    isMultiple ? [] : null
  );
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

  return (
    <div>
      {label && (
        <label className="block text-sm text-[#686878] dark:!text-white/70  mb-2">
          {label}
        </label>
      )}
      <Listbox value={selected} onChange={setSelected} multiple={isMultiple}>
        <div className="relative">
          <Listbox.Button className={merged}>
            <span className="block truncate text-sm text-left">
              {selected?.label || (
                <span className="opacity-60">{placeholder}</span>
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <AppIcon icon="lucide:chevron-down" />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-[77] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white/80 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white/80" : "text-gray-900 dark:text-white/70 "
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <div
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {errors && <span className="text-sm text-red-500">{errors.message}</span>}
    </div>
  );
};

export default CustomSelect;
