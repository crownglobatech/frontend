'use client'
import Image from 'next/image'
import { RecentActivity } from '@/lib/types'

interface Props {
  recentActivities: RecentActivity[] | undefined
}

export default function CustomerRecentActivities ({ recentActivities }: Props) {
  if (!recentActivities) {
    return (
      <p className='text-[12px] text-[var(--foundation-neutral-8)] text-center'>
        No recent activity yet. Your updates will appear here once you start
        posting ads.
      </p>
    )
  }

  return (
    <div className='flex flex-col gap-3 pr-2 w-full max-h-60 overflow-y-auto scrollbar-hide'>
      {recentActivities.map((activity, index) => (
        <div className='flex items-center gap-4'  key={index}>
          <Image
            src='/successtick.png'
            alt='success icon'
            width={20}
            height={20}
            className='object-contain'
          />
          <div className='flex flex-col gap-1'>
            <h2 className='font-semibold text-[14px] text-[var(--heading-color)] capitalize'>
              {activity.title}
            </h2>

            <span className='font-normal text-[12px] text-[var(--text-body)]'>
              {activity.updated_at}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
