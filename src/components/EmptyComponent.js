import Image from "next/image";
import React from "react";

export default function EmptyComponent({ heading, text }) {
  return (
    <div className="p-6 flex flex-col justify-center mt-20 mb-20 text-center">
      <Image
        width={160}
        height={160}
        src="/images/empty.png"
        alt="empty"
        className="mx-auto mb-4"
      />
      <p className="text-[#1D1D35] dark:text-white/80 font-bold mb-1">{heading}</p>
      <p className="text-sm text-[#3A434B] dark:text-white/60">{text}</p>
    </div>
  );
}
