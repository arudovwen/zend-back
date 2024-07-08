import type { Metadata } from "next";
import Image from "next/image";
import VerifyLogin from "@/components/login/verify";

export const metadata: Metadata = {
  title: "Verify Login Zendwallet Backoffice",
  description: "Verify Login Zendwallet",
};

export default function Verify() {

  return (
    <main className="flex h-screen w-screen bg-gray-100 dark:bg-gray-800 flex-col items-center justify-between p-24 bg-[url('/wave.svg')] bg-no-repeat bg-bottom">
      <div className="mt-12">
        <div className="mb-8 flex items-center">
          {" "}
          <Image
            alt="logo"
            src="/zendlogo.png"
            width={150}
            height={30}
            className="h-auto block mx-auto dark:hidden"
            priority
          />
          <Image
            alt="logo"
            src="/zendwhite.png"
            width={150}
            height={30}
            className="h-auto hidden mx-auto dark:block"
            priority
          />
        </div>
        <div className="w-[400px] p-6 rounded-xl bg-white dark:bg-gray-700 mt-2 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
          <VerifyLogin />
        </div>
      </div>
    </main>
  );
}
