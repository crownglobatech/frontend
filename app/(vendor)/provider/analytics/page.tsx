'use client'
import { useNotification } from '@/app/contexts/NotificationProvider'
import AnalyticsTable from './AnalyticsTable'
import HeadBanner from './HeadBanner'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getVendorAnalytics } from '@/lib/api'
import Loader from '@/app/components/general/Loader'
import { AnalyticsApiResponse } from '@/lib/types'
import { formatK } from '@/lib/utils'

export default function Analytics () {
  const { notify } = useNotification()
  const [loading, setLoading] = useState(false)
  const [analytics, setAnalytics] = useState<AnalyticsApiResponse>()

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setLoading(false)
          throw new Error('User not authenticated')
        }

        const data: AnalyticsApiResponse = await getVendorAnalytics(token)
        setAnalytics(data)
      } catch (err: unknown) {
        let errorMessage = 'An unknown error occurred'
        if (err instanceof Error) {
          errorMessage = err.message
        } else if (typeof err === 'string') {
          errorMessage = err
        }
        notify(errorMessage, 'error', 'Error')
        console.error('Error:', errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return <Loader />
  }

  const metrics = analytics
    ? [
        {
          title: 'Total Ads Posted',
          value: analytics.data.overview.total_ads.toString()
        },
        {
          title: 'Total Views',
          value: formatK(analytics.data.overview.total_views)
        },
        {
          title: 'Total Inquiries',
          value: formatK(analytics.data.overview.total_inquiries)
        },
        {
          title: 'Conversion Rate',
          // Format the number to one decimal place and add a '%'
          value: `${analytics.data.overview.conversion_rate}`
        }
      ]
    : []

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
          <AnalyticsTable performanceData={analytics?.data.performance} />
        </div>
      </div>
    </div>
  )
}
