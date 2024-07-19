import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

export default function CustomSelect({
  className = "",
  options,
  placeholder = "Filter",
  errors,
  register,
  setValue,
  name,
  label,
}) {
  const [selected, setSelected] = useState(options[0]);
  const merged = clsx("input", className);

  useEffect(() => {
    if (selected) {
      setValue(name, selected.value);
      register(name);
    }

    return () => {
      setValue(name, "");
    };
  }, [name, register, selected, setValue]);

  return (
    <div>
      {label && (
        <label className="block text-sm text-[#686878] mb-2">{label}</label>
      )}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className={merged}>
            <span className="block truncate text-sm text-left">
              {selected.label || (
                <span className="opacity-60">{placeholder}</span>
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-[77] absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-900"
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
                        {option.label}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {errors && (
        <span className="text-sm text-red-500">{errors.message}</span>
      )}
    </div>
  );
}
