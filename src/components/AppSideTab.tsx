import React from "react";
import AppIcon from "./AppIcon";

export default function AppSideTab({ options, setSelected, selected }: any) {
  return (
    <div>
      <ul className="grid">
        {options.map((i: { title: string; key: string | number; sub: string }) => (
         <li  key={i.title}>
           <span
            onClick={() => setSelected(i.key)}
            className={`px-4 py-[16px] cursor-pointer font-semibold text-sm flex items-start gap-x-2 ${
              selected === i.key ? "text-primary dark:text-white bg-gray-50 dark:bg-gray-800" : "text-secondary dark:text-white/70"
            }`}
           
          >
            <span className="mt-1 text-xs"><AppIcon icon={selected===i.key?"fa-solid:dot-circle":"fa-regular:dot-circle"}/></span>
          <span className="block">
          <span className={`block mb-1  ${
              selected === i.key ? "text-primary dark:text-white" : "text-secondary dark:text-white/70"
            }`}> {i.title}</span>
            {i.sub && <span  className={`block font-normal mb-1 opacity-80 text-xs ${
              selected === i.key ? "text-primary dark:text-white/80" : "text-secondary dark:text-white/50"
            }`}> {i.sub}</span>}
          </span>
          </span>
         </li>
        ))}
      </ul>
    </div>
  );
}
