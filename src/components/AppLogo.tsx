import React from "react";
import Image from "next/image";

export default function AppLogo({ w = 160, h = 50 }: any) {
  return (
    <div>
      {" "}
      <Image
        alt="logo"
        src="/zenddark.png"
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
