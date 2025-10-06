'use client'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { ToastContainer } from 'react-toastify'
export default function LayoutWrapper ({ children }: { children: ReactNode }) {
  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
        {children}
      </Provider>
    </div>
  )
}
