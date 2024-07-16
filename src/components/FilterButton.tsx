import React, { useEffect, useState } from 'react';
import AppIcon from '@/components/AppIcon'; // Adjust the import as necessary
import { Listbox } from '@headlessui/react';

interface Option {
  label: string;
  value: string;
  key: string; // Add other properties as necessary
}

interface ListboxProps {
  options: Option[];
  modelValue?: string;
  title?: string;
  onChange: (value: string) => void;
}

const CustomListbox: React.FC<ListboxProps> = ({
  options,
  modelValue = '',
  title = 'Filter',
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    if (modelValue) {
      const foundOption = options.find(option => option.value === modelValue);
      setSelectedOption(foundOption || null);
    }
  }, [modelValue, options]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
  };

  return (
    <Listbox as="div" value={selectedOption} onChange={handleSelect} className="relative">
      <Listbox.Button className="border border-[#C7C5C5] rounded-lg px-[14px] py-[10px] text-sm capitalize h-11 min-w-[100px]">
        {selectedOption?.label ? (
          <span>{selectedOption.label}</span>
        ) : (
          <span className="flex gap-x-1 items-center whitespace-nowrap">
            <AppIcon icon="fluent:filter-28-filled" /> {title}
          </span>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute z-[999] bg-white shadow-[5px_12px_35px_rgba(44,44,44,0.12)] py-2 right-0 min-w-[150px] rounded-xl overflow-hidden flex flex-col mt-1">
        {options.map(option => (
          <Listbox.Option
            key={option.key}
            value={option}
            className={({ active }) =>
              `py-2 px-5 hover:bg-gray-50 text-sm whitespace-nowrap capitalize ${active ? 'bg-gray-200' : ''}`
            }
          >
            {option.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default CustomListbox;
