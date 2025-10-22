'use client'

import React, { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface NotificationProps {
  title?: string
  message: string
  type?: 'success' | 'error' | 'info' | 'resume' | 'paused'
  onClose: () => void
  duration?: number
}

export default function Notification({
  title,
  message,
  type = 'info',
  onClose,
  duration = 3000
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const styles = {
    success: {
      bg: 'bg-[#D8FFE1] border-[var(--success-color)] text-[var(--heading-color)]',
      icon: <CheckCircle className='text-[var(--success-color)]' size={20} />,
      title: title || 'Success!'
    },
    error: {
      bg: 'bg-red-50 border-red-300 text-red-700',
      icon: <AlertCircle className='text-red-600' size={20} />,
      title: title || 'Error!'
    },
    info: {
      bg: 'bg-blue-50 border-blue-300 text-blue-700',
      icon: <Info className='text-blue-600' size={20} />,
      title: title || 'Info'
    },
    resume: {
      bg: 'border-[var(--success-color)] bg-[#D8FFE1] text-[var(--heading-color)]',
      icon: <CheckCircle className='text-[var(--success-color)]' size={20} />,
      title: title || 'Success!'
    },
    paused: {
      bg: 'border-[var(--brand-accent-color)] bg-[#FFF2C8] text-[var(--heading-color)]',
      icon: <CheckCircle className='text-[var(--brand-accent-color)]' size={20} />,
      title: title || 'Success!'
    }
  }[type]

  return (
    <div
      className={`flex items-center gap-3 border rounded-md px-4 py-3 shadow-md w-[320px] ${styles.bg} animate-slideIn`}
    >
      <div>{styles.icon}</div>
      <div className='flex-1'>
        <p className='font-semibold text-sm'>{styles.title}!</p>
        <p className='mt-0.5 text-[var(--text-body)] text-xs leading-snug'>{message}</p>
      </div>
      <button onClick={onClose} className='opacity-70 hover:opacity-100 text-sm'>
        <X size={14} />
      </button>
    </div>
  )
}
