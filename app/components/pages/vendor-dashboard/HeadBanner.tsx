"use client"
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import Image from 'next/image'
import Rating from '../../general/Rating'

export default function HeaderBanner() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className='bg-white shadow-lg px-6 py-4 w-full'>
      {/* welcome user */}
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-2'>
          <h1 className='font-bold text-[20px] text-[var(--heading-color)]'>
            Hi, {user ? `${user.first_name} ${user.last_name}` : 'Guest'}
          </h1>
        </div>
        {/* icons */}
        <div className='flex flex-row-reverse items-center gap-4'>
          <Rating rate={5} />
          <div className='shadow-sm rounded-full'>
            <Image
              src='/user.png'
              alt='vendor profile avatar'
              className='object-contain cursor-pointer'
              height={40}
              width={40}
            />
          </div>
          <div className='shadow-sm rounded-full'>
            <Image
              src='/notify.png'
              alt='vendor profile avatar'
              className='object-contain cursor-pointer'
              height={40}
              width={40}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
