import Image from "next/image";
import React from "react";

export default function EmptyComponent({ title, text }: any) {
  return (
    <div className="p-6 flex flex-col justify-center mt-10 lg:mt-14 mb-10 lg:mb-14 text-center">
      <Image
        width={120}
        height={120}
        src="/type=search.svg"
        alt="empty"
        className="mx-auto mb-4"
      />
      <p className="text-gray-400 dark:text-white/80 font-semibold mb-1 text-sm lg:text-base">{title}</p>
      <p className="text-xs lg:text-sm text-gray-300 dark:text-white/60">{text}</p>
    </div>
  );
}
