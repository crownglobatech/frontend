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
    <div className="relative w-full max-w-xl mx-auto bg-white rounded-sm px-4 py-6">
      <div className="flex justify-between items-start">
        {steps.map((step, index) => {
          const isCompleted = completedSteps[index];
          const isActive = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <div key={index} className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-green-500"
                      : isActive
                      ? "bg-[#D4AF37]"
                      : "bg-gray-300"
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Label below */}
              <span
                className={` text-xs font-medium text-center block px-1 transition-colors
                  ${
                    isCompleted
                      ? "text-green-500"
                      : isActive
                      ? "text-[var(--heading-color)] font-bold opacity-100"
                      : "text-gray-500 opacity-50"
                  }
                `}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Connecting line on top of circles */}
      <div className="absolute top-9 left-8 right-8 h-[2px] bg-[var(--heading-color)] opacity-50 -z-0 pointer-events-none" />
    </div>
  );
}
