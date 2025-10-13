import React from "react";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  completedSteps: boolean[];
}

export default function ProgressBar({
  steps,
  currentStep,
  completedSteps,
}: ProgressBarProps) {
  return (
    <div className="relative flex justify-between mx-auto mb-8 w-full max-w-xl">
      {/* Line behind circles */}
      <div className="top-1/2 right-0 left-0 z-0 absolute bg-gray-300 h-[2px] -translate-y-1/2" />

      {steps.map((_, index) => {
        const isActive = index === currentStep;
        const isCompleted = completedSteps[index];

        return (
          <div
            key={index}
            className={`relative z-10 w-4 h-4 rounded-full flex items-center justify-center 
              ${
                isCompleted
                  ? "bg-green-500" 
                  : isActive
                  ? "bg-orange-500" 
                  : "bg-gray-300"   
              }`}
          />
        );
      })}
    </div>
  );
}
