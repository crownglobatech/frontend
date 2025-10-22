'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UnauthorizedRedirect() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/auth/login')
    }, 3000) // 3 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='flex flex-col justify-center items-center bg-gray-50 h-screen'>
      <div className='bg-white shadow-md p-6 rounded-lg text-center'>
        <h2 className='font-semibold text-gray-800 text-lg'>
          Unauthorized Access
        </h2>
        <p className='mt-2 text-gray-500 text-sm'>
          You&apos;re not authorized to view this page.
        </p>
        <p className='mt-1 text-gray-400 text-sm'>
          Redirecting to login in <span className='font-medium'>3 seconds...</span>
        </p>
      </div>
    </div>
  )
}
