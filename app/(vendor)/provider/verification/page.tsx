'use client'
import React, { useState } from 'react'
import ProgressBar from '@/app/components/pages/vendor-dashboard/verfication/ProgressBar'
import StepFormOne from '@/app/components/pages/vendor-dashboard/verfication/FormStepOne'
import StepFormTwo from '@/app/components/pages/vendor-dashboard/verfication/FormStepTwo'
import StepFormThree from '@/app/components/pages/vendor-dashboard/verfication/FormStepThree'

export default function VendorOnboarding () {
  const steps = ['Personal Info', 'Business Info', 'Review']
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  )
  const [canProceed, setCanProceed] = useState(false)

  const handleStepValidity = (valid: boolean) => {
    setCanProceed(valid)
    const updated = [...completedSteps]
    updated[currentStep] = valid
    setCompletedSteps(updated)
  }

  const handleNext = () => {
    if (canProceed && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCanProceed(true) // assume previous step is already valid
    }
  }

  return (
    <div className='flex flex-col items-center bg-white p-8 min-h-screen'>
      <ProgressBar
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      {currentStep === 0 && (
        <StepFormOne onValidityChange={handleStepValidity} />
      )}
      {currentStep === 1 && (
        <StepFormTwo onValidityChange={handleStepValidity} />
      )}
      {currentStep === 2 && (
        <StepFormThree onValidityChange={handleStepValidity} />
      )}

      <div className='flex justify-between items-center mt-6 w-[70%] max-w-2xl'>
        {/* Previous Step Button */}
        {currentStep > 0 ? (
          <button
            onClick={handlePrevious}
            className='bg-transparent hover:bg-[var(--primary-color)] px-6 py-2 border border-[var(--primary-color)] rounded font-semibold text-[14px] text-[var(--primary-color)] hover:text-white transition cursor-pointer'
          >
            ← Previous Step
          </button>
        ) : (
          <div /> // keeps layout consistent
        )}

        {/* Next Step Button */}
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className={`px-6 py-2 rounded text-white cursor-pointer font-semibold text-[14px] flex items-center gap-2 transition
          ${
            canProceed
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {currentStep === steps.length - 1 ? 'Submit' : 'Next Step →'}
        </button>
      </div>
    </div>
  )
}
