import React from 'react'
import Header from '../components/Header'
import { Select, SelectTrigger } from '@/components/ui/select'
import Image from 'next/image'
export default function AdminAnalytics() {
    const dashboardData = [
        {
            title: 'Total Revenue',
            count: ' ₦124,000'
        }, {
            title: 'Total Bookings',
            count: '1,249'
        }, {
            title: 'Active Providers',
            count: '300'
        }, {
            title: 'New Customers',
            count: '86'
        },
    ]
    return (
        <div>
            <div className="top-0 z-[100] sticky w-full">
                <Header pageTitle="Analytics Overview" />
            </div>

            <section className='bg-[#F5F5F5] min-h-[90vh] w-full p-6'>
                <div className='flex justify-between items-center'>
                    <span className='text-black font-normal text-[14px]'>View business analytics in different time series at a glance</span>

                    <Select>
                        <SelectTrigger className='text-[var(--heading-color)] font-semibold text-[12px]'>
                            Last 30 Days
                        </SelectTrigger>
                    </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full items-center justify-center mt-4">
                    {dashboardData.map((data, index) => (
                        <div key={index} className="bg-white border border-[var(--foundation-neutral-6)] rounded-sm px-4 py-4 shadow-sm">
                            <h2 className="font-normal text-[var(--text-body)] text-[12px]">{data.title}</h2>
                            <p className="font-semibold text-[var(--heading-color)] text-[25px]">{data.count}</p>
                        </div>
                    ))}
                </div>

                {/* metrics */}
                <div className='grid grid-cols-1 md:grid-cols-2 mt-4 gap-4'>
                    <Image src='/Group 24.png' alt='Metrics' width={400} height={400} className='w-full' />
                    <Image src='/Group 27.png' alt='Metrics' width={400} height={400} className='w-full' />
                    <Image src='/Group 24.png' alt='Metrics' width={400} height={400} className='w-full' />
                    <Image src='/Group 27.png' alt='Metrics' width={400} height={400} className='w-full' />
                </div>

            </section>
        </div>
    )
}
