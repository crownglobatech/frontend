'use client'
import Rating from '@/app/components/general/Rating'
import ProfileDropDown from '@/app/components/pages/vendor-dashboard/ProfileDropDown'
import NotificationDropdown from '@/app/components/pages/vendor-dashboard/NotificationDropdown'
import Image from 'next/image'
export default function HeadBanner() {
  return (
    <div className='bg-white shadow-lg px-6 py-4 w-full'>
      {/* welcome user */}
      <div className='flex justify-between items-center'>
        <h2 className='font-semibold text-[20px]'>Analytics & Insight</h2>
        {/* icons */}
        <div className='flex flex-row-reverse items-center gap-8'>
          <Rating rate={5} />
          <div className='shadow-md rounded-full'>
            <ProfileDropDown />
          </div>
          <div className='shadow-md rounded-full'>
            <NotificationDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}
