'use client'
import React, { createContext, useContext } from 'react'
import { Toaster, toast } from 'sonner'

interface NotificationContextType {
  notify: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'resume' | 'paused',
    title?: string
  ) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used within Provider')
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const defaultTitles: Record<
    'success' | 'error' | 'info' | 'resume' | 'paused',
    string
  > = {
    success: 'Success!',
    error: 'Error!',
    info: 'Info',
    resume: 'Success!',
    paused: 'Paused'
  }

  const notify = (
    message: string,
    type: 'success' | 'error' | 'info' | 'resume' | 'paused' = 'info',
    title?: string
  ) => {
    const resolvedTitle = title ?? defaultTitles[type]
    const options = { description: message, duration: 4000 }

    if (type === 'success' || type === 'resume') {
      toast.success(resolvedTitle, options)
      return
    }

    if (type === 'error') {
      toast.error(resolvedTitle, options)
      return
    }

    if (type === 'paused') {
      toast.warning(resolvedTitle, options)
      return
    }

    toast.info(resolvedTitle, options)
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Toaster position='top-right' richColors closeButton />
    </NotificationContext.Provider>
  )
}
