"use client"
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { Menu } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'
import ProfileDropDown from './ProfileDropDown'
import { useSidebar } from '@/app/(vendor)/context/SidebarContext'

export default function HeaderBanner() {
  const { user } = useSelector((state: RootState) => state.auth)
  const { toggleSidebar } = useSidebar()

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
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <div className='shadow-sm rounded-full'>
            <ProfileDropDown />
          </div>
          <div className='shadow-sm rounded-full'>
            <NotificationDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}
