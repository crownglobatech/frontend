'use client'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { NotificationProvider } from '@/app/contexts/NotificationProvider'
export default function LayoutWrapper ({ children }: { children: ReactNode }) {
  return (
    <div>
      <Provider store={store}>
        <NotificationProvider>{children}</NotificationProvider>
      </Provider>
    </div>
  )
}
