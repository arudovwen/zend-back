import React from "react";
import Image from "next/image";

export default function AppLogo({ w = 130, h = 30 }: any) {
  return (
    <div>
      {" "}
      <Image
        alt="logo"
        src="/zendlogo.png"
        width={w}
        height={h}
        className="h-auto block dark:hidden"
        priority
      />
      <Image
        alt="logo"
        src="/zendwhite.png"
        width={w}
        height={h}
        className="h-auto hidden dark:block"
        priority
      />
    </div>
  );
}
