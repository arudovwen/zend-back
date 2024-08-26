import { Fragment, useEffect, useState } from "react";
import { Float } from "@headlessui-float/react";
import classnames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import OptionsList from "./OptionsList";

export default function Select({
  options,
  handleSelected,
  value,
  inputClass = "",
  containerClass = "",
  optionClass = "",
  placement = "bottom-end",
  isMultiple = false,
}: any): React.JSX.Element {
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    handleSelected(selected);
  }, [selected]);

  // Change selected when changing status category
  useEffect(() => {
    setSelected(options[0]);
  }, [options]);

  useEffect(() => {
    if (!value) return;
    setSelected(options.find((i: any) => i.value == value.value));
  }, [value]);

  return (
    <div
      role="combobox"
      className={classnames("min-w-[150px]", containerClass)}
    >
      <Listbox value={selected} onChange={handleSelected} multiple={isMultiple}>
        <div className="relative mt-1">
          <Float placement={placement} offset={4}>
            <Listbox.Button
              className={classnames(
                "relative w-full cursor-pointer rounded-[6px] bg-white py-1 pl-2 pr-10 text-left border border-[#D0D5DD] focus:outline-none text-[#252C32] text-sm",
                inputClass
              )}
            >
              <span className="block truncate">{selected?.text}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-xs">
                <FaChevronDown className="text-[#6E7C87]" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Listbox.Options
              className={classnames(
                "mt-1 max-h-60 w-[200px] overflow-auto bg-white py-1  focus:outline-none text-sm shadow-[0px_0px_4px_0px_#00000040] rounded-b-lg z-40",
                optionClass
              )}
            >
              <OptionsList options={options} />
            </Listbox.Options>
          </Float>
        </div>
      </Listbox>
    </div>
  );
}
