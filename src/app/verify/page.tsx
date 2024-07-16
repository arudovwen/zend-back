import type { Metadata } from "next";
import Image from "next/image";
import VerifyLogin from "@/components/login/verify";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify Login Zendwallet Backoffice",
  description: "Verify Login Zendwallet",
};

export default function Verify() {
  return (
    <main className="flex h-screen w-screen bg-gray-100 dark:bg-gray-800 flex-col items-center justify-between p-24 bg-no-repeat bg-bottom">
      <div className="mt-10">
        <div className="mb-6 flex items-center justify-center">
          {" "}
          <Link href="/">
            <Image
              alt="logo"
              src="/icon.png"
              width={80}
              height={80}
              className="h-auto block mx-auto"
              priority
            />
          </Link>
        </div>
        <div className="w-[450px] p-6 rounded-xl bg-white dark:bg-gray-700 mt-2">
          <VerifyLogin />
        </div>
      </div>
    </main>
  );
}
