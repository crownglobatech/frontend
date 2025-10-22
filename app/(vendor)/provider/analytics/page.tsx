'use client'
import { useNotification } from '@/app/contexts/NotificationProvider'
import AnalyticsTable from './AnalyticsTable'
import HeadBanner from './HeadBanner'
import Image from 'next/image'

export default function Analytics () {
  const metrics = [
    {
      title: 'Total Ads Posted',
      value: '500'
    },
    {
      title: 'Total Views',
      value: '1.2K'
    },
    {
      title: 'Total Inquiries',
      value: '1K'
    },
    {
      title: 'Conversion Rate',
      value: '7.1%'
    }
  ]
  const { notify } = useNotification()
  return (
    <div>
      <div className='top-0 sticky w-full'>
        <HeadBanner />
      </div>
      <div className='p-6'>
        {/* metrics and charts */}
        <div className='gap-4 grid grid-cols-1 md:grid-cols-2 w-full'>
          <div className='gap-4 grid grid-cols-2'>
            {metrics.map((metric, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col justify-start items-start px-6 py-4 border border-[var(--foundation-neutral-6)] rounded-md'
                >
                  <h2 className='font-semibold text-[14px]'>{metric.title}</h2>
                  <span className='font-semibold text-[25px]'>
                    {metric.value}
                  </span>
                </div>
              )
            })}
          </div>
          <div className='flex flex-col gap-8 px-4 py-2 border border-[var(--foundation-neutral-6)]'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-[14px] text-black'>
                Ad Views Over Time
              </h2>
              <select
                name='timeRange'
                id='timeRange'
                className='px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm text-[#334155] text-[12px]'
              >
                <option value='this week'>This Week</option>
                <option value='this month'>This Month</option>
              </select>
            </div>
            <div>
              <Image
                src='/viewchart.png'
                alt='views chart'
                height={300}
                width={300}
                className='w-full object-contain'
              />
            </div>
          </div>
        </div>
        <div>
          <AnalyticsTable />
        </div>
      </div>
    </div>
  )
}
