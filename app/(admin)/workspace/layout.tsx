import AuthLoader from '@/app/components/general/AuthLoader'
import React from 'react'
import Wrapper from './Wrapper'

interface LayoutProps {
  children: React.ReactNode
}

export default function UserDashboardLayout({ children }: LayoutProps) {
  return (
    <>
      <AuthLoader />
      <Wrapper children={children} />
    </>
  )
}
