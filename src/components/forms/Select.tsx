import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import AppIcon from "@/components/AppIcon";
import clsx from "clsx";

interface Option {
  label: string;
  value: any; // Adjust type as per your option value type
}

interface CustomSelectProps {
  className?: string;
  options: any;
  placeholder?: string;
  name?: string;
  label?: string;
  onChange?: any;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  className = "",
  options,
  placeholder = "Filter",
  label,
  onChange,
}) => {
  const [selected, setSelected] = useState<Option | null>(null);
  const merged = clsx("input", className);

  useEffect(() => {
    // Add any side effects based on selected option
    if(selected?.label){
      onChange && onChange(selected);
    }
  }, [selected]);
  

  return (
    <div className="w-full  lg:max-w-[180px]">
      {label && (
        <label className="block text-sm text-[#686878] mb-2">{label}</label>
      )}
      <Listbox value={selected} onChange={setSelected}>
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
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-[77] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 dark:text-white/80 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option: any, optionIdx: any) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-gray-100 dark:bg-gray-700 dark:text-gray-100 text-gray-900" : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option?.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomSelect;
