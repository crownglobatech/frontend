import SideBarUser from '@/app/components/pages/user_dashboard/SideBar'
import React from 'react'
import AuthLoader from '../components/general/AuthLoader'

interface LayoutProps {
  children: React.ReactNode
}

export default function UserDashboardLayout ({ children }: LayoutProps) {
  return (
    <>
    <AuthLoader />
      <div className='flex min-h-screen'>
        {/* sidebar (left) */}
        <div className='md:w-1/5'>
          <SideBarUser />
        </div>

        {/* content space (right) */}
        <section className='flex flex-col bg-white w-full md:w-4/5'>{children}</section>
      </div>
      {/* <Footer /> */}
    </>
  )
}
