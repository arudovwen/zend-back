import React from "react";

export default function HeaderComponent({ title, sub }: any) {
  return (
    <div>
      <h1 className="text-base font-semibold text-secondary dark:text-white">
        {title}
      </h1>
      {sub && (
        <p className="text-xs text-secondary dark:text-white/80">{sub}</p>
      )}
    </div>
  );
}
