'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'

export default function PasswordResetSuccess () {
  const [authorized, setAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    const resetSuccess = sessionStorage.getItem('ResetSuccess')

    if (!resetSuccess) {
      setAuthorized(false)
      return
    }

    setAuthorized(true)
  }, [])

  if (authorized === null) return null // Still checking
  if (!authorized) notFound()

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <div>
        <Image
          src='/success.png'
          alt='success image'
          width={250}
          height={250}
          className='object-contain'
        />
      </div>

      <div>
        <h2 className='font-bold text-[25px] text-[var(--heading-color)] text-center'>
          Password Reset Successful!
        </h2>
        <p className='text-[14px] text-[var(--foundation-neutral)] text-center'>
          Your password has been updated. You can now log in with your new
          password and continue exploring Crown-Haven.
        </p>
      </div>

      <div>
        <Link
          href='/auth/login'
          className='bg-[var(--primary-color)] px-6 py-2 rounded-md font-semibold text-[13px] text-white'
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}
