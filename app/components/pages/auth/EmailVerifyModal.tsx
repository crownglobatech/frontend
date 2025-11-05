'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { toast } from 'react-toastify'
import LoadingDots from '../../general/LoadingDots'

interface EmailVerifyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userEmail: string
  onSuccess: () => void // 🔹 new prop
}

export default function EmailVerifyModal ({
  open,
  onOpenChange,
  userEmail,
  onSuccess
}: EmailVerifyModalProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // countdown
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  // otp input change
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  // backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResendOTP = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/resend-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userEmail })
        }
      )
      if (!res.ok) {
        const error = await res.json()
        toast.error(error.message || 'Please try again')
        console.error(error.message)
        return
      }
      const data = await res.json()
      toast.success(data.message || 'OTP Resent')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error:', errorMessage)
    }
  }
  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length === 6) {
      //  API confirmation
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-otp`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: userEmail,
              otp: code
            })
          }
        )
        if (!res.ok) {
          const data = await res.json()
          toast.error(data.message)
          throw new Error(data.message)
        }
        const data = await res.json()
        toast.success(data.message)
        onSuccess()
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An Unknown Error Occurred'
        console.error(errorMessage)
      } finally {
        setLoading(false)
      }
    } else {
      toast.error('Please enter a 6-digit code')
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className='max-w-md'
          onInteractOutside={e => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className='text-center'>
              <Image
                src='/email.png'
                alt='email image'
                width={80}
                height={80}
                className='mx-auto'
              />
            </DialogTitle>
            <DialogDescription className='flex flex-col items-center gap-4'>
              <div className='flex flex-col items-center'>
                <span className='font-bold text-[22px] text-[var(--heading-color)] text-center'>
                  Enter Verification Code
                </span>
                <span className='text-[13px] text-[var(--foundation-neutral)] text-center'>
                  We’ve sent a 6-digit code to{' '}
                  <span className='font-medium'>{userEmail}</span>. Enter
                  it below to continue.
                </span>
              </div>

              {/* OTP inputs */}
              <div className='flex justify-center gap-3 mb-4'>
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
              <button
                onClick={handleVerify}
                className='bg-[var(--primary-color)] hover:opacity-90 shadow px-6 py-2 rounded-md font-medium text-[13px] text-white transition cursor-pointer'
              >
                {loading ? <LoadingDots /> : 'Verify OTP'}
              </button>

              {/* Resend code & timer */}
              <div className='mt-4'>
                {timeLeft > 0 ? (
                  <div className='flex flex-col items-center gap-2 text-sm'>
                    <span className='opacity-20 text-[var(--primary-color)]'>
                      Resend Code
                    </span>
                    <span className='font-medium text-[var(--secondary-color)]'>
                      {timeLeft}s
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setTimeLeft(60)
                      handleResendOTP()
                    }}
                    className='font-medium text-[var(--primary-color)] text-sm underline cursor-pointer'
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
