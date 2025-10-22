'use client'
import React, { createContext, useContext, useState } from 'react'
import Notification from '../components/general/Notification'

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
  const [notifications, setNotifications] = useState<
    { id: string; message: string; title?: string; type?: 'success' | 'error' | 'info' | 'resume' | 'paused' }[]
  >([])

  const notify = (
    message: string,
    type: 'success' | 'error' | 'info' | 'resume' | 'paused' = 'info',
    title?: string
  ) => {
    const id = crypto.randomUUID()
    setNotifications(prev => [...prev, { id, message, type, title }])

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className='top-4 right-4 z-[9999] fixed flex flex-col gap-3'>
        {notifications.map(n => (
          <Notification
            key={n.id}
            title={n.title}
            message={n.message}
            type={n.type}
            onClose={() =>
              setNotifications(prev => prev.filter(notif => notif.id !== n.id))
            }
          />
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
