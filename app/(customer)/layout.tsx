import Footer from '@/app/components/general/Footer'
import SideBarUser from '@/app/components/pages/user_dashboard/SideBar'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function UserDashboardLayout ({ children }: LayoutProps) {
  return (
    <>
      <div className='flex min-h-screen'>
        {/* sidebar (left) */}
        <div className='w-1/5'>
          <SideBarUser />
        </div>

        {/* content space (right) */}
        <section className='flex flex-col bg-white w-4/5'>{children}</section>
      </div>
      <Footer />
    </>
  )
}
