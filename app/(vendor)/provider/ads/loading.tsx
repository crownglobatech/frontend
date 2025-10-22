'use client'

import Loader from '@/app/components/general/Loader'

export default function Loading () {
  return (
    <div className='flex flex-col justify-center items-center bg-white w-full h-screen'>
      <Loader />
    </div>
  )
}
