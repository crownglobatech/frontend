'use client'
import AuthLoader from '@/app/components/general/AuthLoader'
import SideBarVendor from '@/app/components/pages/vendor-dashboard/SideBarVendor'
import React from 'react'
import { SidebarProvider } from '../context/SidebarContext'

interface LayoutProps {
  children: React.ReactNode
}

export default function UserDashboardLayout ({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AuthLoader />
      <main className='flex min-h-screen'>
        {/* sidebar (left) */}
        <div className='w-full md:w-1/5'>
          <SideBarVendor />
        </div>

        {/* content space (right) */}
        <section className='flex flex-col bg-white w-full md:w-4/5'>
          {children}
        </section>
      </main>
      {/* <Footer /> */}
    </SidebarProvider>
  )
}
