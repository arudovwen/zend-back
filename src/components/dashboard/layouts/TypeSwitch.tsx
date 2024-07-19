import React from "react";

export default function TypeSwitch() {
  const [selected, setSelected] = React.useState("individual");
  const content = ["individual", "business"];
  return (
    <div className="border border-gray-200 dark:border-gray-600  rounded p-[2px] flex gap-x-1 items-center text-xs w-full">
      {content.map((i) => (
        <button onClick={()=> setSelected(i)} key={i} className={`px-2 w-full py-[6px] capitalize rounded cursor-pointer ${i.toLowerCase()=== selected ?"border text-white border-primary bg-primary font-normal":"text-secondary dark:text-white/90"}`}>
          {i}
        </button>
      ))}
    </div>
  );
}
