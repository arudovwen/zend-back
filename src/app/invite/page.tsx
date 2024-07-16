import type { Metadata } from "next";
import Image from "next/image";
import AdminInvite from "@/components/invite";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register Invite Zendwallet Backoffice",
  description: "Register Invite Zendwallet",
};

export default function Invite() {
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
        <div className="w-[500px] p-6 rounded-xl bg-white dark:bg-gray-700 mt-2">
          <AdminInvite />
        </div>
      </div>
    </main>
  );
}
