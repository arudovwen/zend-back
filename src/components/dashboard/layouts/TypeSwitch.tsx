import React from "react";

export default function TypeSwitch() {
  const [selected, setSelected] = React.useState("individual");
  const content = ["individual", "business"];
  return (
    <div className="border border-gray-200 dark:border-gray-600  rounded-lg p-1 flex gap-x-1 items-center text-sm">
      {content.map((i) => (
        <button onClick={()=> setSelected(i)} key={i} className={`px-8 py-2 capitalize rounded-lg cursor-pointer ${i.toLowerCase()=== selected ?"border text-white border-primary bg-primary font-normal":""}`}>
          {i}
        </button>
      ))}
    </div>
  );
}
