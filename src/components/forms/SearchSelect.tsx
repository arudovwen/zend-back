import AsyncSelect from "react-select/async";
import React, { Fragment, useState, useEffect } from "react";

interface Option {
  label: string;
  value: any; // Adjust type as per your option value type
}

interface CustomSelectProps {
  className?: string;
  placeholder?: string;
  name?: string;
  label?: string;
  onChange?: any;
  loadOptions?: any;
}
export default function SearchSelect({
  className = "",
  placeholder = "",
  label,
  loadOptions,
  onChange,
}: CustomSelectProps) {
  const [selected, setSelected] = useState<Option | null>(null);

  useEffect(() => {
    // Add any side effects based on selected option
    if (selected?.label) {
      onChange && onChange(selected);
    }
  }, [selected]);

  const handleChange = (selectedOption: any) => {
    setSelected(selectedOption);
  };

  return (
    <div>
      {" "}
      <AsyncSelect
        cacheOptions
        classNames={{
          control: (state) =>
            `${
              state.isFocused
                ? "!border-[#EAECF0] dark:!border-gray-600"
                : "!border-[#EAECF0]  dark:!border-gray-600"
            } bg-white dark:!bg-gray-800 text-secondary dark:!text-gray-100 min-w-[200px] !rounded`,
          menu: () =>
            `bg-white dark:!bg-gray-800 text-secondary dark:!text-gray-100 min-w-[200px] !rounded`,
          option: () =>
            `bg-white dark:!bg-gray-800 text-secondary dark:!text-gray-300 !rounded`,
          singleValue: () => `text-secondary dark:!text-gray-300`,
        }}
        value={selected}
        onChange={handleChange}
        // @ts-ignore
        loadOptions={loadOptions}
        isClearable
        defaultOptions
        placeholder="Search user"
      />
    </div>
  );
}
