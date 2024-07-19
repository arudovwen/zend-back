import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AppIcon from "@/components/AppIcon";
export default function SideModal({ open, setOpen, children }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-max">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-[#191A15] shadow-xl">
                  
                    <div className="relative flex-1">
                    <div className="right-4 absolute top-4">
                      <button
                        type="button"
                        className=" mb-4 ml-4 mr-auto block rounded-md text-[#3A434B] hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <AppIcon
                          icon="humbleicons:times"
                          iconClass="text-lg dark:text-white/80"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
