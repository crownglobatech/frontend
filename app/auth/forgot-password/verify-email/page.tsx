'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GoToMailButton from '@/app/components/pages/auth/GoToMailButton'

export default function VerifyOtp () {
  const [email, setEmail] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()

  // Check if user came through Forgot Password flow
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail')

    if (!savedEmail) {
      // Unauthorized access — redirect to Forgot Password page
      setIsAuthorized(false)
      router.replace('/auth/login')
      return
    }

    // Authorized access
    setEmail(savedEmail)
    setIsAuthorized(true)
  }, [router])

  // Optional: while checking, show nothing
  if (isAuthorized === null) return null

  if (!isAuthorized) return null

  return (
    <div className='flex flex-col gap-4 text-center'>
      <h2 className='font-bold text-[25px] text-[var(--heading-color)]'>
        Verify Your Email
      </h2>
      <p className='text-[13px] text-[var(--foundation-neutral)]'>
        A reset link has been sent to{' '}
        <span className='font-medium'>{email}</span>. Kindly view it and follow
        the instructions carefully.
      </p>
      <GoToMailButton userEmail={email || ''} />
    </div>
  )
}
