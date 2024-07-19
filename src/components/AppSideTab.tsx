import React from "react";

export default function AppSideTab({ options, setSelected, selected }: any) {
  return (
    <div>
      <ul className="grid">
        {options.map((i: { title: string; key: string | number; sub: string }) => (
          <li
            onClick={() => setSelected(i.key)}
            className={`px-6 py-[16px] cursor-pointer font-semibold text-sm ${
              selected === i.key ? "text-primary dark:text-white bg-gray-50 dark:bg-gray-800" : "text-secondary dark:text-white/70"
            }`}
            key={i.title}
          >
            <span className={`block mb-1  ${
              selected === i.key ? "text-primary dark:text-white" : "text-secondary dark:text-white/70"
            }`}> {i.title}</span>
            {i.sub && <span  className={`block font-normal mb-1 opacity-80 text-xs ${
              selected === i.key ? "text-primary dark:text-white/80" : "text-secondary dark:text-white/50"
            }`}> {i.sub}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
