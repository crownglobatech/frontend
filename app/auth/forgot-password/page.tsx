'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import LoadingDots from '@/app/components/general/LoadingDots'

export default function ForgotPassword () {
  const [userEmail, setUserEmail] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail)
      // navigate to verify email
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot-password`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail }),
            credentials: 'include'
          } 
        )
        if (!res.ok) {
          const error = await res.json()
          toast.error(error.message)
          console.log(error.message);
          
          return
        }
        const data = await res.json()
        toast.success(data.message)
        localStorage.setItem('userEmail', userEmail)
        router.push('/auth/forgot-password/verify-email')
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <div>
        <h2 className='font-bold text-[25px] text-[var(--heading-color)] text-center'>
          Forgot Your Password?
        </h2>
        <p className='text-[13px] text-[var(--foundation-neutral)] text-center'>
          Don’t worry. Enter your registered email, and we’ll send you a
          one-time code (OTP) to reset your password securely.
        </p>
      </div>

      <div className='flex flex-col w-full'>
        <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
          Email Address <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          placeholder='example@gmail.com'
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
          className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
        />
      </div>

      <div className='flex flex-col items-center gap-4'>
        <button
          onClick={handleSubmit}
          className='bg-[var(--primary-color)] px-4 py-2 rounded-md font-semibold text-[13px] text-white cursor-pointer'
        >
          {loading ? <LoadingDots /> : 'Reset Password'}
        </button>
        <Link
          href='/auth/login'
          className='bg-transparent font-semibold text-[13px] text-[var(--primary-color)]'
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}
