import AuthLoader from '@/app/components/general/AuthLoader'
import SideBarVendor from '@/app/components/pages/vendor-dashboard/SideBarVendor'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function UserDashboardLayout ({ children }: LayoutProps) {
  return (
    <>
    <AuthLoader />
      <main className='flex min-h-screen'>
        {/* sidebar (left) */}
        <div className='w-1/5'>
          <SideBarVendor />
        </div>

        {/* content space (right) */}
        <section className='flex flex-col bg-white w-4/5'>
          {children}
        </section>
      </main>
      {/* <Footer /> */}
    </>
  )
}
