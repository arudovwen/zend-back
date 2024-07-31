import { Menu } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Float } from "@headlessui-float/react";

export default function MenuSelect({ label, options, handleSelected }: any) {
  return (
    <div className="">
      <Menu as="div" className="text-left">
        <Float
          placement="bottom-end"
          enter="transition duration-200 ease-out"
          enterFrom="scale-95 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition duration-150 ease-in"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-95 opacity-0"
          tailwindcssOriginClass
          offset={4}
        >
          <Menu.Button className="">{label}</Menu.Button>

          <Menu.Items className="min-w-[120px] border rounded-md bg-white dark:bg-gray-700 shadow-lg">
            {options.map((option: any) => (
              <div className="" key={option.label}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleSelected(option.value)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex w-full items-center rounded-md px-[14px] hover:bg-gray-50 py-2 text-sm text-secondary dark:text-white/80`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Float>
      </Menu>
    </div>
  );
}
