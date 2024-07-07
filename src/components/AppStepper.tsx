import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

interface Step {
  value: string;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps = [
    { value: "one", label: "one" },
    { value: "two", label: "two" },
  ],
  currentStep = "one",
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const index = steps.findIndex((step) => step.value === currentStep);
    setCurrentStepIndex(index === -1 ? steps.length : index);
  }, [steps, currentStep]);

  return (
    <div>
      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex gap-x-2 items-center">
              <button
                className={clsx(
                  "rounded-full h-[30px] w-[30px] text-white flex items-center justify-center",
                  {
                    "bg-gray-400": currentStepIndex === index,
                    "bg-green-400": currentStepIndex > index,
                    "bg-gray-200": currentStepIndex < index,
                  }
                )}
              >
                <Icon icon="heroicons:check" />
              </button>
              <span
                className={clsx({
                  "text-gray-200": currentStepIndex < index,
                  "text-black": currentStepIndex >= index,
                })}
              >
                {step.label}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div className="w-[30px] flex justify-center opacity-0">
                <span>|</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
