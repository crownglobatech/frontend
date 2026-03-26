'use client'

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
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
    <div className='relative min-h-screen overflow-hidden bg-[var(--foundation-primary)] text-[var(--heading-color)]'>
      <div className='pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--primary-color)]/10 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[var(--accent-color)]/70 blur-3xl' />

      <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 py-14'>
        <div className='w-full rounded-2xl border border-[var(--foundation-neutral-4)] bg-white/90 p-8 shadow-xl backdrop-blur'>
          <div className='flex items-center gap-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]'>
              <LogOut size={22} />
            </div>
            <div>
              <p className='text-xs font-semibold uppercase tracking-widest text-[var(--muted-text)]'>
                Secure Session
              </p>
              <h1 className='text-2xl font-bold'>Signing you out</h1>
            </div>
          </div>

          <p className='mt-4 text-sm text-[var(--text-body)]'>
            We are wrapping up your session and clearing local credentials.
          </p>

          <div className='mt-6 flex items-center gap-2'>
            <span className='h-2.5 w-2.5 rounded-full bg-[var(--primary-color)]/40 animate-bounce' />
            <span className='h-2.5 w-2.5 rounded-full bg-[var(--primary-color)]/60 animate-bounce [animation-delay:120ms]' />
            <span className='h-2.5 w-2.5 rounded-full bg-[var(--primary-color)] animate-bounce [animation-delay:240ms]' />
            <span className='ml-2 text-xs font-semibold text-[var(--primary-color)]'>
              Redirecting to login…
            </span>
          </div>

          <div className='mt-8 flex flex-wrap items-center gap-3 text-sm'>
            <Link
              href='/auth/login'
              className='inline-flex items-center justify-center rounded-md bg-[var(--primary-color)] px-5 py-2 font-semibold text-white transition hover:opacity-90'
            >
              Continue to login
            </Link>
            <Link
              href='/'
              className='inline-flex items-center justify-center rounded-md border border-[var(--foundation-neutral-6)] px-5 py-2 font-semibold text-[var(--heading-color)] transition hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]'
            >
              Return home
            </Link>
          </div>
        </div>

        <p className='mt-6 text-xs text-[var(--muted-text)]'>
          If you are using a shared device, closing this tab helps keep your account secure.
        </p>
      </div>
    </div>
  )
}
