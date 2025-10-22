'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logout } from '../../features/auth/authSlice'

export default function LogoutPage () {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    // Dispatch logout when the page loads
    dispatch(logout())

    // Redirect to login (or home) after logout
    const timeout = setTimeout(() => {
      router.replace('/auth/login')
    }, 1000)

    return () => clearTimeout(timeout)
  }, [dispatch, router])

  return (
    <div className='flex flex-col justify-center items-center h-screen text-center'>
      <h1 className='mb-2 font-semibold text-2xl'>Signing you out...</h1>
      <p className='font-semibold text-[var(--primary-color)]'>Please wait a moment.</p>
    </div>
  )
}
