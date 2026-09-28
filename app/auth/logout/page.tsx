'use client'

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import LoadingSpinner from '@/app/components/general/LoadingSpinner'
import { logout } from '../../features/auth/authSlice'

export default function LogoutPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  const hasLoggedOut = useRef(false)

  useEffect(() => {
    if (hasLoggedOut.current) return
    hasLoggedOut.current = true

    dispatch(logout())
    router.prefetch('/auth/login')

    const timeout = setTimeout(() => {
      router.replace('/auth/login')
    }, 1200)

    return () => clearTimeout(timeout)
  }, [dispatch, router])

  return (
    <div className='flex min-h-screen items-center justify-center bg-[var(--foundation-primary)] px-6 py-14'>
      <div className='flex w-full max-w-sm flex-col items-center text-center'>
        <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary-color)] text-white'>
          <LogOut size={22} />
        </div>

        <h1 className='mt-6 text-2xl font-bold text-[var(--heading-color)]'>
          You&apos;ve been logged out
        </h1>
        <p className='mt-2 text-sm text-[var(--text-body)]'>
          Thanks for stopping by Assure Homes. See you again soon.
        </p>

        <div className='mt-6 flex items-center gap-2 text-sm text-[var(--muted-text)]'>
          <LoadingSpinner size='sm' variant='primary' />
          Taking you back to login…
        </div>

        <div className='mt-8 flex items-center gap-3 text-sm'>
          <Link
            href='/auth/login'
            className='inline-flex items-center justify-center rounded-md bg-[var(--primary-color)] px-5 py-2 font-semibold text-white transition hover:opacity-90'
          >
            Log back in
          </Link>
          <Link
            href='/'
            className='inline-flex items-center justify-center rounded-md border border-[var(--foundation-neutral-6)] px-5 py-2 font-semibold text-[var(--heading-color)] transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]'
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
