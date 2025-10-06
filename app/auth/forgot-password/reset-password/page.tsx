'use client'
import LoadingDots from '@/app/components/general/LoadingDots'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function ResetPassword () {
  const router = useRouter()
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  const dataParam = searchParams.get('data')
  console.log('Decoded data', dataParam)

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!dataParam) return toast.error('Invalid request')
    if (!password || !passwordConfirm) return toast.error('Enter both fields')
    if (password !== passwordConfirm)
      return toast.error('Passwords do not match')

    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: dataParam,
            password,
            password_confirmation: passwordConfirm
          })
        }
      )

      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success(data.message || 'Password reset successful!')

      // Safe localStorage + redirect
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ResetSuccess', 'true')
        console.log(' Storage saved:', localStorage.getItem('ResetSuccess'))
      }

      setTimeout(() => router.replace('/auth/forgot-password/success'), 500)
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-8'>
      <div>
        <h2 className='font-bold text-[25px] text-[var(--heading-color)] text-center'>
          Setup a new password?
        </h2>
        <p className='text-[14px] text-[var(--foundation-neutral)] text-center'>
          Create a strong password you’ll remember. For your security, don’t
          reuse old passwords.
        </p>
      </div>

      <div className='flex flex-col gap-4 mt-6 w-full'>
        <div className='flex flex-col w-full'>
          <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
            New Password <span className='text-red-500'>*</span>
          </label>
          <input
            type='password'
            placeholder='************'
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
            Confirm Password <span className='text-red-500'>*</span>
          </label>
          <input
            type='password'
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            placeholder='************'
            className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
          />
        </div>
      </div>

      <div className='mt-2'>
        <button
          onClick={handleResetPassword}
          className='bg-[var(--primary-color)] px-6 py-2 rounded-md font-semibold text-[13px] text-white cursor-pointer'
        >
          {loading ? <LoadingDots /> : 'Reset Password'}
        </button>
      </div>
    </div>
  )
}
