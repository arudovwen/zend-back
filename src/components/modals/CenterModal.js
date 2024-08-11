import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AppIcon from "@/components/AppIcon";

export default function CenterModal({
  children,
  open,
  setOpen,
  canClose = false,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[999]"
        initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-max">
               {canClose && <div className="-right-6 absolute -top-6">
                  <button
                    type="button"
                    className=" bg-white dark:bg-gray-800  text-[#3A434B] hover:opacity-70 rounded-full focus:outline-none focus:ring-2 focus:ring-white h-8 w-8 flex items-center justify-center"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <AppIcon
                      icon="humbleicons:times"
                      iconClass="text-lg dark:text-white/80"
                      aria-hidden="true"
                    />
                  </button>
                </div>}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
