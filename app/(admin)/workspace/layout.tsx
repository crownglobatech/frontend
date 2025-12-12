import AuthLoader from '@/app/components/general/AuthLoader'
import React from 'react'
import SideBarAdmin from './components/SideBar'

interface LayoutProps {
  children: React.ReactNode
}

export default function UserDashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <AuthLoader />
      <div className='flex min-h-screen'>
        {/* sidebar (left) */}
        <div className='w-1/5'>
          <SideBarAdmin />
        </div>

        {/* content space (right) */}
        <section className='flex flex-col bg-white w-4/5'>{children}</section>
      </div>
    </>
  )
}
