'use client'
import { useState, useEffect, useRef } from 'react'

export default function VerifyOtp () {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // move focus to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  // Handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    const code = otp.join('')
    if (code.length === 6) {
      console.log('OTP entered:', code)
      // 🔹 Call your API to verify OTP here
    } else {
      alert('Please enter a 6-digit code')
    }
  }

  return (
    <div className='flex flex-col gap-4 text-center'>
      <h2 className='font-bold text-[25px] text-[var(--heading-color)] text-center'>
        Enter Verification Code
      </h2>
      <p className='text-[13px] text-[var(--foundation-neutral)] text-center'>
        We’ve sent a 6-digit code to{' '}
        <span className='font-medium'>exam…..@gmail.com</span>. Enter it below
        to continue.
      </p>

      {/* OTP Input Boxes */}
      <div className='flex justify-center gap-3 mb-6'>
        {otp.map((digit, index) => (
          <input
            key={index}
            type='text'
            maxLength={1}
            value={digit}
            ref={el => {
              inputRefs.current[index] = el
            }}
            onChange={e => handleChange(e.target.value, index)}
            onKeyDown={e => handleKeyDown(e, index)}
            className='border border-gray-300 rounded-md focus:outline-none focus:ring-[#004AAD] focus:ring-2 w-12 h-12 font-medium text-lg text-center'
          />
        ))}
      </div>

      {/* Verify button */}
      <div>
        <button
          onClick={handleVerify}
          className='bg-[var(--primary-color)] hover:opacity-90 shadow px-6 py-2 rounded-md font-medium text-[13px] text-white transition cursor-pointer'
        >
          Verify OTP
        </button>
      </div>

      {/* Resend code & timer */}
      <div className='mt-4'>
        {timeLeft > 0 ? (
          <p className='flex flex-col items-center gap-4 text-sm'>
            <span className='opacity-20 text-[var(--primary-color)]'>
              Resend Code
            </span>
            <span className='font-medium text-[var(--secondary-color)]'>
              {timeLeft}s
            </span>
          </p>
        ) : (
          <button
            onClick={() => setTimeLeft(60)}
            className='font-medium text-[var(--primary-color)] text-sm text-center underline cursor-pointer'
          >
            Resend Code
          </button>
        )}
      </div>
    </div>
  )
}
